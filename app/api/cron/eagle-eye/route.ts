import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmailNotification } from "@/lib/core/notifications";

// ─────────────────────────────────────────────────────────────
// RSS SOURCES — free, CORS-accessible feeds grouped by category
// ─────────────────────────────────────────────────────────────
const SOURCES = [
  {
    category: "esports-intelligence",
    label: "Esports Insider",
    url: "https://esportsinsider.com/feed/",
  },
  {
    category: "esports-intelligence",
    label: "Dot Esports",
    url: "https://dotesports.com/feed",
  },
  {
    category: "tech-intelligence",
    label: "TechCabal",
    url: "https://techcabal.com/feed/",
  },
  {
    category: "tech-intelligence",
    label: "Disrupt Africa",
    url: "https://disrupt-africa.com/feed/",
  },
  {
    category: "fintech-policy",
    label: "Finextra",
    url: "https://www.finextra.com/rss/headlines.aspx",
  },
  {
    category: "ai-systems",
    label: "The Batch (DeepLearning.AI)",
    url: "https://www.deeplearning.ai/the-batch/feed/",
  },
];

// ─────────────────────────────────────────────────────────────
// RSS PARSER — pure fetch + regex, zero external dependencies
// ─────────────────────────────────────────────────────────────
interface RSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
}

function extractTag(xml: string, tag: string): string {
  // Try CDATA first
  const cdataMatch = xml.match(
    new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, "i")
  );
  if (cdataMatch) return cdataMatch[1].trim();

  // Plain text
  const plainMatch = xml.match(
    new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i")
  );
  return plainMatch ? plainMatch[1].trim().replace(/<[^>]+>/g, "") : "";
}

function parseRSS(xml: string, limit = 3): RSSItem[] {
  const items: RSSItem[] = [];
  const itemBlocks = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];

  for (const block of itemBlocks.slice(0, limit)) {
    const title = extractTag(block, "title");
    const description = extractTag(block, "description");
    const link = extractTag(block, "link");
    const pubDate = extractTag(block, "pubDate");
    if (title && link) {
      items.push({ title, description: description.slice(0, 280), link, pubDate });
    }
  }
  return items;
}

async function fetchFeed(url: string): Promise<RSSItem[]> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "BryteBeeEagleEye/1.0" },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRSS(xml, 2); // 2 articles per source max
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
// DUPLICATE GUARD — skip articles we already have (by title)
// ─────────────────────────────────────────────────────────────
async function isAlreadyPublished(title: string): Promise<boolean> {
  const existing = await (prisma.writing as any).findFirst({
    where: { title: { contains: title.slice(0, 60) } },
  });
  return !!existing;
}

// ─────────────────────────────────────────────────────────────
// ARTICLE CREATOR — saves directly as APPROVED so it shows up
// ─────────────────────────────────────────────────────────────
async function createIntelligenceArticle(
  item: RSSItem,
  category: string
): Promise<string | null> {
  const alreadyExists = await isAlreadyPublished(item.title);
  if (alreadyExists) return null;

  const seed = Math.floor(Math.random() * 999999);
  const imagePrompt = `cinematic intelligence briefing cover for "${item.title}". Cyberpunk, neon green on dark obsidian, dramatic, masterpiece, 8k`;
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=1200&height=630&nologo=true&seed=${seed}`;

  const content = `
<p>${item.description || "Developing intelligence. Full analysis incoming."}</p>
<hr/>
<p><strong>Source:</strong> <a href="${item.link}" target="_blank" rel="noopener">${item.link}</a></p>
<p><em>Auto-processed by Eagle Eye Intelligence System • ${new Date().toUTCString()}</em></p>
`.trim();

  const article = await (prisma.writing as any).create({
    data: {
      title: item.title.slice(0, 200),
      description: item.description || item.title,
      content,
      category,
      status:    "APPROVED",   // ← auto-approved, shows up immediately
      published: true,
      isAutomated: true,
      sourceUrl: item.link,
      image: imageUrl,
      date: item.pubDate ? new Date(item.pubDate) : new Date(),
    },
  });

  await (prisma as any).agentHeartbeat.create({
    data: {
      agentName: "Eagle-Eye",
      task: "Intelligence Acquisition",
      status: "PUBLISHED",
      evidence: article.id,
    },
  });

  return article.id;
}

// ─────────────────────────────────────────────────────────────
// CRON HANDLER — hit by Vercel at 07:30 UTC every day
// ─────────────────────────────────────────────────────────────
export async function GET(req: Request) {
  // Protect from un-authorised calls (Vercel sends this header automatically)
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: { source: string; published: number; skipped: number }[] = [];
  let totalPublished = 0;

  for (const source of SOURCES) {
    const items = await fetchFeed(source.url);
    let published = 0;
    let skipped = 0;

    for (const item of items) {
      const id = await createIntelligenceArticle(item, source.category);
      if (id) {
        published++;
        totalPublished++;
      } else {
        skipped++;
      }
    }

    results.push({ source: source.label, published, skipped });
  }

  // Send a morning briefing email summarising what ran
  if (totalPublished > 0) {
    const rows = results
      .map((r) => `<tr><td>${r.source}</td><td>${r.published}</td><td>${r.skipped}</td></tr>`)
      .join("");

    await sendEmailNotification(
      `🦅 Eagle Eye: ${totalPublished} intelligence brief${totalPublished === 1 ? "" : "s"} published`,
      `
      <h2>🦅 Eagle Eye Morning Sweep</h2>
      <p><strong>${totalPublished} new intelligence brief${totalPublished === 1 ? "" : "s"}</strong> were automatically published to <a href="${process.env.NEXTAUTH_URL ?? "https://britebee.vercel.app"}/intelligence">/intelligence</a>.</p>
      <table border="1" cellpadding="6" style="border-collapse:collapse;font-family:monospace">
        <thead><tr><th>Source</th><th>Published</th><th>Skipped (dup)</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <hr/>
      <p><small>Eagle Eye Intelligence System • ${new Date().toUTCString()}</small></p>
      `
    );
  }

  return NextResponse.json({
    ok: true,
    totalPublished,
    timestamp: new Date().toUTCString(),
    results,
  });
}
