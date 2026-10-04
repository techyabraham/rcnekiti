export const site = {
  name: "Remnant Christian Network, Ekiti",
  shortName: "RCN Ekiti",
  tagline: "Building Disciples, Impacting Nations.",
  relationship: "An apostolic extension of RCN Global, the network of Apostle Arome Osayi.",
  address: "RCN Prayer Tent, Second Floor, Olaoluwa House, between Staleg Mall and Energy Filling Station, Adebayo Street, Ado-Ekiti, Ekiti State, Nigeria",
  venueName: "RCN Prayer Tent",
  directions: [
    "A prominent multi-storey commercial building with shops and offices at ground level.",
    "The worship centre is on the second floor, reached by the main pedestrian stairwell at the front or side of the building.",
    "Open street-level and perimeter parking is available around the building. Arrive early for major weekend gatherings and monthly prayer conferences.",
  ],
  mapPinUrl: null as string | null,
  phone: "+234 816 118 6328",
  phoneUrl: "tel:+2348161186328",
  links: {
    facebook: "https://web.facebook.com/RcnEkiti",
    youtube: "https://www.youtube.com/@rcnekiti2847",
    youtubeLive: "https://www.youtube.com/@rcnekiti2847/live",
    youtubeVideos: "https://www.youtube.com/@rcnekiti2847/videos",
    telegram: "https://t.me/RCNEkiti",
    whatsapp: "https://wa.me/2348161186328",
    rcnGlobal: "https://rcnglobal.org",
    rcnGlobalGiving: "https://rcnglobal.org/giving",
    rcnGlobalTelegram: "https://t.me/apostlearome",
    rcnGlobalInstagram: "https://www.instagram.com/rcnglobal",
    rcnGlobalX: "https://x.com/apostlearome",
    abraham: "https://abraham.com.ng",
    waystream: null as string | null,
    mixlr: null as string | null,
    ekitiInstagram: null as string | null,
  },
  messages: {
    visit: "Hello RCN Ekiti, I'd like to plan a visit.",
    prayer: "Hello RCN Ekiti, I'd like prayer for…",
    join: "Hello RCN Ekiti, I'd like to join the family.",
  },
  giving: { enabled: true, ekitiUrl: null as string | null, label: "Give to RCN Ekiti", allowGlobalFallback: false },
  mapSearch: "RCN Prayer Tent Olaoluwa House Adebayo Ado-Ekiti",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rcnekiti.vercel.app",
} as const;

export function whatsappUrl(message: string): string {
  return `${site.links.whatsapp}?text=${encodeURIComponent(message)}`;
}
