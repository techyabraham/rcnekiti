"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Img } from "@/components/ui/Img";
import type { EventRecord } from "@/content/events";

const filters = ["All", "Prayer Tent", "Encounters", "Conferences", "LifeClass"] as const;
type Filter = typeof filters[number];
function matches(event: EventRecord, filter: Filter) {
  if (filter === "All") return true;
  if (filter === "Conferences") return event.series === "Conference";
  return event.series === filter;
}

export function PosterWall({ events }: { events: EventRecord[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [showPast, setShowPast] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listed = useMemo(() => {
    const ordered = [...events].filter((event) => event.status === "published" && matches(event, filter)).sort((a, b) => (b.dateISO ?? "0000").localeCompare(a.dateISO ?? "0000"));
    return showPast ? ordered : ordered.slice(0, 6);
  }, [events, filter, showPast]);
  const active = selected === null ? null : listed[selected] ?? null;
  useEffect(() => {
    const dialog = dialogRef.current;
    if (active && dialog && !dialog.open) dialog.showModal();
    else if (!active && dialog?.open) dialog.close();
  }, [active]);
  const move = (direction: number) => {
    if (selected === null || listed.length < 2) return;
    setSelected((selected + direction + listed.length) % listed.length);
  };
  return <div className="poster-wall-full">
    <div className="poster-wall-full__toolbar">
      <div className="filter-chips" role="group" aria-label="Filter posters">{filters.map((item) => <button type="button" key={item} className={filter === item ? "filter-chip is-active" : "filter-chip"} aria-pressed={filter === item} onClick={() => { setFilter(item); setSelected(null); }}>{item}</button>)}</div>
      <button type="button" className="archive-toggle" aria-expanded={showPast} onClick={() => setShowPast((shown) => !shown)}>{showPast ? "Show fewer events" : "Show past events"}<span aria-hidden="true">{showPast ? "−" : "+"}</span></button>
    </div>
    <p className="sr-only" aria-live="polite">Showing {listed.length} {filter === "All" ? "published flyers" : filter + " flyers"}.</p>
    {listed.length ? <div className="poster-grid poster-grid--full">{listed.map((event, index) => <button type="button" className="poster-card poster-card--button" key={event.id} onClick={() => setSelected(index)} aria-haspopup="dialog" aria-label={`View flyer: ${event.title}${event.dateISO ? `, ${event.dateISO}` : ""}`}><Img src={event.flyer.replace(".webp", "-thumb.webp")} alt={event.alt} width={480} height={600} /><span>{event.series} <ArrowRight size={13} aria-hidden="true" /></span></button>)}</div> : <p className="archive-empty">New events are announced here and on Facebook.</p>}
    <dialog className="poster-dialog" ref={dialogRef} aria-label={active ? `Flyer: ${active.title}` : "Gathering flyer"} onClose={() => setSelected(null)} onKeyDown={(event) => { if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } if (event.key === "ArrowRight") { event.preventDefault(); move(1); } }}>
      {active && <div className="poster-dialog__inner"><button type="button" className="poster-dialog__close" onClick={() => dialogRef.current?.close()} aria-label="Close flyer"><X size={20} /></button><button type="button" className="poster-dialog__nav poster-dialog__nav--prev" aria-label="Previous flyer" onClick={() => move(-1)}><ArrowLeft /></button><figure><Img src={active.flyer} alt={active.alt} width={1024} height={1280} loading="eager" /><figcaption><span className="eyebrow">{active.series}{active.dateISO ? ` · ${active.dateISO}` : ""}</span><h2>{active.title}</h2>{active.time && <p>{active.time}</p>}</figcaption></figure><button type="button" className="poster-dialog__nav poster-dialog__nav--next" aria-label="Next flyer" onClick={() => move(1)}><ArrowRight /></button></div>}</dialog>
  </div>;
}
