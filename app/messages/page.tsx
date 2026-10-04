import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { MessagesBrowser } from "@/components/pages/MessagesBrowser";
import { PageIntro } from "@/components/pages/PageIntro";
import { Button } from "@/components/ui/Button";
import { messages } from "@/content/messages";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Messages | RCN Ekiti", description: "Browse teaching series from Remnant Christian Network, Ekiti. Find recordings on YouTube and audio messages on Telegram." };

export default function MessagesPage() {
  return <main id="main-content" className="inner-page messages-page"><PageIntro eyebrow="Carry the Word with you" title="Messages for" accent="the journey."><p>Browse the series shared by RCN Ekiti. Individual video links will be connected when the recording IDs are confirmed.</p></PageIntro><section className="messages-library section-shell" aria-labelledby="message-library-title"><div className="section-page-heading"><div><p className="eyebrow">Teaching &amp; testimony</p><h2 id="message-library-title">Find a message <em>to return to.</em></h2></div><Button href={site.links.youtubeVideos} target="_blank" variant="secondary">RCN Ekiti on YouTube <ArrowUpRight size={16} /></Button></div><MessagesBrowser messages={messages} /></section><section className="messages-invitation"><p className="eyebrow">Audio and updates</p><h2>Join the conversation<br /><em>on Telegram.</em></h2><Button href={site.links.telegram} target="_blank">Listen on Telegram <ArrowUpRight size={16} /></Button></section></main>;
}
