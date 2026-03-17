import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import dotenv from "dotenv";
import { portfolioData } from "./data.mjs"; // I will create this mjs version of data

dotenv.config();

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Start seeding...");

  await prisma.profile.deleteMany();
  await prisma.profile.create({
    data: {
      name: portfolioData.personalInfo.name,
      role: portfolioData.personalInfo.role,
      tagline: portfolioData.personalInfo.tagline,
      summary: portfolioData.personalInfo.summary,
      location: portfolioData.personalInfo.location,
      email: portfolioData.personalInfo.email,
      socials: portfolioData.personalInfo.socials,
      ctaText: portfolioData.callToAction.text,
      ctaEmail: portfolioData.callToAction.email,
      whatsapp: portfolioData.chatData.whatsapp,
      telegram: portfolioData.chatData.telegram,
      discord: portfolioData.chatData.discord,
      linkedin: portfolioData.chatData.linkedin,
      recommendationsExternalLink: portfolioData.recommendationsExternalLink,
    },
  });

  await prisma.skillCategory.deleteMany();
  for (const skill of portfolioData.skills) {
    await prisma.skillCategory.create({
      data: {
        category: skill.category,
        items: skill.items,
      },
    });
  }

  await prisma.experience.deleteMany();
  for (const exp of portfolioData.experience) {
    await prisma.experience.create({
      data: {
        company: exp.company,
        role: exp.role,
        period: exp.period,
        description: exp.description,
        link: exp.link,
      },
    });
  }

  await prisma.project.deleteMany();
  for (const proj of portfolioData.projects) {
    await prisma.project.create({
      data: {
        title: proj.title,
        description: proj.description,
        technologies: proj.technologies,
        metrics: proj.metrics,
        link: proj.link,
        image: proj.image,
        repo: proj.repo,
      },
    });
  }

  await prisma.recommendation.deleteMany();
  for (const rec of portfolioData.recommendations) {
    await prisma.recommendation.create({
      data: {
        name: rec.name,
        role: rec.role,
        company: rec.company,
        text: rec.text,
        image: rec.image,
      },
    });
  }

  await prisma.writing.deleteMany();
  if (portfolioData.writing) {
    for (const w of portfolioData.writing) {
      await prisma.writing.create({
        data: {
          title: w.title,
          description: w.description,
          link: w.link,
          date: new Date(w.date),
          readTime: w.readTime,
          category: "tech",
          status: "APPROVED",
        },
      });
    }
  }

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
