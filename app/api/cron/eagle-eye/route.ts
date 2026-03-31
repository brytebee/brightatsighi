import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmailNotification } from "@/lib/core/notifications";
import { SCHEDULE, sendReminderEmail } from "@/lib/notifications/schedule";

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
  imageUrl: string | null;
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
  return plainMatch ? plainMatch[1].trim().replace(/<[^>]+>/g, "").slice(0, 800) : "";
}

function extractImage(xml: string): string | null {
  const enclosure = xml.match(/<enclosure[^>]*url=["']([^"']+)["']/i);
  if (enclosure) return enclosure[1];
  const mediaContent = xml.match(/<media:content[^>]*url=["']([^"']+)["']/i);
  if (mediaContent) return mediaContent[1];
  const mediaThumb = xml.match(/<media:thumbnail[^>]*url=["']([^"']+)["']/i);
  if (mediaThumb) return mediaThumb[1];
  const imgTag = xml.match(/<img[^>]*src=["']([^"']+)["']/i);
  if (imgTag) return imgTag[1];
  return null;
}

function parseRSS(xml: string, limit = 3): RSSItem[] {
  const items: RSSItem[] = [];
  const itemBlocks = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];

  for (const block of itemBlocks.slice(0, limit)) {
    const title = extractTag(block, "title");
    let description = extractTag(block, "description");
    const link = extractTag(block, "link");
    const pubDate = extractTag(block, "pubDate");
    const imageUrl = extractImage(block);

    // Filter out embedded images from description text to avoid double-rendering
    description = description.replace(/<img[^>]*>/gi, "").replace(/<div>\s*<\/div>/gi, "").replace(/<p>\s*<\/p>/gi, "").trim();

    if (title && link) {
      items.push({ title, description, link, pubDate, imageUrl });
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

// ── AI SYNTHESIS ─────────────────────────────────────────────────
async function fetchAndSummarize(url: string, title: string, fallbackDesc: string): Promise<string> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    const html = await res.text();
    const pTags = html.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
    let articleText = pTags.map((p: string) => p.replace(/<[^>]+>/g, '').trim()).filter((p: string) => p.length > 50).join('\n\n');
    
    if (articleText.length < 200) articleText = fallbackDesc;

    const prompt = `You are an elite Cybersecurity, Fintech, and Tech Executive. Write a comprehensive, highly insightful 3-paragraph Executive Point-of-View (POV) analysis on the following news. Give a clear, authoritative stance so that my social media pipeline has rich context later. Keep it strictly professional, no fluff.\n\nTitle: ${title}\nContext: ${articleText.slice(0, 3000)}`;
    
    const aiRes = await fetch("https://text.pollinations.ai/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: prompt }], model: "openai" }),
      signal: AbortSignal.timeout(15000)
    });

    if (aiRes.ok) {
      const data = await aiRes.json();
      return data.choices[0].message.content;
    }
  } catch (e) {
    console.warn("AI Synthesis failed:", e);
  }
  return fallbackDesc || "Analysis deferred.";
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

  let finalImageUrl = item.imageUrl;
  let usedNativeImage = !!finalImageUrl;

  if (!finalImageUrl) {
    const seed = Math.floor(Math.random() * 999999);
    const imagePrompt = `cinematic intelligence briefing cover for "${item.title}". Cyberpunk, neon green on dark obsidian, dramatic, masterpiece, 8k`;
    finalImageUrl = `https://gen.pollinations.ai/image/${encodeURIComponent(imagePrompt)}?width=1200&height=630&nologo=true&seed=${seed}`;
  }

  // Generate deep synthesis POV
  const synthesizedContent = await fetchAndSummarize(item.link, item.title, item.description);
  const htmlContent = `${synthesizedContent.split('\n\n').map(p => `<p>${p}</p>`).join('')}<hr/><p><a href="${item.link}">${item.link}</a></p>`;

  const article = await (prisma.writing as any).create({
    data: {
      title: item.title.slice(0, 200),
      description: item.description || item.title,
      content: htmlContent,
      category,
      status:    "PENDING",    // ← waits in /admin/intelligence for your approval
      published: false,
      isAutomated: true,
      sourceUrl: item.link,
      image: finalImageUrl,
      date: item.pubDate ? new Date(item.pubDate) : new Date(),
    },
  });

  // Pre-warm the Pollinations.ai image generation if an AI fallback was used
  if (!usedNativeImage) {
    fetch(finalImageUrl as string, { signal: AbortSignal.timeout(10000) }).catch(() => {});
  }

  await (prisma as any).agentHeartbeat.create({
    data: {
      agentName: "Eagle-Eye",
      task: "Intelligence Acquisition",
      status: "PENDING_REVIEW",
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
      `🦅 Eagle Eye: ${totalPublished} brief${totalPublished === 1 ? "" : "s"} queued for review`,
      `
      <h2>🦅 Eagle Eye Morning Sweep</h2>
      <p><strong>${totalPublished} new intelligence brief${totalPublished === 1 ? "" : "s"}</strong> have been drafted and are waiting for your approval.</p>
      <p>👉 <a href="${process.env.NEXTAUTH_URL ?? "https://britebee.vercel.app"}/admin/intelligence"><strong>Review in Mission Control →</strong></a></p>
      <p>Open each dossier, read the synthesis, then click <strong>"Authorize Release"</strong> to publish to the public feed.</p>
      <table border="1" cellpadding="6" style="border-collapse:collapse;font-family:monospace">
        <thead><tr><th>Source</th><th>Queued</th><th>Skipped (dup)</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <hr/>
      <p><small>Eagle Eye Intelligence System • ${new Date().toUTCString()}</small></p>
      `
    );
  }

  // ─────────────────────────────────────────────────────────────
  // LEGACY MORNING-ACTION SCHEDULE TRIGGER
  // ─────────────────────────────────────────────────────────────
  try {
    const todayStr = new Date().toISOString().split("T")[0];
    const action = SCHEDULE.find((a) => a.date === todayStr);
    if (action) {
      await sendReminderEmail("action", action);
      console.log(`✉️ legacy morning-action triggered for ${todayStr}`);
    }
  } catch (err) {
    console.error("❌ Schedule email failure:", err);
  }

  return NextResponse.json({
    ok: true,
    totalPublished,
    timestamp: new Date().toUTCString(),
    results,
  });
}
