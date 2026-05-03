import { Badge } from "@/components/ui/badge";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-xl border border-border bg-card text-sm font-bold text-primary">
          IS
        </div>
        <span className="text-sm font-semibold tracking-wide">IntentScan</span>
      </div>

      <Badge variant="secondary">MVP Preview</Badge>
    </header>
  );
}
