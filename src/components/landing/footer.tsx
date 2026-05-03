import { ShieldCheck, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
        <span className="text-xs sm:text-sm">
          © {new Date().getFullYear()} IntentScan — AI message risk analysis
        </span>

        <div className="flex items-center gap-4">
          <div
            className="
              group flex items-center gap-2 rounded-full
              border border-border/60
              bg-card/60
              px-3 py-1.5
              transition-all
              hover:border-primary/40
              hover:bg-card
            "
          >
            <ShieldCheck className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
            <span className="hidden sm:inline">Scam Detection</span>
          </div>

          <div
            className="
              group flex items-center gap-2 rounded-full
              border border-border/60
              bg-card/60
              px-3 py-1.5
              transition-all
              hover:border-primary/40
              hover:bg-card
            "
          >
            <Sparkles className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
            <span className="hidden sm:inline">Decode before you reply</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
