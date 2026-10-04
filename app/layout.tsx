import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Mono, Instrument_Serif } from "next/font/google";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import "./globals.css";

const displayFont = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const editorialFont = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-editorial", display: "swap" });
const monoFont = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "RCN Ekiti",
  description: "Remnant Christian Network, Ekiti — building disciples, impacting nations.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NG">
      <body className={`${displayFont.variable} ${editorialFont.variable} ${monoFont.variable}`}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
