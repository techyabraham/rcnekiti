import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Mono, Instrument_Serif } from "next/font/google";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { OrganizationJsonLd } from "@/components/site/OrganizationJsonLd";
import { site } from "@/content/site";
import "./globals.css";

const displayFont = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const editorialFont = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-editorial", display: "swap" });
const monoFont = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: "RCN Ekiti",
  description: site.metadataDescriptions.home,
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: site.shortName,
    title: "Closer than you think | RCN Ekiti",
    description: site.metadataDescriptions.home,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "RCN Ekiti — Closer than you think" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NG">
      <body className={`${displayFont.variable} ${editorialFont.variable} ${monoFont.variable}`}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <OrganizationJsonLd />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
