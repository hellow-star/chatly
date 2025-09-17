import express from 'express';
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';
import { ENV, validateEnv, securityMiddleware, rateLimiter, compressionMiddleware } from './lib/env.js';
import cookieParser from 'cookie-parser';

// Validate environment variables
validateEnv();

const app = express();

app.use(cookieParser());
const __dirname = path.resolve();
const PORT = ENV.PORT || 3000;

// Security middleware
app.use(securityMiddleware());

// Rate limiting
app.use(rateLimiter());

// Body parsing middleware with size limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Compression for production
if (ENV.NODE_ENV === 'production') {
    app.use(compressionMiddleware());
}

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


//ready for deployment 
if (ENV.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
 
    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});
