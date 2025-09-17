import express from 'express';
import path from 'path';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';
import { createWelcomeEmailTemplate } from './emails/emailTemplates.js';
import { ENV } from './lib/env.js';

const app = express();
const __dirname = path.resolve();
const PORT = ENV.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON request bodies

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
