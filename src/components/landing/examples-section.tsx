import type { Dispatch, SetStateAction } from "react";

import { Card, CardContent } from "@/components/ui/card";
import type { Translations } from "@/lib/i18n";

type ExamplesSectionProps = {
  setMessage: Dispatch<SetStateAction<string>>;
  t: Translations;
};

export function ExamplesSection({
  setMessage,
  t,
}: ExamplesSectionProps) {
  return (
    <section id="examples" className="grid gap-4 pb-10 md:grid-cols-3">
      {t.examples.items.map((example) => (
        <button
          key={example}
          type="button"
          onClick={() => setMessage(example)}
          className="text-left"
        >
          <Card className="h-full bg-card/60 transition hover:border-primary/40 hover:bg-card/80">
            <CardContent className="p-4 text-sm leading-6 text-muted-foreground">
              “{example}”
              <div className="mt-4 text-xs font-medium text-primary">
                {t.examples.clickToTry}
              </div>
            </CardContent>
          </Card>
        </button>
      ))}
    </section>
  );
}
