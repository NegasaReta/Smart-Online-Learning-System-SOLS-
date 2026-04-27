import 'dotenv/config';
import express from 'express';
import { authenticateJWT } from './middlewares/authenticateJWT';
import authRoutes from './routes/auth.routes';
import studentRoutes from './routes/student.routes';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api', authRoutes);
app.use('/student', studentRoutes);

// A public route (No middleware)
app.get('/public', (req, res) => {
  res.json({ message: "Anyone can see this!" });
});

// A protected route (Uses JWT middleware)
app.get('/protected', authenticateJWT, (req, res) => {
  // req.auth is available because the middleware verified the token!
  res.json({ 
    message: "You are authenticated!", 
    user: req.auth 
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
