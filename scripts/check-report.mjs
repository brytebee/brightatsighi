import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const id = "7d378e9e-c8ae-49e2-a17d-e0f7fbad2638";
  const report = await prisma.writing.findUnique({
    where: { id },
  });
  console.log("Report:", JSON.stringify(report, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
