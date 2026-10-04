import type { ReactNode } from "react";

export function Badge({ children, tone = "ember" }: { children: ReactNode; tone?: "ember" | "line" | "soft" }) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}
