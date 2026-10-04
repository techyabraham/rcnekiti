"use client";

import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { readMotionEnvironment, shouldEnableMotion } from "./motion-preferences";

export function Marquee({ reverse = false }: { reverse?: boolean }) {
  const [paused, setPaused] = useState(false);
  const [motion, setMotion] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMotion(shouldEnableMotion(readMotionEnvironment())));
    return () => cancelAnimationFrame(frame);
  }, []);
  const words = ["PRAYER", "THE WORD", "FELLOWSHIP", "APOSTOLIC LIFE"];
  return <div className={`marquee${reverse ? " marquee--reverse" : ""}${paused ? " marquee--paused" : ""}`} data-motion={motion ? "full" : "static"}>
    <div className="marquee__track" aria-hidden="true">{[0, 1, 2, 3].map((copyIndex) => <span className="marquee__group" key={copyIndex}>{words.map((word, index) => <span key={`${copyIndex}-${word}`}>{word}<i>✳</i>{index === words.length - 1 ? "" : ""}</span>)}</span>)}</div>
    <button type="button" className="marquee__toggle" aria-label={paused ? "Play scrolling words" : "Pause scrolling words"} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={13} /> : <Pause size={13} />}</button>
    <span className="sr-only">Prayer, the Word, fellowship, apostolic life.</span>
  </div>;
}
