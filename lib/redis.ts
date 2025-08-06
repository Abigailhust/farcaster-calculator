import { Redis } from "@upstash/redis";
import { env } from "process";

if (!env.REDIS_URL || !env.REDIS_TOKEN) {
  console.warn(
    "REDIS_URL or REDIS_TOKEN environment variable is not defined, please add to enable background notifications and webhooks.",
  );
}

// Check if we have valid Redis configuration (not placeholder values)
const hasValidRedisConfig = 
  env.REDIS_URL && 
  env.REDIS_TOKEN && 
  env.REDIS_URL !== "placeholder-redis-url" && 
  env.REDIS_TOKEN !== "placeholder-redis-token" &&
  env.REDIS_URL.startsWith("https://");

export const redis = hasValidRedisConfig
  ? new Redis({
      url: env.REDIS_URL,
      token: env.REDIS_TOKEN,
    })
  : null;
