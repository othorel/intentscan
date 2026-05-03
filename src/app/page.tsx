import { AnalyzerCard } from "@/components/landing/analyzer-card";
import { ExamplesSection } from "@/components/landing/examples-section";
import { HeroSection } from "@/components/landing/hero-section";
import { SiteHeader } from "@/components/landing/site-header";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,oklch(0.75_0.14_80_/_0.16),transparent_35%),radial-gradient(circle_at_bottom_right,oklch(1_0_0_/_0.08),transparent_30%)]" />

        <SiteHeader />

        <div className="grid flex-1 items-center gap-12 py-20 lg:grid-cols-[1fr_0.9fr]">
          <HeroSection />
          <AnalyzerCard />
        </div>

        <ExamplesSection />
      </section>
    </main>
  );
}
