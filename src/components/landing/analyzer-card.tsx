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
  LOW: "border-emerald-500/35 bg-emerald-500/10 text-emerald-300 shadow-emerald-500/10",
  MEDIUM:
    "border-amber-500/35 bg-amber-500/10 text-amber-300 shadow-amber-500/10",
  HIGH: "border-red-500/35 bg-red-500/10 text-red-300 shadow-red-500/10",
} as const;

const riskMeterStyles = {
  LOW: "from-emerald-400 to-emerald-600",
  MEDIUM: "from-amber-400 to-amber-600",
  HIGH: "from-red-400 to-red-600",
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
    <Card
      id="analyze"
      className="premium-card sticky top-8 bg-card/70 shadow-2xl shadow-primary/5"
    >
      <div className="premium-top-line opacity-70" />

      <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 translate-x-16 -translate-y-16 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 -translate-x-12 translate-y-12 rounded-full bg-accent/10 blur-3xl" />

      <CardContent className="relative p-5 sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              {t.analyzer.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.analyzer.description}
            </p>
          </div>

          <Badge
            variant="outline"
            className="rounded-full border-primary/30 bg-primary/10 text-primary"
          >
            {isLoading ? t.analyzer.analyzing : t.analyzer.live}
          </Badge>
        </div>

        <Textarea
          id="message-input"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();

              if (!isLoading) {
                void analyzeMessage();
              }
            }
          }}
          className="min-h-56 resize-none rounded-2xl border-border/60 bg-background/50 p-4 leading-relaxed shadow-inner backdrop-blur-md transition focus-visible:border-primary/50 focus-visible:ring-primary/20"
          placeholder={t.analyzer.placeholder}
        />

        <div className="mt-2 flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>{t.analyzer.helperEnter}</span>
          <span>{t.analyzer.helperNewLine}</span>
        </div>

        {error ? (
          <div className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </div>
        ) : null}

        <Button
          onClick={analyzeMessage}
          disabled={isLoading}
          className="mt-4 h-12 w-full rounded-full shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-primary/30"
          size="lg"
        >
          {isLoading ? t.analyzer.analyzing : t.analyzer.button}
        </Button>

        {result ? (
          <div className="mt-6 space-y-5 rounded-2xl border border-border/60 bg-background/45 p-4 backdrop-blur-xl">
            <div
              className={`rounded-2xl border p-4 shadow-xl ${
                riskStyles[result.riskLevel]
              }`}
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] opacity-80">
                    {t.analyzer.risk}
                  </p>

                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-4xl font-bold tracking-tight">
                      {result.riskScore}
                    </span>
                    <span className="text-sm font-medium opacity-75">/100</span>
                  </div>
                </div>

                <Badge className={riskStyles[result.riskLevel]}>
                  {t.analyzer.riskLevels[result.riskLevel]}
                </Badge>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-background/40">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${
                    riskMeterStyles[result.riskLevel]
                  }`}
                  style={{ width: `${result.riskScore}%` }}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-border/50 bg-card/60 px-3 py-1 text-xs text-muted-foreground">
                {t.analyzer.intent}: {t.analyzer.intentLabels[result.intent]}
              </span>
            </div>

            <p className="rounded-xl border border-border/50 bg-card/40 p-3 text-sm leading-6 text-muted-foreground">
              {result.summary}
            </p>

            {result.redFlags.length > 0 ? (
              <div className="rounded-xl border border-border/50 bg-card/40 p-3">
                <h3 className="mb-3 text-sm font-semibold">
                  {t.analyzer.redFlags}
                </h3>

                <ul className="space-y-2 text-sm text-muted-foreground">
                  {result.redFlags.map((flag) => (
                    <li key={flag} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="rounded-xl border border-border/50 bg-card/40 p-3 text-sm text-muted-foreground">
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
                    className="group/reply relative overflow-hidden rounded-xl border border-border/60 bg-card/50 p-3 transition-all duration-300 hover:border-primary/35 hover:bg-card/80"
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover/reply:opacity-100" />

                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="text-xs font-semibold uppercase tracking-wide text-primary">
                        {t.tones[tone as keyof typeof t.tones]}
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-full"
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
