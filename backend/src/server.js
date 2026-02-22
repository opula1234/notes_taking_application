import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

/**
 * @file server.js
 * @description Express application bootstrap file.
 *
 * This file initializes and configures the backend server for the Notes API.
 * It is responsible for setting up environment variables, database connection,
 * global middleware, API routes, and starting the HTTP server.
 *
 * ---------------------------------------------------------------------------
 * Core Responsibilities
 * ---------------------------------------------------------------------------
 * 1. Load environment variables using dotenv.
 * 2. Establish a MongoDB connection via connectDB().
 * 3. Configure global middleware.
 * 4. Register application routes.
 * 5. Start the Express server after successful database connection.
 *
 * ---------------------------------------------------------------------------
 * Environment Variables
 * ---------------------------------------------------------------------------
 * - PORT:
 *     The port on which the server will run.
 *     Defaults to 5001 if not specified.
 *
 * - MONGO_URI:
 *     MongoDB connection string required to connect to the database.
 *
 * ---------------------------------------------------------------------------
 * Middleware
 * ---------------------------------------------------------------------------
 * - express.json():
 *     Parses incoming JSON request bodies and makes the data available
 *     under req.body.
 *
 * - rateLimiter:
 *     Custom middleware used to limit repeated requests to public APIs
 *     and protect against abuse.
 *
 * ---------------------------------------------------------------------------
 * Routes
 * ---------------------------------------------------------------------------
 * - /api/notes
 *     Handles all note-related endpoints (CRUD operations).
 *     Routed through notesRoutes.
 *
 * ---------------------------------------------------------------------------
 * Startup Flow
 * ---------------------------------------------------------------------------
 * 1. Load environment variables.
 * 2. Create Express application instance.
 * 3. Apply global middleware.
 * 4. Register routes.
 * 5. Connect to MongoDB.
 * 6. Start listening for incoming requests.
 *
 * The server only starts if the database connection is successful.
 *
 * @module server
 */

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()


// Global middleware
// Parses incoming JSON request bodies and makes the data available on req.body.
// Applied globally so all routes can access JSON payloads.
if (process.env.NODE_ENV !== "production") {
    app.use(cors(
        {
            origin: "http://localhost:5173"
        })
    )
}
app.use(express.json())
app.use(rateLimiter)


// our simple custom middleware
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`)
//     next()
// })

// API routes
app.use("/api/notes", notesRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")))

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

// Initialize database connection
connectDB().then(() => {
    // Start server
    app.listen(PORT, () => {
        console.log(`Server started on Port: ${PORT}`);
    });
})
