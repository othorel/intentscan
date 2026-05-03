"use client";

import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { AnalyzeResponse } from "@/lib/analyze-schema";
import type { Locale, Translations } from "@/lib/i18n";

const riskStyles = {
  LOW: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  MEDIUM: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  HIGH: "border-red-500/30 bg-red-500/10 text-red-300",
} as const;

type AnalyzerCardProps = {
  locale: Locale;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  t: Translations;
};

export function AnalyzerCard({
  locale,
  message,
  setMessage,
  t,
}: AnalyzerCardProps) {
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedTone, setCopiedTone] = useState<string | null>(null);

  async function analyzeMessage() {
    if (message.trim().length < 10) {
      setError(t.analyzer.minLengthError);
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
        body: JSON.stringify({ message, locale }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message ?? t.analyzer.genericError);
        return;
      }

      setResult(data as AnalyzeResponse);
    } catch {
      setError(t.analyzer.genericError);
    } finally {
      setIsLoading(false);
    }
  }

  async function copyReply(tone: string, reply: string) {
    try {
      await navigator.clipboard.writeText(reply);
      setCopiedTone(tone);

      setTimeout(() => {
        setCopiedTone(null);
      }, 1500);
    } catch {
      setError(t.analyzer.copyError);
    }
  }

  return (
    <Card id="analyze" className="bg-card/70 shadow-2xl backdrop-blur">
      <CardContent className="p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold">{t.analyzer.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.analyzer.description}
            </p>
          </div>

          <Badge>{isLoading ? t.analyzer.analyzing : t.analyzer.live}</Badge>
        </div>

        <Textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="min-h-56 resize-none"
          placeholder={t.analyzer.placeholder}
        />

        {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}

        <Button
          onClick={analyzeMessage}
          disabled={isLoading}
          className="mt-4 w-full"
          size="lg"
        >
          {isLoading ? t.analyzer.analyzing : t.analyzer.button}
        </Button>

        {result ? (
          <div className="mt-6 space-y-5 rounded-2xl border border-border bg-background/40 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={riskStyles[result.riskLevel]}>
                {t.analyzer.risk}: {result.riskLevel} ({result.riskScore}/100)
              </Badge>

              <span className="text-xs text-muted-foreground">
                {t.analyzer.intent}: {result.intent}
              </span>
            </div>

            <p className="text-sm text-muted-foreground">{result.summary}</p>

            {result.redFlags.length > 0 ? (
              <div>
                <h3 className="mb-2 text-sm font-semibold">
                  {t.analyzer.redFlags}
                </h3>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {result.redFlags.map((flag) => (
                    <li key={flag}>{flag}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-card p-3 text-sm text-muted-foreground">
                {t.analyzer.noRedFlags}
              </div>
            )}

            <div>
              <h3 className="mb-3 text-sm font-semibold">
                {t.analyzer.replies}
              </h3>

              <div className="grid gap-3">
                {Object.entries(result.replyOptions).map(([tone, reply]) => (
                  <div
                    key={tone}
                    className="rounded-xl border border-border bg-card p-3"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="text-xs font-semibold uppercase tracking-wide text-primary">
                        {t.tones[tone as keyof typeof t.tones]}
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => copyReply(tone, reply)}
                      >
                        {copiedTone === tone
                          ? t.analyzer.copied
                          : t.analyzer.copy}
                      </Button>
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
