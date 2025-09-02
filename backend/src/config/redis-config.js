import { createClient } from "redis";
import { config } from "./env-config.js";

const client = createClient({
  username: "default",
  password: config.REDIS_PASSWORD,
  socket: {
    host: config.REDIS_HOST,
    port: Number(config.REDIS_PORT),
  },
});

client.on("error", (err) => console.log("Redis Client Error", err));

// (async () => {
//   try {
//     await client.connect();
//   } catch (err) {
//     console.error("Failed to connect to Redis:", err);
//   }
// })();

await client.connect();

export default client;
