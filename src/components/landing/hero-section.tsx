import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Translations } from "@/lib/i18n";

type HeroSectionProps = {
  t: Translations;
};

export function HeroSection({ t }: HeroSectionProps) {
  return (
    <div>
      <Badge variant="outline" className="mb-5">
        {t.hero.eyebrow}
      </Badge>

      <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
        {t.hero.title}
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
        {t.hero.description}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <a href="#analyze">{t.hero.analyze}</a>
        </Button>

        <Button asChild size="lg" variant="outline">
          <a href="#examples">{t.hero.examples}</a>
        </Button>
      </div>
    </div>
  );
}
