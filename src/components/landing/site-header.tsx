"use client";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Locale, Translations } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
};

export function SiteHeader({
  locale,
  setLocale,
  t,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 border-b border-border/40 bg-background/70 py-3 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="relative flex size-10 items-center justify-center rounded-2xl border border-border/60 bg-card/70 text-sm font-bold text-primary shadow-sm backdrop-blur-md ring-1 ring-white/5">
          <div className="absolute inset-x-1 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          IS
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-[0.18em] text-foreground">
            {t.site.name}
          </span>

          <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            AI Intent Intelligence
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 rounded-2xl border border-border/60 bg-card/60 p-1 shadow-sm backdrop-blur-md">
          <Button
            type="button"
            size="sm"
            className="rounded-xl"
            variant={locale === "fr" ? "default" : "ghost"}
            onClick={() => setLocale("fr")}
          >
            FR
          </Button>

          <Button
            type="button"
            size="sm"
            className="rounded-xl"
            variant={locale === "en" ? "default" : "ghost"}
            onClick={() => setLocale("en")}
          >
            EN
          </Button>
        </div>

        <ThemeToggle />

        <Badge
          variant="secondary"
          className="rounded-full border border-border/50 bg-card/60 px-3 shadow-sm backdrop-blur-md"
        >
          {t.site.badge}
        </Badge>
      </div>
    </header>
  );
}
