// run-mission.mjs — Manual pipeline trigger for local development
// Usage: node scripts/run-mission.mjs [--category esports-intelligence]
// Fetches a real RSS item and creates a PENDING draft for admin review.

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import nodemailer from "nodemailer";

dotenv.config();

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// ── RSS SOURCES ──────────────────────────────────────────────────
const SOURCES = [
  { category: "esports-intelligence", url: "https://esportsinsider.com/feed/" },
  { category: "esports-intelligence", url: "https://dotesports.com/feed" },
  { category: "tech-intelligence",    url: "https://techcabal.com/feed/" },
  { category: "tech-intelligence",    url: "https://disrupt-africa.com/feed/" },
  { category: "fintech-policy",       url: "https://www.finextra.com/rss/headlines.aspx" },
  { category: "ai-systems",           url: "https://www.deeplearning.ai/the-batch/feed/" },
];

function extractTag(xml, tag) {
  const cdata = xml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, "i"));
  if (cdata) return cdata[1].trim();
  const plain = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return plain ? plain[1].trim().replace(/<[^>]+>/g, "").slice(0, 800) : "";
}

function extractImage(xml) {
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

function parseRSS(xml) {
  const items = [];
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];
  for (const block of blocks.slice(0, 3)) {
    const title = extractTag(block, "title");
    let description = extractTag(block, "description");
    const link = extractTag(block, "link");
    const pubDate = extractTag(block, "pubDate");
    const imageUrl = extractImage(block);

    // Clean up description if it contains image tags
    description = description.replace(/<img[^>]*>/gi, "").replace(/<div>\s*<\/div>/gi, "").replace(/<p>\s*<\/p>/gi, "").trim();

    if (title && link) items.push({ title, description, link, pubDate, imageUrl });
  }
  return items;
}

async function fetchFeed(url) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "BryteBeeEagleEye/1.0" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) { console.warn(`⚠️  ${url} → HTTP ${res.status}`); return []; }
    return parseRSS(await res.text());
  } catch (e) {
    console.warn(`⚠️  ${url} → ${e.message}`);
    return [];
  }
}

async function alreadyExists(title) {
  const ex = await prisma.writing.findFirst({ where: { title: { contains: title.slice(0, 60) } } });
  return !!ex;
}

// ── AI SYNTHESIS ─────────────────────────────────────────────────
async function fetchAndSummarize(url, title, fallbackDesc) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    const html = await res.text();
    // Extract paragraph text heuristically
    const pTags = html.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
    let articleText = pTags.map(p => p.replace(/<[^>]+>/g, '').trim()).filter(p => p.length > 50).join('\n\n');
    
    // If we failed to scrape enough text, fallback to whatever description we had
    if (articleText.length < 200) articleText = fallbackDesc;

    console.log(`   🧠 Synthesizing POV for: "${title.slice(0, 40)}..."`);
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
    console.warn("   ⚠️ AI Synthesis failed:", e.message);
  }
  return fallbackDesc || "Processing deferred for manual review.";
}

// ── CLOUDINARY (optional) ────────────────────────────────────────
const isCloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET;
if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// ── MAIN ─────────────────────────────────────────────────────────
async function main() {
  console.log("🚀 Eagle Eye Manual Sweep starting...\n");

  let totalFetched = 0;
  let totalPublished = 0;

  for (const source of SOURCES) {
    console.log(`📡 Fetching: ${source.url}`);
    const items = await fetchFeed(source.url);
    console.log(`   → ${items.length} item(s) found`);

    for (const item of items) {
      totalFetched++;
      if (await alreadyExists(item.title)) {
        console.log(`   ⏭  Dup skipped: "${item.title.slice(0, 60)}..."`);
        continue;
      }

      let finalImageUrl = item.imageUrl;
      let usedNativeImage = !!finalImageUrl;

      if (!finalImageUrl) {
        const seed = Math.floor(Math.random() * 999999);
        const prompt = `cinematic intelligence briefing cover art for "${item.title}". Cyberpunk, neon green accents, dark obsidian, dramatic, 8k`;
        finalImageUrl = `https://gen.pollinations.ai/image/${encodeURIComponent(prompt)}?width=1200&height=630&nologo=true&seed=${seed}`;
        
        // Optionally push AI image to Cloudinary for persistence
        if (isCloudinaryConfigured) {
          try {
            const res = await cloudinary.uploader.upload(finalImageUrl, {
              folder: process.env.CLOUDINARY_FOLDER || "eagle-eye",
              public_id: `intel-${Date.now()}`,
            });
            finalImageUrl = res.secure_url;
            console.log("   ☁️  Pushed AI Cover to Cloudinary");
          } catch {
            console.warn("   ⚠️  Cloudinary failed, using Pollinations URL");
          }
        }
      } else {
        console.log("   🖼️  Extracted Native Source Image");
      }

      // Generate deep synthesis POV
      const synthesizedContent = await fetchAndSummarize(item.link, item.title, item.description);
      const htmlContent = `${synthesizedContent.split('\n\n').map(p => `<p>${p}</p>`).join('')}<hr/><p><a href="${item.link}">${item.link}</a></p>`;

      const article = await prisma.writing.create({
        data: {
          title: item.title.slice(0, 200),
          description: item.description || item.title,
          content: htmlContent,
          category: source.category,
          status: "PENDING",
          isAutomated: true,
          sourceUrl: item.link,
          image: finalImageUrl,
          published: false,
          date: item.pubDate ? new Date(item.pubDate) : new Date(),
        },
      });

      // Pre-warm the generated image if not native to avoid Next.js timeouts
      if (!usedNativeImage && !isCloudinaryConfigured) {
        fetch(finalImageUrl, { signal: AbortSignal.timeout(10000) }).catch(() => {});
      }

      console.log(`   ✅ PENDING draft created → "${article.id}"`);
      totalPublished++;
    }
  }

  // Send email summary if credentials available
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_APP_PASSWORD;
  if (emailUser && emailPass && totalPublished > 0) {
    try {
      const transporter = nodemailer.createTransport({ service: "gmail", auth: { user: emailUser, pass: emailPass } });
      await transporter.sendMail({
        from: `"Eagle Eye" <${emailUser}>`,
        to: emailUser,
        subject: `⚠️ ${totalPublished} draft(s) ready for review`,
        html: `<h2>Eagle Eye Manual Sweep</h2><p>${totalPublished} draft(s) created. Review at <a href="${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/admin/intelligence">/admin/intelligence</a>.</p>`,
      });
      console.log(`\n📧 Review email sent to ${emailUser}`);
    } catch (e) {
      console.warn("Email skipped:", e.message);
    }
  }

  console.log(`\n✅ Sweep complete — ${totalFetched} fetched, ${totalPublished} queued for review.`);
  console.log("   → Approve at: /admin/intelligence");
}

main()
  .catch((e) => { console.error("❌ Mission aborted:", e); process.exit(1); })
  .finally(() => prisma.$disconnect());
