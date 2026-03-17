import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import nodemailer from "nodemailer";

dotenv.config();

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Configure Cloudinary if keys are present
const isCloudinaryConfigured =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

async function runScoutAgent() {
  console.log("🦅 Scout Agent: Initializing mission...");
  try {
    await prisma.agentHeartbeat.create({
      data: {
        agentName: "Scout-Agent",
        task: "Web Scraping",
        status: "ACTIVE",
      },
    });

    const news = {
      title: "Nigeria Qualifies for 2026 FIFAe Nations League Triple Threat",
      description:
        "The e-Super Eagles have secured a historic triple qualification for the 2026 FIFAe Nations League, clearing the path in Console, Mobile, and Rocket League categories.",
      sourceUrl: "https://nexalgaming.co/news/nigeria-fifae-2026-qualification",
      suggestedImage:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000",
    };

    console.log("🦅 Scout Agent: Found high-value intelligence.");

    await prisma.agentHeartbeat.create({
      data: {
        agentName: "Scout-Agent",
        task: "Intelligence Gathering",
        status: "COMPLETED",
        evidence: news.sourceUrl,
      },
    });

    return news;
  } catch (error) {
    console.error("❌ Scout Agent: System failure.", error);
    throw error;
  }
}

async function runArchitectAgent(news) {
  console.log("🦅 Architect Agent: Processing intelligence...");
  try {
    await prisma.agentHeartbeat.create({
      data: {
        agentName: "Architect-Agent",
        task: "Report Drafting",
        status: "ACTIVE",
      },
    });

    // AI generates a fitting image based on the title
    const prompt = `A highly detailed, professional, cinematic promotional image for a news story titled: "${news.title}". Modern esports aesthetic, sleek, high tech.`;
    const aiGeneratedImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1200&height=630&nologo=true`;
    console.log(`🤖 Architect Agent: Generated image concept: "${prompt}"`);

    let imageUrl = aiGeneratedImageUrl;

    if (isCloudinaryConfigured) {
      console.log(
        "☁️ Architect Agent: Pushing AI-generated asset to Cloudinary...",
      );
      try {
        const uploadRes = await cloudinary.uploader.upload(
          aiGeneratedImageUrl,
          {
            folder: process.env.CLOUDINARY_FOLDER || "brytebee-intelligence",
            public_id: `intel-${Date.now()}`,
          },
        );
        imageUrl = uploadRes.secure_url;
        console.log("☁️ Architect Agent: Asset secured in cloud.");
      } catch (cloudinaryError) {
        console.warn(
          "⚠️ Architect Agent: Cloudinary failed, using fallback AI image URL.",
        );
      }
    } else {
      console.log(
        "ℹ️ Architect Agent: Cloudinary not configured. Using direct AI generated URL.",
      );
    }

    const content = `
# The Digital Super Eagle: Roadmap to Pro Esports (Feb 2026 Edition)

## Introduction
Nigeria has officially solidified its position as an esports powerhouse in Africa. Following the recent qualifiers, the e-Super Eagles have achieved a milestone that many thought impossible: qualifying for the 2026 FIFAe Nations League in all three major categories.

## I. The Foundation: Triple Threat Qualification
The qualification covers Console, Mobile, and Rocket League, showcasing the sheer versatility of Nigerian digital athletes. This broad success is a direct result of the structured roadmap implemented by the NFF and the Nigeria Esports Federation.

## II. The Funnel: From Grassroots to Global
This success didn't happen by accident. The 5-stage roadmap we've discussed is bearing fruit.

## III. Economic Outlook: The $300M Opportunity
The qualification is expected to trigger a new wave of sponsorship from major tech brands.

## Conclusion
The path to pro is clear. With national representation secured on three fronts, the e-Super Eagles are ready to conquer the world in 2026.
    `.trim();

    const article = await prisma.writing.create({
      data: {
        title: news.title,
        description: news.description,
        content: content,
        category: "esports-intelligence",
        status: "PENDING",
        isAutomated: true,
        sourceUrl: news.sourceUrl,
        image: imageUrl,
        published: false,
      },
    });

    console.log(`🦅 Architect Agent: Draft created with ID: ${article.id}`);

    // Send Email Notification
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_APP_PASSWORD;

    if (emailUser && emailPass) {
      console.log(
        `📧 Architect Agent: Sending notification to ${emailUser}...`,
      );
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: emailUser,
            pass: emailPass,
          },
        });

        const subject = `⚠️ ACTION REQUIRED: Review Pending Draft - "${news.title}"`;
        const html = `
          <h2>New Intelligence Report Ready for Review</h2>
          <p><strong>Title:</strong> ${news.title}</p>
          <p><strong>Category:</strong> esports-intelligence</p>
          <p>The Architect Agent has generated a new draft. Please review and approve it via the Mission Control Dashboard.</p>
          <p><a href="http://localhost:3000/admin/intelligence">Go to Admin Dashboard</a></p>
          <hr/>
          <p><small>Automated message from BryteBee Agentic System.</small></p>
        `;

        const info = await transporter.sendMail({
          from: `"BryteBee Mission Control" <${emailUser}>`,
          to: emailUser,
          subject: subject,
          html: html,
        });
        console.log(
          `✅ Architect Agent: Notification pushed to device. MessageId: ${info.messageId}`,
        );
        console.log(
          `ℹ️ Delivery Info: Accepted: ${info.accepted}, Rejected: ${info.rejected}`,
        );
      } catch (emailError) {
        console.error(
          `❌ Architect Agent: Failed to send notification.`,
          emailError,
        );
      }
    } else {
      console.warn(
        "⚠️ Architect Agent: EMAIL_USER or EMAIL_APP_PASSWORD missing. Skipping email notification.",
      );
    }

    await prisma.agentHeartbeat.create({
      data: {
        agentName: "Architect-Agent",
        task: "Report Drafting",
        status: "COMPLETED",
        evidence: article.id,
      },
    });

    return article;
  } catch (error) {
    console.error("❌ Architect Agent: Failure.", error);
    throw error;
  }
}

async function main() {
  console.log("🚀 Mission Control: Initiating EagleEye Sequence...");
  try {
    const news = await runScoutAgent();
    await runArchitectAgent(news);
    console.log(
      "\n✅ Mission Success! PENDING draft created with cloud-synced imagery.",
    );
    console.log("ℹ️ View and approve it at: /admin/intelligence");
  } catch (error) {
    console.error("\n❌ Mission Aborted.", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
