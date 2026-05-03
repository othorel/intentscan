import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Translations } from "@/lib/i18n";

type HeroSectionProps = {
  t: Translations;
};

export function HeroSection({ t }: HeroSectionProps) {
  return (
    <section className="relative pt-4 lg:pt-10">
      <div className="flex flex-col items-start">
        <div className="flex flex-wrap items-center gap-3">
          <Badge
            variant="outline"
            className="rounded-full border-border/60 bg-card/50 px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-xl"
          >
            {t.hero.eyebrow}
          </Badge>

          <Badge
            variant="secondary"
            className="rounded-full border border-border/50 bg-muted/40 px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-xl"
          >
            {t.hero.signal}
          </Badge>
        </div>

        <h1 className="mt-8 max-w-3xl text-5xl font-bold leading-[1.04] tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl">
          {t.hero.title}
          <span className="premium-gradient-text mt-2 block pb-2">
            {t.hero.highlight}
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {t.hero.description}
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full px-8 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-primary/30"
          >
            <a href="#analyze">{t.hero.analyze}</a>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-border/60 bg-card/40 px-8 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/10"
          >
            <a href="#examples">{t.hero.examples}</a>
          </Button>
        </div>
      </div>

      <div className="pointer-events-none absolute left-0 top-8 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-[90px]" />
      <div className="pointer-events-none absolute left-40 top-28 -z-10 h-56 w-56 rounded-full bg-accent/10 blur-[90px]" />
    </section>
  );
}
