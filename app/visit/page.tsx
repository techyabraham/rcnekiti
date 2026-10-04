import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";
import { ArrowUpRight, Clock3, MapPin, Phone, Users } from "lucide-react";
import { PageIntro } from "@/components/pages/PageIntro";
import { Button } from "@/components/ui/Button";
import { PendingCard } from "@/components/ui/PendingCard";
import { mapSearchUrl, site, whatsappUrl } from "@/content/site";

export const metadata: Metadata = pageMetadata("Plan a Visit | RCN Ekiti", "Find the RCN Prayer Tent in Ado-Ekiti and learn what to expect on your first visit.", "/visit/");

const visitorDetails = [
  { question: "How long are the gatherings?", answer: "Sunday Service is about three and a half hours, from 8:00 to 11:30 AM WAT. Friday Prayer is about three hours, from 5:00 to 8:00 PM WAT. Monthly Encounters take place over several sessions." },
  { question: "What language is used?", answer: "Gatherings are primarily in English." },
  { question: "What should I wear?", answer: "Modest, smart-casual or formal clothing is welcome. There is no strict uniform." },
  { question: "Can children attend?", answer: "Children attend with their parents or guardians in the main worship venue. There is no separate children’s building." },
  { question: "When should I arrive?", answer: "Arrive early for major weekend gatherings and monthly prayer conferences, especially if you need parking." },
];

export default function VisitPage() {
  const directionsHref = site.mapPinUrl ?? mapSearchUrl();
  return <main id="main-content" className="inner-page visit-page"><PageIntro image="visit" eyebrow="Find your way here" title="Your next step" accent="starts here."><p>We’d be glad to welcome you at the RCN Prayer Tent in Ado-Ekiti.</p></PageIntro><section className="visit-details section-shell"><div className="visit-details__address"><span className="visit-details__icon"><MapPin size={21} /></span><p className="eyebrow">The venue</p><h2>{site.venueName}</h2><p>{site.address}</p><div className="visit-details__actions"><Button href={directionsHref} target="_blank"><MapPin size={16} />Get directions <ArrowUpRight size={15} /></Button><Button href={whatsappUrl(site.messages.visit)} target="_blank" variant="secondary">Plan my visit <ArrowUpRight size={15} /></Button></div><a className="visit-phone" href={site.phoneUrl}><Phone size={15} />Call {site.phone}</a></div><div className="visit-details__notes"><p className="eyebrow">A few landmarks</p><ol>{site.directions.map((direction, index) => <li key={direction}><span>0{index + 1}</span>{direction}</li>)}</ol><div className="arrival-note"><Clock3 size={16} /><span>For monthly conferences and major weekend gatherings, arriving early helps with parking.</span></div></div></section>{!site.mapPinUrl && <section className="section-shell visit-pending"><PendingCard label="Confirm the exact location" hint="We’re confirming a precise map pin. Message us and we’ll help you find the Prayer Tent." action={{ label: "Confirm on WhatsApp", href: whatsappUrl(site.messages.visit) }} /></section>}<section className="visitor-guide section-shell" aria-labelledby="visitor-guide-title"><div className="visitor-guide__heading"><Users size={21} /><p className="eyebrow">First time with us?</p><h2 id="visitor-guide-title">What to <em>expect.</em></h2><p>Come as you are. Here are a few practical details to help you feel at ease.</p></div><div className="visitor-faq">{visitorDetails.map((item, index) => <details key={item.question} open={index === 0}><summary><span>0{index + 1}</span>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section><section className="visit-cta"><p className="eyebrow">We look forward to meeting you</p><h2>Come as you are.<br /><em>There’s room for you.</em></h2><Button href={whatsappUrl(site.messages.visit)} target="_blank">Plan my visit on WhatsApp <ArrowUpRight size={16} /></Button></section></main>;
}
