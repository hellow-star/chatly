import 'dotenv/config';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

export const ENV = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV || 'development',
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
};

// Validate required environment variables
export const validateEnv = () => {
    const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET', 'RESEND_API_KEY'];
    const missingEnvVars = requiredEnvVars.filter(varName => !ENV[varName]);

    if (missingEnvVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    }
};

// Security middleware configuration
export const securityMiddleware = () => helmet();

// Rate limiting configuration
export const rateLimiter = () => rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});

// Compression middleware for production
export const compressionMiddleware = () => compression();