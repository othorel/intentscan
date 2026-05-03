import type { Dispatch, SetStateAction } from "react";

import { Card, CardContent } from "@/components/ui/card";
import type { Translations } from "@/lib/i18n";

type ExamplesSectionProps = {
  setMessage: Dispatch<SetStateAction<string>>;
  t: Translations;
};

export function ExamplesSection({ setMessage, t }: ExamplesSectionProps) {
  function handleExampleClick(example: string) {
    setMessage(example);

    document
      .getElementById("analyze")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

    window.setTimeout(() => {
      document.getElementById("message-input")?.focus();
    }, 300);
  }

  return (
    <section id="examples" className="grid gap-4 pb-10 md:grid-cols-3">
      {t.examples.items.map((example, index) => (
        <button
          key={example}
          type="button"
          onClick={() => handleExampleClick(example)}
          className="group block h-full text-left outline-none"
        >
          <Card className="premium-card premium-card-hover h-full">
            <div className="premium-top-line opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 translate-x-12 -translate-y-12 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:bg-primary/20" />

            <CardContent className="relative flex h-full flex-col p-5">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Example 0{index + 1}
                </div>

                <div className="rounded-full border border-border/50 bg-muted/40 px-3 py-1 text-xs text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-foreground">
                  {t.examples.clickToTry}
                </div>
              </div>

              <p className="text-sm leading-6 text-muted-foreground">
                “{example}”
              </p>

              <div className="mt-auto pt-6">
                <div className="h-px w-12 bg-gradient-to-r from-primary to-accent opacity-50 transition-all duration-500 group-hover:w-24 group-hover:opacity-100" />
              </div>
            </CardContent>
          </Card>
        </button>
      ))}
    </section>
  );
}
