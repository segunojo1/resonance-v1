import { Button } from "@/components/ui/button";

export function UsageContainer() {
  return (
    <div className="group-data-[collapsible=icon]:hidden bg-background border border-border rounded-lg p-3">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold tracking-tight text-foreground">
          Free access enabled
        </p>
        <p className="text-xs text-muted-foreground">
          Payment gating is disabled for now. You can create voices and generate audio without a subscription.
        </p>
        <Button variant="outline" className="w-full text-xs" size="sm" disabled>
          Billing disabled
        </Button>
      </div>
    </div>
  );
}