import { streamObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { documentType, content } = await req.json();

    const result = await streamObject({
      model: google("gemini-1.5-flash"),
      system: `You are an expert Data Architect AI. Your task is to process the raw input document and extract highly structured intelligence. Be decisive and precise. If information is missing, infer the best default or state "UNKNOWN". Format the output strictly to the provided schema.`,
      prompt: `Document Type: ${documentType}\n\nDocument Content:\n${content}`,
      schema: z.object({
        metadata: z.object({
          primaryTopic: z.string().describe("The main focus of the document in 2-4 words"),
          classificationLevel: z.enum(["PUBLIC", "INTERNAL", "CONFIDENTIAL", "RESTRICTED"]),
          estimatedReadingTimeMinutes: z.number().describe("Estimated reading time in minutes"),
        }),
        entities: z.array(
          z.object({
            name: z.string(),
            type: z.enum(["PERSON", "ORGANIZATION", "LOCATION", "CONCEPT", "TECHNOLOGY"]),
            relevanceScore: z.number().describe("Relevance score from 1-100"),
          })
        ).max(5).describe("Top 5 most important entities mentioned"),
        riskAssessment: z.object({
          riskLevel: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
          keyRiskFactors: z.array(z.string()).max(3),
        }),
        executiveSynthesis: z.string().describe("A 3-4 sentence tactical summary of the document's core implications."),
      }),
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("Pipeline extract error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
