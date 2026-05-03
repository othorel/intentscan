import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const examples = [
  "Hey dear, I can help you make $5,000 per week with my crypto mentorship.",
  "Hi Olivier, any interest in having a website built for you free of charge?",
  "Your package is blocked. Click this link now to confirm your delivery details.",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,oklch(0.75_0.14_80_/_0.16),transparent_35%),radial-gradient(circle_at_bottom_right,oklch(1_0_0_/_0.08),transparent_30%)]" />

        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl border border-border bg-card text-sm font-bold text-primary">
              IS
            </div>
            <span className="text-sm font-semibold tracking-wide">
              IntentScan
            </span>
          </div>

          <Badge variant="secondary">MVP Preview</Badge>
        </header>

        <div className="grid flex-1 items-center gap-12 py-20 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <Badge variant="outline" className="mb-5">
              AI-powered message intent analyzer
            </Badge>

            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Decode suspicious messages before you reply.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Paste a DM, email, SMS, or LinkedIn pitch. IntentScan detects
              scams, spam, manipulation, social red flags, and generates clean
              replies you can copy.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#analyze">Analyze a message</a>
              </Button>

              <Button asChild size="lg" variant="outline">
                <a href="#examples">View examples</a>
              </Button>
            </div>
          </div>

          <Card id="analyze" className="bg-card/70 shadow-2xl backdrop-blur">
            <CardContent className="p-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-semibold">Message analyzer</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Mistral integration coming next.
                  </p>
                </div>

                <Badge>Preview</Badge>
              </div>

              <Textarea
                className="min-h-56 resize-none"
                placeholder="Paste a weird message here..."
              />

              <Button className="mt-4 w-full" size="lg">
                Analyze intent
              </Button>
            </CardContent>
          </Card>
        </div>

        <section id="examples" className="grid gap-4 pb-10 md:grid-cols-3">
          {examples.map((example) => (
            <Card key={example} className="bg-card/60">
              <CardContent className="p-4 text-sm leading-6 text-muted-foreground">
                “{example}”
              </CardContent>
            </Card>
          ))}
        </section>
      </section>
    </main>
  );
}
