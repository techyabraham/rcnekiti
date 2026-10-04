import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Remnant Christian Network, Ekiti",
    short_name: "RCN Ekiti",
    description: "Building Disciples, Impacting Nations.",
    start_url: "/",
    display: "standalone",
    background_color: "#00061F",
    theme_color: "#00061F",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
