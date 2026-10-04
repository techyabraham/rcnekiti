import type { ReactNode } from "react";

export function PageIntro({ eyebrow, title, accent, children, className = "" }: { eyebrow: string; title: string; accent?: string; children?: ReactNode; className?: string }) {
  return <header className={`page-intro section-shell ${className}`}><p className="eyebrow">{eyebrow}</p><h1>{title}{accent && <> <em>{accent}</em></>}</h1>{children && <div className="page-intro__body">{children}</div>}</header>;
}
