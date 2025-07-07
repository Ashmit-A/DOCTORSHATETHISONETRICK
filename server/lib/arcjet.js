import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import "dotenv/config";

export const aj = arcjet({

  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"], // Track requests by IP
  rules: [
    shield({ mode: "LIVE" }), // Blocks requests.
    // detectBot({
    //   mode: "LIVE",
    //   allow: [
    //     "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
    //   ],
    // }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5, // Refill 5 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 10, // Bucket capacity of 10 tokens
    }),
  ],
});