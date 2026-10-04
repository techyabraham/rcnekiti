"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Radio } from "lucide-react";
import { liveOccurrence, nextOccurrences, formatOccurrenceDate } from "@/content/occurrences";
import type { ScheduleItem } from "@/content/schedule";

export function NextGatheringCountdown({ schedule, initial }: { schedule: ScheduleItem[]; initial: { title: string; startsAt: string } | null }) {
  const [target, setTarget] = useState(initial);
  const [now, setNow] = useState(0);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const refresh = () => {
      const current = new Date();
      setNow(current.getTime());
      const active = liveOccurrence(schedule, current);
      setLive(Boolean(active));
      if (!active) { const next = nextOccurrences(schedule, current, 1)[0]; setTarget(next ? { title: next.title, startsAt: next.startsAt } : null); }
    };
    const timer = window.setInterval(refresh, 1000);
    refresh();
    return () => window.clearInterval(timer);
  }, [schedule]);
  if (live) return <div className="countdown-live"><span className="live-pulse" aria-hidden="true" />A gathering is live now</div>;
  if (!target) return <p>Check the schedule for our next gathering.</p>;
  const total = Math.max(0, Math.floor((Date.parse(target.startsAt) - now) / 1000));
  const units = now === 0 ? ["—", "—", "—", "—"] : [Math.floor(total / 86400), Math.floor((total % 86400) / 3600), Math.floor((total % 3600) / 60), total % 60].map((value) => String(value).padStart(2, "0"));
  return <div className="next-countdown" aria-label={`${target.title}, ${formatOccurrenceDate(target.startsAt)}`}><p><CalendarDays size={15} aria-hidden="true" />Next live gathering <Radio size={15} aria-hidden="true" /></p><h2>{target.title}</h2><span className="next-countdown__date">{formatOccurrenceDate(target.startsAt)} · WAT</span><div className="countdown-units" aria-live="off">{units.map((value, index) => <span key={index}><strong>{value}</strong><small>{["days", "hours", "minutes", "seconds"][index]}</small></span>)}</div></div>;
}
