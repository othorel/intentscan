"use client";

import type { Dispatch, SetStateAction } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Locale, Translations } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
  setLocale: Dispatch<SetStateAction<Locale>>;
  t: Translations;
};

export function SiteHeader({
  locale,
  setLocale,
  t,
}: SiteHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-xl border border-border bg-card text-sm font-bold text-primary">
          IS
        </div>

        <span className="text-sm font-semibold tracking-wide">
          {t.site.name}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 rounded-xl border border-border bg-card p-1">
          <Button
            type="button"
            size="sm"
            variant={locale === "fr" ? "default" : "ghost"}
            onClick={() => setLocale("fr")}
          >
            FR
          </Button>

          <Button
            type="button"
            size="sm"
            variant={locale === "en" ? "default" : "ghost"}
            onClick={() => setLocale("en")}
          >
            EN
          </Button>
        </div>

        <Badge variant="secondary">{t.site.badge}</Badge>
      </div>
    </header>
  );
}
