import { prisma } from "../lib/prisma";
import { portfolioData } from "../lib/data";

async function main() {
  console.log("Start seeding...");

  // 1. Seed Profile
  // We upsert ensuring only one profile exists usually, or just create fresh.
  // For simplicity, we'll delete all and create new.
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

  // 2. Seed Skills
  await prisma.skillCategory.deleteMany();
  for (const skill of portfolioData.skills) {
    await prisma.skillCategory.create({
      data: {
        category: skill.category,
        items: skill.items,
      },
    });
  }

  // 3. Seed Experience
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

  // 4. Seed Projects
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

  // 5. Seed Recommendations
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

  // 6. Seed Writing
  await prisma.writing.deleteMany();
  // Writing might be empty in data.ts if we switched to Medium, checking existence
  if (portfolioData.writing) {
    for (const w of portfolioData.writing) {
      await prisma.writing.create({
        data: {
          title: w.title,
          description: w.description,
          link: w.link,
          date: w.date,
          readTime: w.readTime,
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
