import { config } from "dotenv"
import { defineConfig } from "drizzle-kit"

config({ path: ".env.local" })

const URL = process.env.DATABASE_URL!

export default defineConfig({
   schema: "./src/db/schema.ts",
   dialect: "postgresql",
   dbCredentials: {
      url: URL,
   },
   strict: true,
   verbose: true,
})
