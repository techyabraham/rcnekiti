import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";
import { ArrowUpRight, CalendarDays, MapPin, Play } from "lucide-react";
import { CalendarDownload } from "@/components/pages/CalendarDownload";
import { PageIntro } from "@/components/pages/PageIntro";
import { PosterWall } from "@/components/pages/PosterWall";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { events, epacRecaps } from "@/content/events";
import { nextOccurrences, formatOccurrenceDate } from "@/content/occurrences";
import { schedule } from "@/content/schedule";
import { mapSearchUrl, site } from "@/content/site";

export const metadata: Metadata = pageMetadata("Gatherings at RCN Ekiti", "Find weekly prayer, Sunday service and Monthly Encounters at the RCN Prayer Tent in Ado-Ekiti.", "/gatherings/");

export default function GatheringsPage() {
  const now = new Date();
  const next = nextOccurrences(schedule, now, 3);
  const datedUpcoming = events.filter((event) => event.status === "published" && event.dateISO && Date.parse(`${event.dateISO}T23:59:59+01:00`) >= now.getTime()).sort((a, b) => (a.dateISO ?? "").localeCompare(b.dateISO ?? ""));
  const scheduleFlyer = events.find((event) => event.id === "prayer-tent-schedule");
  const eventJsonLd = datedUpcoming.flatMap((event) => {
    const time = event.time?.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!event.dateISO) return [];
    let startDate = event.dateISO;
    if (time) {
      let hour = Number(time[1]) % 12;
      if (time[3].toUpperCase() === "PM") hour += 12;
      startDate = `${event.dateISO}T${String(hour).padStart(2, "0")}:${time[2]}:00+01:00`;
    }
    return [{
      "@context": "https://schema.org",
      "@type": "Event",
      name: event.title,
      description: event.description ?? `${event.series} at ${site.venueName}.`,
      startDate,
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: site.venueName,
        address: {
          "@type": "PostalAddress",
          ...site.addressParts,
        },
      },
      organizer: { "@type": "Organization", name: site.name, url: site.siteUrl },
      url: new URL(site.pages.gatherings, site.siteUrl).toString(),
    }];
  });
  return <main id="main-content" className="inner-page gatherings-page">
    {eventJsonLd.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd).replace(/</g, "\\u003c") }} />}
    <PageIntro eyebrow="Gather together" title="A rhythm of prayer." accent="A place to belong."><p>Join us in person at the RCN Prayer Tent or watch online. All times are West Africa Time (WAT).</p></PageIntro>
    <section className="programs section-shell" aria-labelledby="programs-title"><div className="section-page-heading"><div><p className="eyebrow">How we meet</p><h2 id="programs-title">Make room <em>for gathering.</em></h2></div>{scheduleFlyer && <div className="schedule-flyer"><Img src={scheduleFlyer.flyer} alt={scheduleFlyer.alt} width={1024} height={1280} /><span>PRAYER TENT · WEEKLY RHYTHM</span></div>}</div><div className="program-grid">{schedule.filter((item) => item.status === "published").map((item, index) => <article className="program-card" key={item.id}><div className="program-card__top"><span>0{index + 1}</span><Badge tone="line">{item.mode}</Badge></div><p className="eyebrow">{item.day}</p><h3>{item.title}</h3><p className="program-card__time">{item.times}</p><p>{item.description}</p><span className="program-card__venue"><MapPin size={14} aria-hidden="true" />{item.venue}</span></article>)}</div></section>
    <section className="upcoming section-shell" aria-labelledby="upcoming-title"><div className="section-page-heading"><div><p className="eyebrow">Plan ahead</p><h2 id="upcoming-title">Coming <em>together.</em></h2></div><CalendarDownload events={events} schedule={schedule} /></div><div className="upcoming-grid">{next.map((item) => <article className="upcoming-card" key={item.id}><p className="upcoming-card__date"><CalendarDays size={15} />{formatOccurrenceDate(item.startsAt)}</p><h3>{item.title}</h3><p>{item.timeLabel}</p><Badge tone="line">Hybrid</Badge><div className="upcoming-card__links"><a href={mapSearchUrl()} target="_blank" rel="noopener noreferrer"><MapPin size={14} /> Get directions</a><a href={site.links.youtubeLive} target="_blank" rel="noopener noreferrer"><Play size={12} /> Watch online</a></div></article>)}{datedUpcoming.map((event) => <article className="upcoming-card upcoming-card--event" key={event.id}><p className="upcoming-card__date"><CalendarDays size={15} />{event.dateISO}</p><h3>{event.title}</h3><p>{event.time ?? "Time to be announced"}</p><Badge tone="ember">{event.series}</Badge><a className="text-link" href={site.links.facebook} target="_blank" rel="noopener noreferrer">Event updates <ArrowUpRight size={15} /></a></article>)}</div></section>
    <section className="archive-section section-shell" aria-labelledby="archive-title"><div className="section-page-heading"><div><p className="eyebrow">Past gatherings</p><h2 id="archive-title">The poster <em>wall.</em></h2></div><p>Flyers from our gatherings, kept together in one place.</p></div><PosterWall events={events} /></section>
    <section className="recap-section section-shell" aria-labelledby="recap-title"><div className="section-page-heading"><div><p className="eyebrow">Gathered in worship</p><h2 id="recap-title">Moments from <em>EPAC.</em></h2></div></div><div className="recap-grid">{epacRecaps.map((recap) => { const photos = recap.year === "2024" ? site.assets.epac24Recap : site.assets.epac26Recap; return <article className="recap-card" key={recap.year}><div className="recap-card__heading"><Badge tone="ember">EPAC {recap.year}</Badge><h3>{recap.title}</h3>{recap.dateISO && <p>30 September – 3 October 2026</p>}</div><div className="recap-photo-grid">{photos.map((photo) => <Img key={photo.src} src={photo.src} alt={photo.alt} width={1280} height={853} responsive responsiveWidths={photo.widths} sizes="(max-width: 760px) 50vw, 25vw" />)}</div></article>; })}</div></section>
  </main>;
}
