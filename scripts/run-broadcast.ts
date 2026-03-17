import { prisma } from "../lib/prisma";
import { BroadcasterDispatcher } from "../lib/core/broadcaster";
import dotenv from "dotenv";

dotenv.config();

const dispatcher = new BroadcasterDispatcher();

async function runBroadcaster() {
  console.log(
    "🚀 Broadcaster Agent: Searching for approved intelligence reports...",
  );

  try {
    const pendingBroadcasts = await prisma.writing.findMany({
      where: {
        status: "APPROVED",
        isBroadcasted: false,
      },
    });

    if (pendingBroadcasts.length === 0) {
      console.log(
        "ℹ️ Broadcaster Agent: No reports pending distribution. Mission standby.",
      );
      return;
    }

    console.log(
      `🦅 Broadcaster Agent: Found ${pendingBroadcasts.length} report(s) authorized for release.`,
    );

    for (const article of pendingBroadcasts) {
      console.log(`\n📄 Broadcasting: "${article.title}"`);

      const payload = {
        title: article.title,
        description: article.description,
        content: article.content || "",
        image: article.image || "",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/intelligence/${article.id}`,
      };

      const results = await dispatcher.broadcastAll(payload);

      // Update database with logs
      await prisma.writing.update({
        where: { id: article.id },
        data: {
          isBroadcasted: true,
          broadcastLogs: results as any,
        },
      });

      console.log(
        `✅ Broadcaster Agent: "${article.title}" has been processed across all channels.`,
      );
    }

    console.log("\n🏁 Broadcaster Agent: All pending tasks completed.");
  } catch (error) {
    console.error("❌ Broadcaster Agent: Mission failure.", error);
  } finally {
    await prisma.$disconnect();
  }
}

runBroadcaster();
