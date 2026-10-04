import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";
import { ArrowUpRight, Headphones, Radio } from "lucide-react";
import { NextGatheringCountdown } from "@/components/pages/NextGatheringCountdown";
import { PageIntro } from "@/components/pages/PageIntro";
import { Button } from "@/components/ui/Button";
import { liveOccurrence, nextOccurrences } from "@/content/occurrences";
import { schedule } from "@/content/schedule";
import { site } from "@/content/site";

export const metadata: Metadata = pageMetadata("Watch & Listen | RCN Ekiti", "Watch RCN Ekiti's main stream on YouTube and find audio messages on Telegram.", "/watch-live/");

export default function WatchLivePage() {
  const now = new Date();
  const active = liveOccurrence(schedule, now);
  const upcoming = active ?? nextOccurrences(schedule, now, 1)[0] ?? null;
  return <main id="main-content" className="inner-page watch-page"><PageIntro eyebrow="Join from wherever you are" title="Watch &" accent="listen."><p>Connect to RCN Ekiti’s main stream, or follow audio messages on Telegram.</p></PageIntro><section className="watch-feature section-shell"><div className="watch-feature__copy"><p className="eyebrow">RCN Ekiti main stream</p><h2>Gather with us<br /><em>online.</em></h2><p>Our primary live video destination is YouTube. When the stream is offline, recordings and messages are available on the channel.</p><Button href={site.links.youtubeLive} target="_blank"><Radio size={17} aria-hidden="true" />Watch on YouTube <ArrowUpRight size={16} aria-hidden="true" /></Button></div><div className="watch-feature__mark"><Radio size={64} strokeWidth={1} aria-hidden="true" /><span>LIVE · RCN EKITI</span></div></section><section className="watch-options section-shell"><a href={site.links.facebook} target="_blank" rel="noopener noreferrer"><Radio /><span><strong>Facebook</strong><small>Follow RCN Ekiti updates</small></span><ArrowUpRight /></a><a href={site.links.telegram} target="_blank" rel="noopener noreferrer"><Headphones /><span><strong>Telegram audio</strong><small>Listen to messages and announcements</small></span><ArrowUpRight /></a></section><section className="countdown-section section-shell"><NextGatheringCountdown schedule={schedule} initial={upcoming ? { title: upcoming.title, startsAt: upcoming.startsAt } : null} /><p className="countdown-section__note">Times shown in West Africa Time (WAT). There is no embedded player; the stream opens on YouTube.</p></section></main>;
}
