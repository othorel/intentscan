"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function AnalyzerCard() {
  return (
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
  );
}
