"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { copy } from "@/content/copy";
import { site, whatsappUrl } from "@/content/site";
import { readMotionEnvironment, shouldEnableMotion } from "./motion-preferences";

const EmberParticles = dynamic(() => import("./EmberParticles"), { ssr: false });

export function HomeHero() {
  const [fullMotion, setFullMotion] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setFullMotion(shouldEnableMotion(readMotionEnvironment())));
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <section className={`home-hero${fullMotion ? " home-hero--motion" : ""}`} aria-labelledby="home-title" data-motion={fullMotion ? "full" : "static"}>
      <div className="home-hero__visual">
        <Img src={site.assets.heroPhoto} alt="Worshippers lifting their hands in prayer" width={1672} height={941} responsive loading="eager" fetchPriority="high" sizes="100vw" className="home-hero__image" />
        <div className="home-hero__image-shade" aria-hidden="true" />
        {fullMotion && <EmberParticles />}
        <div className="hero-stamp"><span className="hero-stamp__dot" /> ADO-EKITI <span>·</span> EKITI STATE</div>
      </div>
      <div className="home-hero__copy">
        <div className="hero-kicker"><span className="hero-kicker__line" /> A COMMUNITY FOR THE HUNGRY</div>
        <h1 id="home-title">{fullMotion ? <><motion.span className="hero-line" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>Closer than</motion.span><motion.em className="hero-line" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .1 }}>you think.</motion.em></> : <>Closer than<br /><em>you think.</em></>}</h1>
        <p className="home-hero__lead">{copy.heroSubline}</p>
        <div className="hero-actions">
          <Button href={whatsappUrl(site.messages.visit)}>Plan your visit <ArrowUpRight size={17} aria-hidden="true" /></Button>
          <Button href={site.pages.watchLive} variant="quiet"><span className="play-icon"><Play size={12} fill="currentColor" aria-hidden="true" /></span> Watch Live</Button>
        </div>
        <div className="home-hero__signature"><span>{site.tagline}</span><ArrowDown size={17} aria-hidden="true" /></div>
      </div>
      <div className="hero-index" aria-hidden="true">01 <span>—</span> 03</div>
    </section>
  );
}
