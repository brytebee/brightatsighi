# System README — Intelligence Platform
## `/intelligence` (→ `/intel`) · v2.0

> **Interview cheatsheet:** Read this before any media-tech, editorial AI, or content pipeline conversation.

---

## What It Is

An automated editorial intelligence platform powered by the **Architect-Agent** — a server-side agent that drafts structured intelligence briefs from news signals and routes them through a human approval layer before publishing to a dossier-style public feed.

Think: the backend of a Bloomberg Intelligence terminal, but one engineer built it in a week.

---

## The Problem It Solves

Content teams at media companies, investment firms, and industry associations face the same problem:
- It takes 2–4 hours to research, write, and format one quality intelligence brief
- They publish 5–20 pieces per week
- They can't afford to hire the analyst headcount to match that output

The Architect-Agent compresses research-to-draft time to under 30 seconds. A human editor still approves every piece — the AI drafts, the human judges.

---

## How It Works (What, Not How)

1. **Signal Intake** — A news hook (title, description, source URL) is fed to `runArchitectAgent()`

2. **Draft Generation** — The Architect-Agent produces a structured article with markdown-formatted sections, sources cited inline, and a standard narrative structure

3. **Human-in-Loop Review** — Every draft is created with `status: "PENDING"` in the `writing` table. A human editor reviews in the admin panel (`/admin/intelligence`) and changes status to `"APPROVED"` or `"REJECTED"`

4. **Public Feed** — The `/intelligence` feed only shows `APPROVED` content, ordered by date, with a dossier-style IntelligenceCard UI

5. **Agent Heartbeat** — Every draft operation writes to `AgentHeartbeat`, creating an audit trail of the agent's activity and proving the system is live

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (RSC + App Router) |
| Language | TypeScript |
| Database | Prisma ORM → PostgreSQL |
| Agent | Custom TypeScript class (server-side) |
| UI | Tailwind CSS, IntersectionObserver, CSS animations |
| Deployment | Vercel |

---

## Key Technical Decisions

- **Human-in-the-loop by design** — The agent never publishes directly. This isn't a limitation — it's a feature. It allows editorial quality control, legal review, and brand voice alignment.
- **RSC for the feed** — The public feed is a React Server Component — zero client JS for the content listing. Fast, SEO-friendly, and crawlable.
- **Category-extensible schema** — The `writing` table has a `category` field, making the platform immediately extensible to any content vertical (esports, fintech, policy, AI) without schema changes.

---

## What To Say In An Interview

> *"I built an automated editorial platform where an AI agent drafts intelligence briefs from news signals, and human editors approve them before publishing. The key design principle was human-in-the-loop: the agent compresses research time, the human maintains editorial standards. The public feed is entirely server-rendered for SEO, the admin is a separate protected route, and everything is connected through a single Prisma schema."*

**Follow-up questions you should expect:**
- *"How does the agent generate the content?"* → Currently rule-based/template-driven; can be swapped for an LLM API (OpenAI, Anthropic) by changing one function call
- *"How do you ensure content quality?"* → Human approval gate + status field in DB; rejected content is archived not deleted
- *"How would you scale to 100 publications/day?"* → Background job queue (BullMQ), webhook ingestion from RSS feeds, automated categorization
- *"What's the business model?"* → SaaS for media companies: ₦200K–500K/month per publication team for the full pipeline
