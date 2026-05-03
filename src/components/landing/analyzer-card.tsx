"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { AnalyzeResponse } from "@/lib/analyze-schema";

const replyLabels = {
  professional: "Professional",
  firm: "Firm",
  friendly: "Friendly",
  roast: "Roast",
} as const;

export function AnalyzerCard() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function analyzeMessage() {
    if (message.trim().length < 10) {
      setError("Message must contain at least 10 characters.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message ?? "Failed to analyze message.");
        return;
      }

      setResult(data as AnalyzeResponse);
    } catch {
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card id="analyze" className="bg-card/70 shadow-2xl backdrop-blur">
      <CardContent className="p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold">Message analyzer</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Paste anything suspicious.
            </p>
          </div>

          <Badge>{isLoading ? "Analyzing..." : "Live"}</Badge>
        </div>

        <Textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="min-h-56 resize-none"
          placeholder="Paste a weird message here..."
        />

        {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}

        <Button
          onClick={analyzeMessage}
          disabled={isLoading}
          className="mt-4 w-full"
          size="lg"
        >
          {isLoading ? "Analyzing..." : "Analyze intent"}
        </Button>

        {result ? (
          <div className="mt-6 space-y-5 rounded-2xl border border-border bg-background/40 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">
                Risk: {result.riskLevel} ({result.riskScore}/100)
              </Badge>
              <Badge variant="outline">Intent: {result.intent}</Badge>
            </div>

            <p className="text-sm text-muted-foreground">{result.summary}</p>

            <div>
              <h3 className="mb-2 text-sm font-semibold">Red flags</h3>
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {result.redFlags.map((flag) => (
                  <li key={flag}>{flag}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold">Copy-ready replies</h3>
              <div className="grid gap-3">
                {Object.entries(result.replyOptions).map(([tone, reply]) => (
                  <div key={tone} className="rounded-xl border border-border bg-card p-3">
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
                      {replyLabels[tone as keyof typeof replyLabels]}
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {reply}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
