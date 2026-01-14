export interface PortfolioData {
  personalInfo: {
    name: string;
    role: string;
    tagline: string;
    summary: string;
    location: string;
    email: string;
    socials: { platform: string; url: string; icon: string }[];
  };
  skills: {
    category: "Frontend" | "Backend" | "Database & DevOps" | "Tools";
    items: string[];
  }[];
  experience: {
    company: string;
    role: string;
    period: string;
    description: string[];
    link?: string;
  }[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
    repo?: string;
    metrics?: string;
    image?: string;
  }[];
  recommendations: {
    name: string;
    role: string;
    company: string;
    text: string;
    image?: string;
  }[];
  recommendationsExternalLink?: string;
  callToAction: {
    text: string;
    email: string;
  };
  chatData: {
    whatsapp: string;
    telegram: string;
    discord: string;
    linkedin: string;
  };
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Bright Atsighi",
    role: "Full Stack Engineer (Backend Heavy)",
    tagline:
      "Specializing in scalable backend architectures, fintech integrations, and DevOps.",
    summary:
      "Senior-level Full Stack Engineer with over 5 years of experience specializing in scalable backend architectures, fintech integrations, and DevOps. Proven track record of leading products from ideation to launch, including multi-tenant fintech platforms and global e-commerce systems. Expert in Python (DRF), TypeScript (NestJS/Next.js), and containerization (Docker).",
    location: "Nigeria (Open to Remote)",
    email: "brytebee@gmail.com",
    socials: [
      {
        platform: "GitHub",
        url: "https://github.com/brytebee",
        icon: "github",
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/brytebee",
        icon: "linkedin",
      },
      {
        platform: "Medium",
        url: "https://medium.com/@brytebee",
        icon: "medium",
      },
    ],
  },
  skills: [
    {
      category: "Backend",
      items: [
        "Python (DRF)",
        "Node.js",
        "NestJS",
        "Ruby on Rails",
        "RESTful APIs",
        "Redis",
      ],
    },
    {
      category: "Frontend",
      items: ["React", "Next.js", "Redux", "TypeScript", "TailwindCSS"],
    },
    {
      category: "Database & DevOps",
      items: [
        "PostgreSQL",
        "MongoDB",
        "Prisma",
        "Docker",
        "Nginx",
        "DigitalOcean",
        "GitHub Actions",
        "AWS",
      ],
    },
    {
      category: "Tools",
      items: [
        "GitFlow",
        "Agile (Scrum)",
        "Jira",
        "Linux/Shell",
        "Prompt Engineering",
      ],
    },
  ],
  experience: [
    {
      company: "OHIOLE LAGOS (Contract)",
      role: "Lead Full Stack Engineer",
      period: "Oct 2025 – Jan 2026",
      description: [
        "Developed a premium e-commerce platform featuring an automated currency detection system (USD/NGN) based on user geolocation.",
        "Implemented a secure payment gateway using Paystack to facilitate international and local transactions without the need for Stripe.",
        "Managed a cross-functional team of 3 to deliver a production-ready application within a strict 3-month timeline.",
      ],
      link: "https://www.ohiolelagos.com/",
    },
    {
      company: "ASUSU (Contract)",
      role: "Full Stack Developer",
      period: "Aug 2025 - Oct 2025",
      description: [
        "Built and deployed a multi-tenant fintech payment application using Next.js, PostgreSQL, and Prisma.",
        "Orchestrated deployment using Docker, Nginx, and Redis on DigitalOcean to ensure high availability and scalability.",
      ],
      link: "https://www.asusu.biz/",
    },
    {
      company: "TECHVERSE ACADEMY",
      role: "Full Stack Engineer (Co-Founder)",
      period: "Aug 2023 – 2024",
      description: [
        "Led technical architecture for a multi-tenant application, designing comprehensive ERD diagrams and scalable system workflows.",
        "Integrated Google Calendar API and Twilio SMS validation, reducing manual scheduling overhead and improving user verification security.",
        "Architected image optimization pipelines and backend logic to support high-performance education tools.",
      ],
      link: "https://10nth-mnoht-brytebee.vercel.app",
    },
    {
      company: "MICROVERSE",
      role: "Technical Support Engineer",
      period: "Oct 2021 – June 2023",
      description: [
        "Conducted 1,000+ technical code reviews for international developers, focusing on performance, security, and Ruby on Rails/React best practices.",
        "Awarded 'Best Reviewer' for two consecutive months for providing actionable feedback that improved student outcome rates by 15%.",
      ],
    },
  ],
  projects: [
    {
      title: "Ohiole Lagos",
      description:
        "A premium e-commerce platform with automated currency detection (USD/NGN) and secure multi-currency payment processing.",
      technologies: ["Next.js", "Paystack", "Geolocation API", "Node.js"],
      metrics: "Delivered in 3 months with 100% currency accuracy",
      link: "https://www.ohiolelagos.com/",
      image: "/ohiole-lagos.png",
    },
    {
      title: "School Test System",
      description:
        "An end-to-end online testing platform tailored for Nigerian secondary schools, modernizing educational assessment.",
      technologies: ["Full Stack", "Testing Platform", "Educational Tech"],
      metrics: "Comprehensive solution for schools",
      link: "https://school-test-system.vercel.app/",
      image: "/school-test-system.png",
    },
    {
      title: "Asusu Fintech",
      description:
        "Multi-tenant fintech payment application designed for scalability and high availability.",
      technologies: [
        "Next.js",
        "PostgreSQL",
        "Prisma",
        "Docker",
        "Redis",
        "DigitalOcean",
      ],
      metrics: "High availability architecture",
      link: "https://www.asusu.biz/",
      image: "/asusu-fintech.png",
    },
  ],
  recommendations: [
    {
      name: "Susan Falola MBA FRSA",
      role: "Founder/CEO",
      company: "JUUBIX",
      text: "Bright is an amazing team player, leader and strategist. He has exceptional listening skills which makes him outshine his peers in many tasks. He is committed, and has a good problem solving ideas and capabilities.",
      image: "/images/susan.jpeg",
    },
    {
      name: "Hillary Okello",
      role: "Full-Stack Software Developer",
      company: "Microverse",
      text: "I got to learn a lot from him especially about solving coding challenges. He is a great collaborator, he inspired me to keep working hard to become a better developer.",
      image: "/images/hillary.jpeg",
    },
    {
      name: "Temitope Akinlade",
      role: "Software Engineer",
      company: "Colleague",
      text: "One thing that stood out about him was his in-depth knowledge about technical concepts. Bright loves to deliver quality and clean code and will be a valuable asset to his employer.",
      image: "/images/temitope.jpeg",
    },
  ],
  recommendationsExternalLink:
    "https://www.linkedin.com/in/brytebee/details/recommendations/?detailScreenTabIndex=0",
  callToAction: {
    text: "Let's build scalable solutions together.",
    email: "brytebee@gmail.com",
  },
  chatData: {
    whatsapp: "https://wa.me/+2347066324306",
    telegram: "https://t.me/brytebee",
    discord: "https://discord.gg/brytebee",
    linkedin: "https://linkedin.com/in/brytebee",
  },
};
