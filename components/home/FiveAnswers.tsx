"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { copy } from "@/content/copy";
import { site } from "@/content/site";

const answers = [
  { n: "01", title: "What is RCN?", text: copy.whoWeAre },
  { n: "02", title: "Why Ekiti?", text: "We are an apostolic extension of RCN Global, serving believers and communities from Ado-Ekiti." },
  { n: "03", title: "How do we meet?", text: copy.howWeMeet },
  { n: "04", title: "What will I find?", text: "A place to pray, learn the Word and build meaningful fellowship as you grow in faith." },
  { n: "05", title: "Can I come?", text: "Yes. Come as you are. Message us and we’ll help you plan your first visit." },
];

export function FiveAnswers() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine || window.innerWidth < 1024) return;
    let cleanup: (() => void) | undefined;
    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting || cleanup) return;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      gsap.registerPlugin(ScrollTrigger);
      const cards = cardsRef.current?.querySelectorAll<HTMLElement>(".answer-card");
      const section = sectionRef.current;
      if (!cards || !section) return;
      section.classList.add("five-answers--pinned");
      gsap.set(cards, { autoAlpha: 0, y: 36 });
      const timeline = gsap.timeline({ scrollTrigger: { trigger: section, start: "top top+=94", end: `+=${cards.length * 75}%`, scrub: .55, pin: true, anticipatePin: 1 } });
      cards.forEach((card, index) => timeline.to(card, { autoAlpha: 1, y: 0, duration: .65 }, index * .7).to(card, { autoAlpha: .25, y: -24, duration: .5 }, index * .7 + .9));
      cleanup = () => { timeline.scrollTrigger?.kill(); timeline.kill(); gsap.set(cards, { clearProps: "all" }); section.classList.remove("five-answers--pinned"); };
    }, { threshold: .1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { observer.disconnect(); cleanup?.(); };
  }, []);
  return (
    <section className="five-answers section-shell" id="five-answers" ref={sectionRef} aria-labelledby="answers-title">
      <div className="five-answers__intro"><p className="eyebrow">03 / Get to know us</p><h2 id="answers-title">Five answers.<br /><em>A clearer picture.</em></h2><a className="text-link" href={site.pages.about}>Our story <ArrowUpRight size={16} /></a></div>
      <div className="answer-stack" ref={cardsRef}>{answers.map((item) => <article className="answer-card" key={item.n}><span className="answer-card__number">{item.n}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><span className="answer-card__spark" aria-hidden="true">✳</span></article>)}</div>
    </section>
  );
}
