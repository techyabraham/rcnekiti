import type { Metadata } from "next";
import { site } from "./site";

const shareImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "RCN Ekiti — Closer than you think",
};

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_NG",
      siteName: site.shortName,
      title,
      description,
      url: path,
      images: [shareImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [shareImage.url] },
  };
}
