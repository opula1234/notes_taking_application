import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import dotenv from "dotenv"

dotenv.config()

/**
 * @file rateLimiter.js
 * @description Configures and exports a Redis-backed rate limiter using Upstash.
 *
 * This module initializes a rate limiter powered by Upstash Redis.
 * It helps protect the API from abuse by limiting the number of
 * requests a client can make within a specified time window.
 *
 * ---------------------------------------------------------------------------
 * Core Responsibilities
 * ---------------------------------------------------------------------------
 * 1. Load environment variables using dotenv.
 * 2. Initialize a Redis client using environment credentials.
 * 3. Configure a sliding window rate limiting strategy.
 * 4. Export the configured rate limiter instance.
 *
 * ---------------------------------------------------------------------------
 * Rate Limiting Strategy
 * ---------------------------------------------------------------------------
 * - Algorithm: Sliding Window
 * - Limit: 100 requests
 * - Window Duration: 60 seconds
 *
 * This means a client can make a maximum of 100 requests within
 * any rolling 60-second window.
 *
 * ---------------------------------------------------------------------------
 * Environment Variables Required
 * ---------------------------------------------------------------------------
 * - UPSTASH_REDIS_REST_URL:
 *     The REST URL of your Upstash Redis database.
 *
 * - UPSTASH_REDIS_REST_TOKEN:
 *     The authentication token for accessing the Redis instance.
 *
 * ---------------------------------------------------------------------------
 * Usage
 * ---------------------------------------------------------------------------
 * The exported `ratelimit` instance can be used inside middleware
 * to check whether a request should be allowed or rejected.
 *
 * Example:
 *   const { success } = await ratelimit.limit(identifier);
 *   if (!success) {
 *       return res.status(429).json({ message: "Too many requests" });
 *   }
 *
 * @module rateLimiter
 */

// create a ratelimiter that allows 10 requests per 20 seconds

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "60 s"),
})

export default ratelimit;