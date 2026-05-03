"use client";

import { useState, useSyncExternalStore } from "react";
import { Footer } from "@/components/landing/footer";
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
        <SiteHeader locale={locale} setLocale={setStoredLocale} t={t} />

        <div className="grid flex-1 items-start gap-12 py-20 lg:grid-cols-[1fr_0.9fr] lg:py-24">
          <HeroSection t={t} />

          <AnalyzerCard
            locale={locale}
            message={message}
            setMessage={setMessage}
            t={t}
          />
        </div>

        <ExamplesSection setMessage={setMessage} t={t} />
      </section>
      <Footer />
    </main>
  );
}
