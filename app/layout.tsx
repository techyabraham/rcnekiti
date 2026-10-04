import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RCN Ekiti",
  description: "Remnant Christian Network, Ekiti — building disciples, impacting nations.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-NG"><body>{children}</body></html>;
}
