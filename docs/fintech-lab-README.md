# System README — Fintech Compliance Engine
## `/lab/fintech` · v4.0

> **Interview cheatsheet:** Read this before any fintech or compliance-adjacent conversation.

---

## What It Is

A real-time AI compliance and fraud detection perimeter, simulating a production-grade AML/FRAUD monitoring system for a CBN-regulated fintech.

Think: the internal compliance dashboard at a company like Mono, Brass, or Credit Direct — but built as a transparent, demonstrable system.

---

## The Problem It Solves

Most Nigerian fintechs under ₦1B in funding can't afford a dedicated compliance engineering team. They either:
1. Buy expensive off-the-shelf compliance software (Featurespace, NICE Actimize) at ₦50M+/year
2. Build nothing and hope CBN doesn't audit them

This system shows a third path: a **rule-based heuristic compliance layer** that can be shipped by one engineer, runs in under 200ms, and integrates with any Prisma-based stack.

---

## How It Works (What, Not How)

1. **Transaction Ingestion** — The `ComplianceAgent` generates realistic NGN transactions across merchants (Paystack, Flutterwave, Binance, Amazon), locations (Lagos, London, New York), and channels (WEB, MOBILE, POS, ATM)

2. **Risk Scoring** — Each transaction is assigned a risk score (0–100) based on configurable rules: transaction amount, merchant type, location, time pattern, and channel

3. **Alert Classification** — Transactions above risk thresholds generate `ComplianceAlert` records:
   - Score > 75 → MEDIUM alert
   - Score > 90 → HIGH alert
   - Score > 95 → CRITICAL alert — triggers AML flag if amount > ₦4,000

4. **Heartbeat Logging** — Every processed transaction writes to `AgentHeartbeat`, creating a verifiable audit trail of agent activity

5. **Live Dashboard** — The UI (`/lab/fintech`) renders all of this in real-time with risk-color-coded rows, severity-banded alerts with progress bars, and a perimeter status panel

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 App Router |
| Language | TypeScript (strict) |
| Database | Prisma ORM → PostgreSQL |
| Server Actions | Next.js `use server` |
| UI | Tailwind CSS, custom CSS animations |
| Deployment | Vercel |

---

## Key Technical Decisions

- **No ML model** — Heuristic rule engine, not statistical model. This was intentional: explainability > accuracy for regulatory contexts. A CBN examiner can follow the rules; they can't follow a neural network.
- **Server Actions for simulation** — The "Trigger Burst" button uses RSC + Server Actions to run agent logic server-side and `revalidatePath` to refresh UI — zero client-side state mutation.
- **Prisma as the source of truth** — All agent output is persisted. This means the system is auditable: every transaction, alert, and heartbeat is a database record with a timestamp.

---

## What To Say In An Interview

> *"I built a compliance monitoring system in TypeScript that processes transactions, scores fraud risk using configurable heuristics, and generates AML alerts. The key architectural decision was choosing a rule-based engine over ML — because in a regulated environment, you need to explain every decision to an examiner, and 'the model said so' isn't acceptable. The system processes each transaction in under 200ms and writes a full audit trail to Postgres."*

**Follow-up questions you should expect:**
- *"How would you make the rules configurable without a deploy?"* → Admin panel with rule CRUD, stored in DB
- *"How would you scale this to 10,000 TPS?"* → Queue-based ingestion (BullMQ/SQS), event streaming, read replicas
- *"How does it handle false positives?"* → Human-in-the-loop review queue; alerts have `resolved` field for analyst workflow
- *"What regulatory frameworks does it align with?"* → CBN AML/CFT Framework 2022, FATF Recommendations 16 (wire transfer)
