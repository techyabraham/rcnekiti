"use client";

import { useEffect, useRef } from "react";

type Ember = { x: number; y: number; radius: number; speed: number; drift: number; alpha: number };

export default function EmberParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;
    const particles: Ember[] = Array.from({ length: 42 }, () => ({
      x: Math.random(), y: Math.random(), radius: .6 + Math.random() * 1.7,
      speed: .00008 + Math.random() * .00018, drift: (Math.random() - .5) * .00012,
      alpha: .14 + Math.random() * .4,
    }));
    let frame = 0;
    let active = false;
    let visible = false;
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(bounds.width * ratio));
      canvas.height = Math.max(1, Math.round(bounds.height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const paint = () => {
      if (!active || !visible || document.visibilityState !== "visible") return;
      const bounds = canvas.getBoundingClientRect();
      context.clearRect(0, 0, bounds.width, bounds.height);
      for (const ember of particles) {
        ember.y -= ember.speed * 16;
        ember.x += ember.drift * 16;
        if (ember.y < -.02) { ember.y = 1.02; ember.x = Math.random(); }
        context.beginPath();
        context.fillStyle = `rgba(244, 182, 63, ${ember.alpha})`;
        context.arc(ember.x * bounds.width, ember.y * bounds.height, ember.radius, 0, Math.PI * 2);
        context.fill();
      }
      frame = requestAnimationFrame(paint);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !active) { active = true; paint(); }
      if (!visible) { active = false; cancelAnimationFrame(frame); }
    }, { threshold: 0.05 });
    observer.observe(canvas);
    resize();
    window.addEventListener("resize", resize, { passive: true });
    const onVisibility = () => {
      if (document.visibilityState !== "visible") { active = false; cancelAnimationFrame(frame); }
      else if (visible && !active) { active = true; paint(); }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect(); window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility); cancelAnimationFrame(frame);
    };
  }, []);
  return <canvas ref={canvasRef} className="hero-embers" aria-hidden="true" />;
}
