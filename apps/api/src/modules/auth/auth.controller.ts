// apps/api/src/modules/auth/auth.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../../config/db'; // Your Neon DB connection
import { users, teacherProfiles } from '../../db/schema';
import { eq } from 'drizzle-orm';

export const registerTeacher = async (req: Request, res: Response) => {
    const { username, email, password, languagePreference, subjectSpecialization } = req.body;

    try {
        // 1. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 2. Insert into users table
        const [newUser] = await db.insert(users).values({
            username,
            email,
            password: hashedPassword,
            role: 'Teacher',
            languagePreference,
        }).returning({ id: users.id });

        // 3. Insert into teacher_profiles table with 'Pending' status
        await db.insert(teacherProfiles).values({
            userId: newUser.id,
            subjectSpecialization,
            status: 'Pending',
        });

        res.status(201).json({
            message: 'Registration successful. Your account is pending Admin approval.'
        });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error });
    }
};

export const loginTeacher = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // 1. Find User
        const [user] = await db.select().from(users).where(eq(users.email, email));
        if (!user || user.role !== 'Teacher') {
            return res.status(401).json({ message: 'Invalid credentials or incorrect role.' });
        }

        // 2. Check Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

        // 3. Check Admin Approval Status
        const [profile] = await db.select().from(teacherProfiles).where(eq(teacherProfiles.userId, user.id));
        if (profile.status === 'Pending') {
            return res.status(403).json({ message: 'Account is still pending Admin approval.' });
        }
        if (profile.status === 'Rejected') {
            return res.status(403).json({ message: 'Account registration was rejected.' });
        }

        // 4. Generate JWT (Expires in 20 minutes as per specs)
        const token = jwt.sign(
            { userId: user.id, role: user.role, profileId: profile.id },
            process.env.JWT_SECRET!,
            { expiresIn: '20m' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user.id, username: user.username, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error });
    }
};

export const logoutTeacher = (req: Request, res: Response) => {
    // Since we are using manual JWT, logout is primarily handled on the frontend 
    // by destroying the token. But we send a success response to clear client states.
    res.status(200).json({ message: 'Logged out successfully.' });
};