import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/pages/PageIntro";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";

export default function NotFound() {
  return <main id="main-content" className="not-found inner-page"><PageIntro image="visit" eyebrow="404 · Page not found" title="This page" accent="isn’t here."><p>We couldn’t find that page. You can head back to the homepage or browse our gatherings.</p></PageIntro><div className="not-found__actions section-shell"><Button href={site.pages.home}><ArrowLeft size={16} />Back home</Button><Button href={site.pages.gatherings} variant="secondary">Browse gatherings <ArrowUpRight size={16} /></Button></div></main>;
}
