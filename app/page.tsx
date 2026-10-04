import { ArrowRight, ArrowUpRight, CalendarDays, MapPin, Play, Radio, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { PendingCard } from "@/components/ui/PendingCard";
import { FiveAnswers } from "@/components/home/FiveAnswers";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeScrollEffects } from "@/components/home/HomeScrollEffects";
import { Marquee } from "@/components/home/Marquee";
import { copy } from "@/content/copy";
import { events } from "@/content/events";
import { selectFeatured } from "@/content/featured";
import { leader } from "@/content/leader";
import { messages } from "@/content/messages";
import { nextOccurrences, formatOccurrenceDate } from "@/content/occurrences";
import { schedule } from "@/content/schedule";
import { mapSearchUrl, site, whatsappUrl } from "@/content/site";

export default function Home() {
  const now = new Date();
  const gatherings = nextOccurrences(schedule, now, 3);
  const featured = selectFeatured(now, schedule);
  const latestFlyers = events.filter((event) => event.status === "published" && event.dateISO && event.flyer).sort((a, b) => (b.dateISO ?? "").localeCompare(a.dateISO ?? "")).slice(0, 6);
  return (
    <main id="main-content">
      <HomeScrollEffects />
      <HomeHero />
      <Marquee />

      <section className="this-week section-shell" aria-labelledby="this-week-title">
        <div className="this-week__heading"><div><p className="eyebrow">Gather with us</p><h2 id="this-week-title">This week <em>at RCN.</em></h2></div><a className="text-link" href={site.pages.gatherings}>All gatherings <ArrowUpRight size={16} aria-hidden="true" /></a></div>
        <div className="week-grid">{gatherings.map((item, index) => <article className="week-card" key={item.id}>
          <div className="week-card__top"><span className="week-card__index">0{index + 1}</span><Badge tone="line">{item.mode}</Badge></div>
          <p className="week-card__date"><CalendarDays size={15} aria-hidden="true" />{formatOccurrenceDate(item.startsAt)}</p>
          <h3>{item.title}</h3><p className="week-card__time">{item.timeLabel}</p>
          <div className="week-card__actions"><a href={mapSearchUrl()} target="_blank" rel="noopener noreferrer"><MapPin size={14} aria-hidden="true" /> Directions</a><a href={site.links.youtubeLive} target="_blank" rel="noopener noreferrer"><Play size={12} aria-hidden="true" /> Watch online</a></div>
        </article>)}</div>
      </section>

      <Marquee reverse />

      <section className="featured section-shell" aria-labelledby="featured-title">
        <div className="featured__heading"><div><p className="eyebrow">The featured gathering</p><h2 id="featured-title">{featured.kind === "recap" ? <>A moment worth<br /><em>carrying forward.</em></> : featured.kind === "live" ? <>{featured.occurrence.title}<br /><em>Live right now.</em></> : <>{featured.event.title}<br /><em>Come expectant.</em></>}</h2></div><Badge tone="ember">{featured.kind === "recap" ? "EPAC ’26 · RECAP" : featured.kind === "live" ? "LIVE NOW" : "UP NEXT"}</Badge></div>
        {featured.kind === "recap" ? <div className="featured__layout">
          <div className="featured__lead-image"><Img src={site.assets.epac26Recap[0].src} alt={site.assets.epac26Recap[0].alt} width={1280} height={853} responsive responsiveWidths={site.assets.epac26Recap[0].widths} sizes="(max-width: 760px) 100vw, 54vw" /></div>
          <div className="featured__copy"><span className="mono-label">30 SEPTEMBER — 3 OCTOBER 2026</span><h3>EPAC’26:<br /><em>Sustaining Spiritual Watch</em></h3><p>Four days of prayer, apostolic teaching and shared devotion. We’re carrying the fire of this gathering into the days ahead.</p><div className="featured__actions"><Button href={site.links.youtubeVideos} target="_blank">Catch the messages <ArrowUpRight size={16} aria-hidden="true" /></Button><a className="text-link" href={site.pages.gatherings}>Explore gatherings <ArrowRight size={15} aria-hidden="true" /></a></div></div>
          <div className="featured__photo-strip">{site.assets.epac26Recap.map((photo) => <Img key={photo.src} src={photo.src} alt={photo.alt} width={480} height={320} responsive responsiveWidths={photo.widths} sizes="(max-width: 760px) 42vw, 17vw" />)}</div>
        </div> : featured.kind === "live" ? <article className="featured__live"><span className="live-pulse" aria-hidden="true" /><div><p className="mono-label">LIVE FROM THE RCN PRAYER TENT</p><h3>{featured.occurrence.title}</h3><p>{featured.occurrence.timeLabel} · Hybrid gathering</p></div><Button href={site.links.youtubeLive} target="_blank">Watch live <Play size={14} fill="currentColor" /></Button></article> : <article className="featured__upcoming"><div className="featured__lead-image"><Img src={featured.event.flyer} alt={featured.event.alt} width={1024} height={1280} /></div><div className="featured__copy"><span className="mono-label">{featured.event.series}</span><h3>{featured.event.title}</h3><p>{featured.event.description ?? `${featured.event.dateISO}${featured.event.time ? ` · ${featured.event.time}` : ""}`}</p><Button href={site.pages.gatherings}>Gathering details <ArrowUpRight size={16} /></Button></div></article>}
      </section>

      <section className="about-preview section-shell" aria-labelledby="about-title">
        <div className="about-preview__mark" aria-hidden="true">RCN<br /><span>EKITI</span></div>
        <div><p className="eyebrow">A local altar, a global family</p><h2 id="about-title">Rooted in Ekiti.<br /><em>Connected to a wider work.</em></h2><p className="about-preview__body">{site.relationship} Here in Ado-Ekiti, we gather around prayer, the Word and fellowship.</p><a className="text-link" href={site.pages.about}>Discover our story <ArrowUpRight size={16} aria-hidden="true" /></a></div>
        <a className="about-preview__global" href={site.links.rcnGlobal} target="_blank" rel="noopener noreferrer"><span>Part of the RCN family</span><strong>RCN Global <ArrowUpRight size={16} aria-hidden="true" /></strong><span>Striving for the rebirth of apostolic Christianity.</span></a>
      </section>

      <FiveAnswers />

      <section className="leader-preview section-shell" aria-labelledby="leader-title">
        <div className="leader-preview__image"><Img src={leader.portrait} alt={leader.portraitAlt} width={768} height={960} /></div>
        <div className="leader-preview__copy"><p className="eyebrow">A shepherd among us</p><h2 id="leader-title">Meet {leader.name}.<br /><em>A life of service.</em></h2><p>{leader.shortBio[0]}</p><p>{leader.shortBio[1]}</p><a className="text-link" href={site.pages.about}>Read his short bio <ArrowUpRight size={16} aria-hidden="true" /></a></div>
      </section>

      <section className="pillars-band" aria-label="Our shared life"><span>PRAYER</span><span className="pillars-band__spark">✳</span><span>THE WORD</span><span className="pillars-band__spark">✳</span><span>FELLOWSHIP</span></section>

      <section className="poster-wall section-shell" id="poster-wall" aria-labelledby="poster-title">
        <div className="this-week__heading"><div><p className="eyebrow">Gatherings in the archive</p><h2 id="poster-title">The poster <em>wall.</em></h2></div><a className="text-link" href={site.pages.gatherings}>Browse all flyers <ArrowUpRight size={16} aria-hidden="true" /></a></div>
        <div className="poster-grid">{latestFlyers.map((event) => <a className="poster-card" key={event.id} href={site.pages.gatherings} aria-label={`Explore ${event.title}`}><Img src={event.flyer.replace(".webp", "-thumb.webp")} alt={event.alt} width={480} height={600} /><span>{event.series} <ArrowUpRight size={13} aria-hidden="true" /></span></a>)}</div>
      </section>

      <section className="messages-reel section-shell" id="messages" aria-labelledby="messages-title">
        <div className="this-week__heading"><div><p className="eyebrow">Take the Word with you</p><h2 id="messages-title">Messages for <em>the journey.</em></h2></div><a className="text-link" href={site.pages.messages}>Explore messages <ArrowUpRight size={16} aria-hidden="true" /></a></div>
        <div className="message-grid">{messages.filter((message) => message.status === "published").slice(0, 4).map((message, index) => <a className="message-card" href={site.links.youtubeVideos} target="_blank" rel="noopener noreferrer" key={message.id}>
          <div className={`message-card__art message-card__art--${index + 1}`}>{message.cover ? <Img src={message.cover} alt="" width={1024} height={1280} /> : <span className="message-card__glyph" aria-hidden="true">{index === 1 ? "II" : "✳"}</span>}<span className="message-card__play"><Play size={17} fill="currentColor" aria-hidden="true" /></span><span className="message-card__series">{message.series}</span></div><h3>{message.title}</h3><span className="message-card__link">Find on YouTube <ArrowUpRight size={14} aria-hidden="true" /></span>
        </a>)}</div>
        <p className="reel-note"><Radio size={15} aria-hidden="true" /> Video links open RCN Ekiti’s YouTube channel. Individual recordings will be linked as they are confirmed.</p>
      </section>

      <section className="join-strip"><div className="join-strip__symbol"><Sparkles size={23} aria-hidden="true" /></div><div><p className="eyebrow">You don’t have to figure it out alone</p><h2>There’s a place <em>for you here.</em></h2><p>Join the family on WhatsApp and stay close to what’s happening.</p></div><Button href={whatsappUrl(site.messages.join)} target="_blank">Join the family <ArrowUpRight size={16} aria-hidden="true" /></Button></section>

      <section className="visit-preview section-shell" aria-labelledby="visit-preview-title">
        <div className="visit-preview__heading"><p className="eyebrow">Find your way here</p><h2 id="visit-preview-title">Your next step<br /><em>starts here.</em></h2><p className="visit-preview__address">{site.address}</p><a className="text-link" href={site.pages.visit}>Plan your visit <ArrowUpRight size={16} aria-hidden="true" /></a></div>
        <div className="visit-preview__cards"><a className="visit-bento" href={mapSearchUrl()} target="_blank" rel="noopener noreferrer"><MapPin size={21} aria-hidden="true" /><span className="mono-label">ADO-EKITI, EKITI STATE</span><strong>Find the Prayer Tent</strong><span>Get directions <ArrowUpRight size={15} aria-hidden="true" /></span></a><PendingCard label="Give to RCN Ekiti" hint="Local giving details are being confirmed. Contact us and we’ll guide you." action={{ label: "Ask on WhatsApp", href: whatsappUrl(site.messages.visit) }} /></div>
      </section>

      <section className="next-step" aria-label="Join the RCN Ekiti community"><div><p className="eyebrow">A place to pray. A people to grow with.</p><h2>Let’s meet <em>soon.</em></h2></div><Button href={whatsappUrl(site.messages.visit)} variant="secondary">Plan a visit <ArrowUpRight size={17} aria-hidden="true" /></Button></section>
    </main>
  );
}
