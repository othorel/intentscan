import { z } from "zod";

export const analyzeResponseSchema = z.object({
  riskScore: z.number().min(0).max(100),
  riskLevel: z.enum(["LOW", "MEDIUM", "HIGH"]),
  intent: z.enum([
    "LEGIT",
    "SALES",
    "SCAM",
    "PHISHING",
    "ROMANCE",
    "RECRUITING",
    "UNKNOWN",
  ]),
  summary: z.string(),
  redFlags: z.array(z.string()),
  manipulationTechniques: z.array(z.string()),
  replyOptions: z.object({
    professional: z.string(),
    firm: z.string(),
    friendly: z.string(),
    roast: z.string(),
  }),
});

export type AnalyzeResponse = z.infer<typeof analyzeResponseSchema>;
