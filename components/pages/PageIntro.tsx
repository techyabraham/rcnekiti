import type { ReactNode } from "react";
import { Img } from "@/components/ui/Img";
import { InnerPageMotion } from "./InnerPageMotion";
import { pageImages } from "@/content/page-images";

export function PageIntro({ eyebrow, title, accent, children, className = "", image }: { eyebrow: string; title: string; accent?: string; children?: ReactNode; className?: string; image?: keyof typeof pageImages }) {
  const photo = image ? pageImages[image] : null;
  return <header className={`page-intro section-shell ${photo ? "page-intro--photographic" : ""} ${className}`}>
    <InnerPageMotion />
    {photo && <div className="page-intro__visual"><Img src={photo.src} alt={photo.alt} width={1280} height={960} responsive responsiveWidths={photo.widths} loading="eager" fetchPriority="high" sizes="(max-width: 700px) 100vw, 70vw" style={{ objectPosition: photo.position }} /><div className="page-intro__shade" /></div>}
    <div className="page-intro__content"><p className="eyebrow">{eyebrow}</p><h1><span>{title}</span>{accent && <> <em>{accent}</em></>}</h1>{children && <div className="page-intro__body">{children}</div>}</div>
    {photo && <div className="page-intro__caption"><span aria-hidden="true" />{photo.caption}</div>}
  </header>;
}
