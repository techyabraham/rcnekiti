"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Play, Search } from "lucide-react";
import { Img } from "@/components/ui/Img";
import { site } from "@/content/site";
import type { Message } from "@/content/messages";

const seriesFilters = ["All", ...new Set(["Built to Last", "Build Me a Fortress", "Stand as God's Man", "Fervent in the Spirit", "Empowering Destiny"])] as const;

export function MessagesBrowser({ messages }: { messages: Message[] }) {
  const [series, setSeries] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [playing, setPlaying] = useState<string | null>(null);
  useEffect(() => { const timer = window.setTimeout(() => setDebounced(query.trim().toLowerCase()), 250); return () => window.clearTimeout(timer); }, [query]);
  const results = useMemo(() => messages.filter((message) => message.status === "published" && (series === "All" || message.series === series) && (!debounced || `${message.title} ${message.series}`.toLowerCase().includes(debounced))), [messages, series, debounced]);
  return <div className="messages-browser">
    <div className="messages-browser__controls"><label className="message-search"><Search size={17} aria-hidden="true" /><span className="sr-only">Search messages</span><input type="search" placeholder="Search titles or series" value={query} onChange={(event) => setQuery(event.target.value)} /></label><div className="filter-chips" role="group" aria-label="Filter messages by series">{seriesFilters.map((item) => <button type="button" className={series === item ? "filter-chip is-active" : "filter-chip"} aria-pressed={series === item} key={item} onClick={() => setSeries(item)}>{item}</button>)}</div></div>
    <p className="sr-only" aria-live="polite">{results.length} messages found.</p>
    {results.length ? <div className="messages-page-grid">{results.map((message, index) => <article className="message-page-card" key={message.id}>
      <div className={`message-card__art message-card__art--${(index % 4) + 1}`}>{message.cover ? <Img src={message.cover} alt="" width={1024} height={1280} /> : <span className="message-card__glyph" aria-hidden="true">{index % 2 ? "II" : "✳"}</span>}{message.youtubeId ? <><button type="button" className="message-card__play" aria-label={`Play ${message.title}`} onClick={() => setPlaying(message.id)}><Play size={17} fill="currentColor" /></button>{playing === message.id && <iframe className="message-embed" src={`${site.assets.youtubeEmbedBase}${encodeURIComponent(message.youtubeId)}?autoplay=1`} title={message.title} allow="autoplay; encrypted-media; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />}</> : <a className="message-card__play message-card__play--link" href={site.links.youtubeVideos} target="_blank" rel="noopener noreferrer" aria-label={`Find ${message.title} on YouTube`}><Play size={17} fill="currentColor" /></a>}<span className="message-card__series">{message.series}</span></div>
      <h2>{message.title}</h2><p>{message.series}</p><a className="text-link" href={message.youtubeId ? `${site.assets.youtubeEmbedBase}${encodeURIComponent(message.youtubeId)}` : site.links.youtubeVideos} target="_blank" rel="noopener noreferrer">Find on YouTube <ArrowUpRight size={15} aria-hidden="true" /></a>
    </article>)}</div> : <div className="message-empty"><h2>No messages match that search.</h2><p>Try a different title or series, or browse the RCN Ekiti YouTube channel.</p><a className="text-link" href={site.links.youtubeVideos} target="_blank" rel="noopener noreferrer">Open YouTube <ArrowUpRight size={15} aria-hidden="true" /></a></div>}
    <div className="messages-listen"><p>Audio messages and announcements are shared on Telegram.</p><a className="text-link" href={site.links.telegram} target="_blank" rel="noopener noreferrer">Listen on Telegram <ArrowUpRight size={15} aria-hidden="true" /></a></div>
  </div>;
}
