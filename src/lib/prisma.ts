import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const globalForPrisma = global as unknown as { prisma?: PrismaClient | any };

const connectionString = process.env.DATABASE_URL;

// If no DATABASE_URL is provided, we still want local dev to run without hard failure.
// Prefer the real database when available; otherwise expose a tiny in-memory fallback
// that implements the bits this app uses (signals table) so the UI can load.
let prismaInstance: PrismaClient | any;

if (!connectionString) {
    console.warn("DATABASE_URL not set — falling back to in-memory Prisma mock for dev");
    prismaInstance = {
        signal: {
            findMany: async () => [],
            count: async () => 0,
            create: async (opts: any) => ({ id: "dev-1", ...opts.data }),
        },
    };
} else {
    try {
        const adapter = new PrismaPg(new Pool({ connectionString }));
        prismaInstance =
            globalForPrisma.prisma ||
            new PrismaClient({
                adapter,
                log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
            });

        if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaInstance;
    } catch (err) {
        // If Prisma fails to initialize (network/db issues), fallback to a minimal mock to avoid crashing the dev server.
        console.error("Prisma initialization failed, using in-memory fallback:", err);
        prismaInstance = {
            signal: {
                findMany: async () => [],
                count: async () => 0,
                create: async (opts: any) => ({ id: "dev-1", ...opts.data }),
            },
        };
    }
}

export const prisma = prismaInstance;
