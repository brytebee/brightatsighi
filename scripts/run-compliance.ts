import dotenv from "dotenv";
dotenv.config();

import { ComplianceAgent } from "../lib/core/compliance";

/**
 * Compliance Simulation Engine
 * Generates a burst of transactions for the Fintech Lab.
 */
async function runSimulation() {
  const agent = new ComplianceAgent();
  const burstCount = Math.floor(Math.random() * 5) + 3; // 3 to 8 transactions per burst

  console.log(`📡 Fintech Lab: Initiating Transaction Burst (${burstCount} units)...`);

  for (let i = 0; i < burstCount; i++) {
    const trx = agent.generateTransaction();
    console.log(`   [${trx.id}] ${trx.sender} -> ${trx.merchant} (${trx.amount} ${trx.currency}) | Risk: ${trx.riskScore}%`);
    
    await agent.processTransaction(trx);
    
    // Tiny delay between transactions in a burst
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`✅ Burst Complete. Logs pushed to Mission Control.`);
}

runSimulation().catch(err => {
  console.error("❌ Simulation Failure:", err);
  process.exit(1);
});
