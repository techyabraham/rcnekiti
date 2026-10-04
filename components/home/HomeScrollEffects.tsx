"use client";

import { useEffect } from "react";
import { readMotionEnvironment, shouldEnableMotion } from "./motion-preferences";

export function HomeScrollEffects() {
  useEffect(() => {
    if (!shouldEnableMotion(readMotionEnvironment())) return;
    let disposed = false;
    let frame = 0;
    let lenis: { raf: (time: number) => void; destroy: () => void } | undefined;
    import("lenis").then(({ default: Lenis }) => {
      if (disposed) return;
      lenis = new Lenis({ autoRaf: false, lerp: 0.08, smoothWheel: true });
      const tick = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);
  return null;
}
