import ratelimit from "../config/upstash.js"

/**
 * Rate Limiter Middleware
 *
 * This middleware limits incoming requests using the configured Upstash rate limiter.
 * It checks whether a request exceeds the defined rate limit and blocks excessive requests.
 *
 * How it works:
 * - Calls ratelimit.limit() with a predefined key ("my-limit-key").
 * - If the request is within the allowed rate, it calls next() to continue.
 * - If the rate limit is exceeded, it returns a 429 status with an error message.
 * - If an internal error occurs, it logs the error and forwards it to Express error handling.
 *
 * Responses:
 * - 429 Too Many Requests:
 *   {
 *     "message": "Too many requests, please try again later"
 *   }
 *
 * Usage:
 * import rateLimiter from "./path/to/rateLimiter.js"
 * app.use(rateLimiter)
 *
 * Dependencies:
 * - ratelimit (Upstash rate limiting configuration)
 *
 * @function rateLimiter
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 */

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-limit-key")

        if (!success) {
            return res.status(429).json({ message: "Too many requests, please try again later" })
        }
        next()
    } catch (error) {
        console.log(`Rate limit error - ${error}`)
        next(error)
    }
}

export default rateLimiter