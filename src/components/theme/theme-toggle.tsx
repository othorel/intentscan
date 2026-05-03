"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      suppressHydrationWarning
      className="rounded-2xl border-border/60 bg-card/60 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:bg-primary/10 hover:shadow-primary/10"
    >
      <span
        suppressHydrationWarning
        className="text-muted-foreground transition-colors group-hover/button:text-foreground"
      >
        {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </span>
    </Button>
  );
}
