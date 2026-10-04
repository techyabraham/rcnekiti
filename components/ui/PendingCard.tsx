import { ArrowUpRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PendingCard({
  variant = "compact",
  label,
  hint,
  action,
}: {
  variant?: "compact" | "feature";
  label: string;
  hint: string;
  action: { label: string; href: string };
}) {
  return (
    <aside className={`pending-card pending-card--${variant}`} aria-label={label}>
      <div className="pending-card__mark" aria-hidden="true"><Flame size={18} /></div>
      <div className="pending-card__copy">
        <p className="eyebrow">Details coming soon</p>
        <h3>{label}</h3>
        <p>{hint}</p>
      </div>
      <Button href={action.href} variant="secondary" className="pending-card__action">
        {action.label}<ArrowUpRight size={16} aria-hidden="true" />
      </Button>
    </aside>
  );
}
