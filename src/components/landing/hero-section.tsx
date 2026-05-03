import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div>
      <Badge variant="outline" className="mb-5">
        AI-powered message intent analyzer
      </Badge>

      <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
        Decode suspicious messages before you reply.
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
        Paste a DM, email, SMS, or LinkedIn pitch. IntentScan detects scams,
        spam, manipulation, social red flags, and generates clean replies you
        can copy.
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
  );
}
