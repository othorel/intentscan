import { Mistral } from "@mistralai/mistralai";
import { NextResponse } from "next/server";

import { analyzeResponseSchema } from "@/lib/analyze-schema";

const mistral = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message } = (await request.json()) as { message?: unknown };

    if (typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { message: "Message must contain at least 10 characters." },
        { status: 400 },
      );
    }

    if (!process.env.MISTRAL_API_KEY) {
      return NextResponse.json(
        { message: "Missing MISTRAL_API_KEY." },
        { status: 500 },
      );
    }

    const response = await mistral.chat.complete({
      model: "mistral-small-latest",
      messages: [
        {
          role: "system",
          content: `You are IntentScan, a message intent and risk analyzer.

Analyze the submitted message for scams, phishing, manipulation, spam, aggressive sales, fake recruiting, romance scam, or suspicious social intent.

Return only valid JSON matching this exact shape:
{
  "riskScore": number,
  "riskLevel": "LOW" | "MEDIUM" | "HIGH",
  "intent": "LEGIT" | "SALES" | "SCAM" | "PHISHING" | "ROMANCE" | "RECRUITING" | "UNKNOWN",
  "summary": string,
  "redFlags": string[],
  "manipulationTechniques": string[],
  "replyOptions": {
    "professional": string,
    "firm": string,
    "friendly": string,
    "roast": string
  }
}

Rules:
- Base the analysis only on the submitted message.
- Do not invent facts.
- If unsure, use UNKNOWN.
- Keep all text concise.
- Reply options must be ready to copy and paste.
- The roast reply must be light, not hateful or abusive.`,
        },
        {
          role: "user",
          content: message.trim(),
        },
      ],
      responseFormat: { type: "json_object" },
    });

    const content = response.choices?.[0]?.message?.content;

    if (typeof content !== "string") {
      return NextResponse.json(
        { message: "Invalid AI response." },
        { status: 502 },
      );
    }

    const parsed = analyzeResponseSchema.safeParse(JSON.parse(content));

    if (!parsed.success) {
      return NextResponse.json(
        { message: "AI response did not match schema." },
        { status: 502 },
      );
    }

    return NextResponse.json(parsed.data);
  } catch {
    return NextResponse.json(
      { message: "Failed to analyze message." },
      { status: 500 },
    );
  }
}
