import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const deleted = await prisma.writing.deleteMany({
      where: { status: "PENDING", isAutomated: true },
    });
    console.log(`🧹 Wiped ${deleted.count} outdated pending drafts.`);
  } catch (error) {
    console.error("Failed to wipe drafts:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
