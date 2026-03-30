import { prisma } from "../lib/prisma";

async function main() {
  try {
    const deleted = await (prisma.writing as any).deleteMany({
      where: { status: "PENDING", isAutomated: true },
    });
    console.log(`🧹 Wiped ${deleted.count} outdated pending drafts.`);
  } catch (error) {
    console.error("Failed to wipe drafts:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
