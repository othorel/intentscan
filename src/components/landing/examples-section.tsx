import { Card, CardContent } from "@/components/ui/card";

const examples = [
  "Hey dear, I can help you make $5,000 per week with my crypto mentorship.",
  "Hi Olivier, any interest in having a website built for you free of charge?",
  "Your package is blocked. Click this link now to confirm your delivery details.",
];

export function ExamplesSection() {
  return (
    <section id="examples" className="grid gap-4 pb-10 md:grid-cols-3">
      {examples.map((example) => (
        <Card key={example} className="bg-card/60">
          <CardContent className="p-4 text-sm leading-6 text-muted-foreground">
            “{example}”
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
