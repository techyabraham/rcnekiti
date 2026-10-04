"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";

const items = [
  ["Home", site.pages.home],
  ["About", site.pages.about],
  ["Gatherings", site.pages.gatherings],
  ["Messages", site.pages.messages],
  ["Visit", site.pages.visit],
  ["Give", site.pages.give],
] as const;

export function MobileNav({ open, onClose, triggerRef }: {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const focusable = () => Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    focusable()[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        triggerRef.current?.focus();
      }
      if (event.key !== "Tab") return;
      const elements = focusable();
      const first = elements[0];
      const last = elements.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, triggerRef]);

  if (!open) return null;
  return (
    <div className="mobile-nav__backdrop">
      <div className="mobile-nav__panel" id="mobile-navigation" ref={menuRef}>
        <nav aria-label="Mobile navigation">
          <ul className="mobile-nav__list">
            {items.map(([label, href], index) => (
              <li key={label}><a href={href} aria-current={pathname === href ? "page" : undefined} onClick={onClose}>
                <span className="mobile-nav__index">0{index + 1}</span>{label}<ArrowUpRight aria-hidden="true" />
              </a></li>
            ))}
          </ul>
        </nav>
        <Button href={site.pages.watchLive} variant="primary" onClick={onClose} className="mobile-nav__watch">Watch Live <ArrowUpRight aria-hidden="true" size={17} /></Button>
      </div>
    </div>
  );
}
