import * as PrismaModule from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

// Turbopack safety: handle both default and named exports
const PrismaClientConstructor =
  (PrismaModule as any).PrismaClient ||
  (PrismaModule as any).default?.PrismaClient;

const globalForPrisma = globalThis as unknown as {
  prisma: any;
};

const createPrismaClient = () => {
  const connectionString = process.env.DATABASE_URL;

  if (!PrismaClientConstructor) {
    throw new Error(
      "PrismaClient constructor not found in @prisma/client. Check your installation and generation.",
    );
  }

  if (!connectionString) {
    return new PrismaClientConstructor();
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  return new PrismaClientConstructor({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
