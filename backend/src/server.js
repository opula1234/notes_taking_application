import express from "express"
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"

/**
 * Application entry point.
 *
 * Responsibilities:
 * - Loads environment variables from a .env file.
 * - Establishes a MongoDB database connection.
 * - Configures global middleware.
 * - Registers application routes.
 * - Starts the Express server.
 *
 * Environment Variables:
 * - PORT: Port number the server will listen on (defaults to 5001).
 * - MONGO_URI: MongoDB connection string.
 *
 * Middleware:
 * - express.json(): Parses incoming JSON request bodies.
 *
 * Routes:
 * - /api/notes → Handles note-related API endpoints.
 *
 * @module server
 */

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001

// Initialize database connection
connectDB();

// Global middleware
// Parses incoming JSON request bodies and makes the data available on req.body.
// Applied globally so all routes can access JSON payloads.
app.use(express.json())

// API routes
app.use("/api/notes", notesRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server started on Port: ${PORT}`);
});