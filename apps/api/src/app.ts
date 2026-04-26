// apps/api/src/app.ts
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './modules/auth/auth.routes';
import { openApiSpec } from './config/swagger';

const app: Application = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'Tutor Backend is running securely!' });
});

// Swagger docs
app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(openApiSpec, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    })
);

// Routes
app.use('/api/auth', authRoutes);

export default app;