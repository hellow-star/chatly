import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./lib/db.js";
import {
  ENV,
  validateEnv,
  securityMiddleware,
  rateLimiter,
  compressionMiddleware,
} from "./lib/env.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

// Validate environment variables
validateEnv();

const PORT = ENV.PORT || 3000;
const __dirname = path.resolve();

// Middleware
// Debug logging for CORS configuration
console.log("CORS origin:", ENV.CLIENT_URL);
console.log("Environment variables:", {
  CLIENT_URL: process.env.CLIENT_URL,
  NODE_ENV: process.env.NODE_ENV,
});

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(securityMiddleware());
app.use(rateLimiter());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Production setup
if (ENV.NODE_ENV === "production") {
  app.use(compressionMiddleware());
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (_, res) =>
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
  );
}

// Start server
server.listen(PORT, "0.0.0.0", async () => {
  console.log(`Server running on port ${PORT}`);
  await connectDB();
});
