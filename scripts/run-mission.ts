import { runScoutAgent } from "../lib/core/scout";
import { runArchitectAgent } from "../lib/core/architect";

async function main() {
  console.log("🚀 Mission Control: Initiating EagleEye Sequence...");

  try {
    const news = await runScoutAgent();
    const draft = await runArchitectAgent(news);

    console.log("\n✅ Mission Success!");
    console.log(`📄 Draft Title: ${draft.title}`);
    console.log(`📁 Category: ${draft.category}`);
    console.log(`🕒 Status: ${draft.status}`);
    console.log("\nIntelligence is ready for review in the database.");
  } catch (error) {
    console.error("\n❌ Mission Aborted: Critical system error.", error);
    process.exit(1);
  }
}

main();
