"use client";

import { useCallback, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MobileNav } from "@/components/site/MobileNav";

const items = [
  ["Home", site.pages.home],
  ["About", site.pages.about],
  ["Gatherings", site.pages.gatherings],
  ["Messages", site.pages.messages],
  ["Visit", site.pages.visit],
  ["Give", site.pages.give],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Main navigation">
            {items.map(([label, href]) => <a className="desktop-nav__link" href={href} aria-current={pathname === href ? "page" : undefined} key={label}>{label}</a>)}
          </nav>
          <Button href={site.pages.watchLive} className="site-header__live">Watch Live <ArrowUpRight size={16} aria-hidden="true" /></Button>
          <button ref={triggerRef} className="menu-toggle" type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls={open ? "mobile-navigation" : undefined} onClick={() => setOpen((current) => !current)}>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>
      <MobileNav open={open} onClose={close} triggerRef={triggerRef} />
    </>
  );
}
