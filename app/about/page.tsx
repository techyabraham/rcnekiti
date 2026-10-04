import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/pages/PageIntro";
import { Img } from "@/components/ui/Img";
import { Button } from "@/components/ui/Button";
import { copy } from "@/content/copy";
import { leader } from "@/content/leader";
import { site } from "@/content/site";

export const metadata: Metadata = pageMetadata("About RCN Ekiti", "Learn about Remnant Christian Network, Ekiti and meet resident pastor Dr. Taiwo Omolayo.", "/about/");

export default function AboutPage() {
  return <main id="main-content" className="inner-page about-page">
    <PageIntro eyebrow="A home for your faith" title="A local altar." accent="A wider work."><p>{site.relationship} From Ado-Ekiti, we share in its vision through prayer, the Word and fellowship.</p></PageIntro>
    <section className="about-mandate section-shell"><div className="about-mandate__intro"><p className="eyebrow">Who we are</p><h2>Closer to the heart<br /><em>of apostolic life.</em></h2></div><div><p className="about-mandate__lead">{copy.whoWeAre}</p><p>{copy.howWeMeet}</p><p>{copy.closingLine}</p></div></section>
    <section className="about-centre section-shell"><div><p className="eyebrow">Our Ekiti centre</p><h2>Prayer. The Word.<br /><em>Life together.</em></h2><p>RCN Ekiti gathers at the RCN Prayer Tent in Ado-Ekiti. We are part of a wider apostolic family, building disciples and impacting nations.</p><Button href={site.pages.gatherings} variant="secondary">See how we meet <ArrowUpRight size={16} /></Button></div><div className="about-centre__stamp" aria-hidden="true">ADO-EKITI<br /><strong>RCN</strong><span>EKITI STATE · NIGERIA</span></div></section>
    <section className="about-pillars section-shell" aria-labelledby="about-pillars-title"><p className="eyebrow">The instruments of our shared life</p><h2 id="about-pillars-title">Three ways <em>we grow.</em></h2><div className="pillar-cards">{copy.pillars.map((pillar, index) => <article className="pillar-card" key={pillar.title}><span>0{index + 1}</span><h3>{pillar.title}</h3><p>{pillar.text}</p></article>)}</div></section>
    <section className="global-block section-shell"><p className="eyebrow">Part of RCN Global</p><h2>Rooted here.<br /><em>Connected across the network.</em></h2><p>{site.relationship} RCN Global is an interdenominational ministry to the body of Christ.</p><div className="global-block__links"><a href={site.links.rcnGlobal} target="_blank" rel="noopener noreferrer">RCN Global website <ArrowUpRight size={15} /></a><a href={site.links.rcnGlobalTelegram} target="_blank" rel="noopener noreferrer">Network messages on Telegram <ArrowUpRight size={15} /></a><a href={site.links.rcnGlobalInstagram} target="_blank" rel="noopener noreferrer">RCN Global on Instagram <ArrowUpRight size={15} /></a></div></section>
    <section className="leader-bio section-shell" aria-labelledby="leader-bio-title"><div className="leader-bio__portrait"><Img src={leader.portrait.replace("-768.webp", "-1280.webp")} alt={leader.portraitAlt} width={1280} height={1700} /><span className="mono-label">RESIDENT PASTOR</span></div><div className="leader-bio__content"><p className="eyebrow">A shepherd among us</p><h2 id="leader-bio-title">{leader.name}<br /><em>Called to serve.</em></h2><section><h3>Background &amp; vocation</h3><p>{leader.longBio.background}</p></section><section><h3>Divine calling &amp; ministry journey</h3><p>{leader.longBio.journey}</p></section><section><h3>Present leadership</h3><p>{leader.longBio.leadership}</p></section><div className="focus-grid">{leader.longBio.focus.map((focus) => <article key={focus.title}><h4>{focus.title}</h4><p>{focus.text}</p></article>)}</div></div></section>
    <section className="about-visit section-shell"><div><p className="eyebrow">Your first time?</p><h2>Come as you are.<br /><em>We’ll help you settle in.</em></h2><p>Children worship alongside their parents. We gather in English, with room to grow at your own pace.</p></div><Button href={site.pages.visit}>What to expect <ArrowUpRight size={16} /></Button></section>
  </main>;
}
