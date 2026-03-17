import * as dotenv from "dotenv";

dotenv.config();

const { prisma } = require("../lib/prisma");

console.log("DATABASE_URL:", process.env.DATABASE_URL);
async function main() {
  console.log("Seeding Intelligence Reports...");

  const reports = [
    {
      title: "Tactical Shift: The Rise of AI Coaching in VALORANT",
      description:
        "Recent data from EMEA scrims suggests a 15% increase in round conversion when using real-time predictive line-up analytics.",
      category: "esports-intelligence",
      status: "APPROVED",
      image: "/ohiole-lagos.png",
      date: new Date("2024-02-28"),
    },
    {
      title: "Economic Impact of Global Esports Tourism",
      description:
        "How major LAN events are driving digital payments and localized fintech solutions in emerging markets.",
      category: "esports-intelligence",
      status: "APPROVED",
      image: "/asusu-fintech.png",
      date: new Date("2024-02-25"),
    },
    {
      title: "Surveillance Report: Anti-Cheat Evolution",
      description:
        "A deep dive into kernel-level security measures and the hardware-id blocking landscape for 2024 competitive play.",
      category: "esports-intelligence",
      status: "APPROVED",
      image: "/school-test-system.png",
      date: new Date("2024-02-20"),
    },
    {
      title: "Predictive Analytics: Worlds 2024 Outlook",
      description:
        "Agent neural networks analyze historical performance data to predict the next meta shift in professional League of Legends.",
      category: "esports-intelligence",
      status: "APPROVED",
      image: "/opengraph-image.png",
      date: new Date("2024-02-15"),
    },
    {
      title: "Dossier: The Future of Neural-Linked Control",
      description:
        "Evaluating the integration of low-latency brain-computer interfaces in fast-twitch rhythm games.",
      category: "esports-intelligence",
      status: "APPROVED",
      image: "/opengraph-image2.png",
      date: new Date("2024-02-10"),
    },
  ];

  for (const report of reports) {
    // Check if title already exists to avoid duplicates
    const existing = await (prisma.writing as any).findFirst({
      where: { title: report.title },
    });

    if (!existing) {
      await (prisma.writing as any).create({
        data: report,
      });
    }
  }

  console.log("Intelligence Reports Seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
