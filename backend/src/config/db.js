import mongoose from "mongoose"

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 *
 * This function attempts to connect to the database using the
 * connection string stored in the MONGO_URI environment variable.
 *
 * On successful connection:
 * - Logs a success message to the console.
 *
 * On failure:
 * - Logs the error details.
 * - Terminates the Node.js process with exit code 1.
 *
 * @async
 * @function connectDB
 * @returns {Promise<void>} Resolves when the database connection is successful.
 * @throws {Error} If the database connection fails.
 */

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB CONNECTED SUCCESSFULLY!!!")
    } catch (error) {
        console.error("Error connecting to MONGODB", error)
        process.exit(1)
    }
}