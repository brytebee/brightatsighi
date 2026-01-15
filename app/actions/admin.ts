"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";

async function checkAuth() {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized Access");
  }
}

// Zod Schemas

// Zod Schemas
const ProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  tagline: z.string().min(10, "Tagline must be at least 10 characters"),
  summary: z.string().min(50, "Summary must be at least 50 characters"),
});

const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  link: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  repo: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  metrics: z.string().optional(),
  image: z.string().optional(),
  technologies: z
    .array(z.string())
    .min(1, "At least one technology is required"),
});

export async function updateProfile(formData: FormData) {
  await checkAuth();
  const rawData = {
    name: formData.get("name"),
    role: formData.get("role"),
    tagline: formData.get("tagline"),
    summary: formData.get("summary"),
  };

  // Validate
  const result = ProfileSchema.safeParse(rawData);

  if (!result.success) {
    // In a real app, we would return these errors to the form.
    // For now, we log/throw to prevent DB corruption.
    console.error("Validation Error:", result.error.flatten());
    throw new Error("Invalid profile data");
  }

  // We need to fetch the ID or assume first profile
  const profile = await prisma.profile.findFirst();

  if (profile) {
    await prisma.profile.update({
      where: { id: profile.id },
      data: result.data,
    });
    revalidatePath("/admin/profile");
  }
}

export async function createProject(formData: FormData) {
  await checkAuth();
  const title = formData.get("title");
  const description = formData.get("description");
  const link = formData.get("link") || "";
  const repo = formData.get("repo") || "";
  const metrics = formData.get("metrics") || "";
  const image = formData.get("image") || "";
  const technologiesRaw = formData.get("technologies") as string;

  // transform technologies
  const technologies = technologiesRaw
    ? technologiesRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const rawData = {
    title,
    description,
    link,
    repo,
    metrics,
    image,
    technologies,
  };

  // Validate
  const result = ProjectSchema.safeParse(rawData);

  if (!result.success) {
    console.error("Validation Error:", result.error.flatten());
    throw new Error(
      "Invalid project data: " +
        JSON.stringify(result.error.flatten().fieldErrors)
    );
  }

  await prisma.project.create({
    data: {
      title: result.data.title,
      description: result.data.description,
      link: result.data.link || null,
      repo: result.data.repo || null,
      metrics: result.data.metrics || null,
      image: result.data.image || null,
      technologies: result.data.technologies,
    },
  });
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  await checkAuth();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
}

const ExperienceSchema = z.object({
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  period: z.string().min(1, "Period is required"),
  link: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  description: z
    .array(z.string())
    .min(1, "At least one description point is required"),
});

const WritingSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  link: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  content: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  readTime: z.string().optional(),
});

export async function createExperience(formData: FormData) {
  await checkAuth();
  const rawData = {
    company: formData.get("company"),
    role: formData.get("role"),
    period: formData.get("period"),
    link: formData.get("link") || "",
    description: [] as string[],
  };

  // Extract description items (handling dynamic form inputs)
  const descJson = formData.get("description_json") as string;
  try {
    if (descJson) {
      rawData.description = JSON.parse(descJson);
    }
  } catch (e) {
    console.error("Failed to parse description JSON", e);
  }

  const result = ExperienceSchema.safeParse(rawData);

  if (!result.success) {
    console.error("Validation Error:", result.error.flatten());
    throw new Error("Invalid experience data");
  }

  await prisma.experience.create({
    data: {
      company: result.data.company,
      role: result.data.role,
      period: result.data.period,
      link: result.data.link || null,
      description: result.data.description,
    },
  });
  revalidatePath("/admin/experience");
}

export async function createWriting(formData: FormData) {
  await checkAuth();
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    link: formData.get("link") || "",
    content: formData.get("content") || "",
    date: formData.get("date"),
    readTime: formData.get("readTime") || "",
    published: formData.get("published") === "true",
  };

  // Note: WritingSchema doesn't have 'published' yet, and safeParse strips unknown keys.
  // We should update the schema or manually add it to data.

  // Validate core fields
  const result = WritingSchema.safeParse(rawData);

  if (!result.success) {
    console.error("Validation Error:", result.error.flatten());
    throw new Error("Invalid writing data");
  }

  await prisma.writing.create({
    data: {
      title: result.data.title,
      description: result.data.description,
      link: result.data.link || null,
      content: result.data.content || null,
      date: result.data.date,
      readTime: result.data.readTime || null,
      published: rawData.published,
    },
  });
  revalidatePath("/admin/writing");
}
