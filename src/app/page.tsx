"use client";

import { useState, useSyncExternalStore } from "react";

import { AnalyzerCard } from "@/components/landing/analyzer-card";
import { ExamplesSection } from "@/components/landing/examples-section";
import { HeroSection } from "@/components/landing/hero-section";
import { SiteHeader } from "@/components/landing/site-header";
import { translations, type Locale } from "@/lib/i18n";

const LOCALE_STORAGE_KEY = "intentscan-locale";
const LOCALE_CHANGE_EVENT = "intentscan-locale-change";

function getStoredLocale(): Locale {
  if (typeof window === "undefined") {
    return "fr";
  }

  const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);

  return storedLocale === "fr" || storedLocale === "en" ? storedLocale : "fr";
}

function subscribeToLocale(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(LOCALE_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LOCALE_CHANGE_EVENT, callback);
  };
}

function setStoredLocale(locale: Locale) {
  window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
}

export default function Home() {
  const locale: Locale = useSyncExternalStore(
    subscribeToLocale,
    getStoredLocale,
    () => "fr" as Locale,
  );

  const [message, setMessage] = useState("");
  const t = translations[locale];

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,oklch(0.75_0.14_80_/_0.16),transparent_35%),radial-gradient(circle_at_bottom_right,oklch(1_0_0_/_0.08),transparent_30%)]" />

        <SiteHeader locale={locale} setLocale={setStoredLocale} t={t} />

        <div className="grid flex-1 items-center gap-12 py-20 lg:grid-cols-[1fr_0.9fr]">
          <HeroSection t={t} />
          <AnalyzerCard message={message} setMessage={setMessage} t={t} />
        </div>

        <ExamplesSection setMessage={setMessage} t={t} />
      </section>
    </main>
  );
}
