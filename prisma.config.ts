import { config } from "dotenv";
import { defineConfig } from "prisma/config";

config({ path: ".env.local" });
config();

export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
        seed: "node -r ts-node/register prisma/seed.ts",
    },
    datasource: {
        url: process.env.DATABASE_URL ?? "",
    },
});