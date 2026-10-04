import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";
import { ArrowUpRight, Flame } from "lucide-react";
import { PageIntro } from "@/components/pages/PageIntro";
import { Button } from "@/components/ui/Button";
import { PendingCard } from "@/components/ui/PendingCard";
import { site, whatsappUrl } from "@/content/site";

export const metadata: Metadata = pageMetadata("Give | RCN Ekiti", "Contact RCN Ekiti for confirmed local giving information.", "/give/");

export default function GivePage() {
  return <main id="main-content" className="inner-page give-page"><PageIntro eyebrow="A shared life" title="Giving with" accent="purpose."><p>We give as part of our shared life of prayer, the study of the Word and fellowship.</p></PageIntro><section className="give-feature section-shell"><div className="give-feature__symbol"><Flame size={42} strokeWidth={1.2} aria-hidden="true" /></div><div><p className="eyebrow">Support the work in Ekiti</p><h2>Rooted in <em>community.</em></h2><p>Giving details for RCN Ekiti are being finalised. Contact us on WhatsApp and we’ll share confirmed local information.</p>{site.giving.ekitiUrl ? <Button href={site.giving.ekitiUrl} target="_blank">{site.giving.label} <ArrowUpRight size={16} /></Button> : <PendingCard variant="feature" label="Local giving details are being finalised" hint="Please contact us on WhatsApp for confirmed information." action={{ label: "Ask on WhatsApp", href: whatsappUrl(site.messages.visit) }} />}</div></section></main>;
}
