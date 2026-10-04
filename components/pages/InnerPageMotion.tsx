"use client";

import { useEffect, useRef } from "react";
import { readMotionEnvironment } from "@/components/home/motion-preferences";

export function InnerPageMotion() {
  const marker = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const main = marker.current?.closest("main");
    if (!main) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};
    const setup = () => {
      dispose();
      const environment = readMotionEnvironment();
      if (environment.reducedMotion || environment.saveData) return;
      const animations = new Set<Animation>();
      const animate = (element: Element, frames: Keyframe[], delay = 0, duration = 900) => {
        const animation = element.animate(frames, { duration, delay, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      };
      main.querySelectorAll(".page-intro__content > .eyebrow, .page-intro h1 > *, .page-intro__body, .page-intro__caption").forEach((element, index) => {
        animate(element, [{ opacity: 0, transform: "translateY(30px)" }, { opacity: 1, transform: "translateY(0)" }], index * 110);
      });
      const visual = main.querySelector<HTMLElement>(".page-intro__visual");
      if (visual) animate(visual, [{ opacity: 0 }, { opacity: 1 }], 0, 1500);
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const children = Array.from(entry.target.children).filter((child) => !["SCRIPT", "STYLE"].includes(child.tagName));
          children.forEach((child, index) => animate(child, [{ opacity: .15, transform: "translateY(36px)" }, { opacity: 1, transform: "translateY(0)" }], Math.min(index * 90, 360)));
          observer.unobserve(entry.target);
        });
      }, { threshold: .08 });
      main.querySelectorAll(":scope > section").forEach((section) => observer.observe(section));
      let frame = 0;
      const update = () => {
        frame = 0;
        if (!visual) return;
        const header = visual.parentElement!;
        const rect = header.getBoundingClientRect();
        if (rect.bottom > 0) visual.style.setProperty("--photo-drift", `${Math.min(Math.max(-rect.top, 0) * .12, 65)}px`);
      };
      const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
      if (environment.finePointer && (environment.deviceMemory ?? 8) > 2) window.addEventListener("scroll", scroll, { passive: true });
      dispose = () => {
        observer.disconnect();
        animations.forEach((animation) => animation.cancel());
        window.removeEventListener("scroll", scroll);
        cancelAnimationFrame(frame);
        visual?.style.removeProperty("--photo-drift");
      };
    };
    setup();
    preference.addEventListener("change", setup);
    return () => { dispose(); preference.removeEventListener("change", setup); };
  }, []);
  return <span ref={marker} hidden />;
}
