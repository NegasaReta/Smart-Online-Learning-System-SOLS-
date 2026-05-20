import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as UserModel from '../models/user.model';

<<<<<<< HEAD
export const registerUser = async (fullName: string, email: string, passwordPlain: string, role: string) => {
=======
export const registerUser = async (fullName: string, email: string, passwordPlain: string, role: string, gradeLevel?: string, studentEmail?: string, profileData?: any) => {
>>>>>>> a01631ddd1ded3fe72005f7de850eb1934ef798c
  const existingUser = await UserModel.findUserByEmail(email);
  if (existingUser) throw new Error('Email already exists');

  const passwordHash = await bcrypt.hash(passwordPlain, 10);
<<<<<<< HEAD
  const user = await UserModel.registerUser(fullName, email, passwordHash, role);
=======
  const user = await UserModel.registerUser(fullName, email, passwordHash, role, gradeLevel, studentEmail, profileData);
>>>>>>> a01631ddd1ded3fe72005f7de850eb1934ef798c
  return user;
};

export const login = async (email: string, passwordPlain: string) => {
  const user = await UserModel.findUserByEmail(email);
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(passwordPlain, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign(
<<<<<<< HEAD
    { userId: user.id, fullName: user.full_name, email: user.email, role: user.role },
=======
    { userId: user.id, fullName: user.fullName, email: user.email, role: user.role },
>>>>>>> a01631ddd1ded3fe72005f7de850eb1934ef798c
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

<<<<<<< HEAD
  return { token, user: { id: user.id, fullName: user.full_name, email: user.email, role: user.role } };
=======
  return { token, user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role, gradeLevel: user.gradeLevel } };
>>>>>>> a01631ddd1ded3fe72005f7de850eb1934ef798c
};
