export const site = {
  name: "Remnant Christian Network, Ekiti",
  shortName: "RCN Ekiti",
  tagline: "Building Disciples, Impacting Nations.",
  relationship: "An apostolic extension of RCN Global, the network of Apostle Arome Osayi.",
  address: "RCN Prayer Tent, Second Floor, Olaoluwa House, between Staleg Mall and Energy Filling Station, Adebayo Street, Ado-Ekiti, Ekiti State, Nigeria",
  addressParts: {
    streetAddress: "Second Floor, Olaoluwa House, between Staleg Mall and Energy Filling Station, Adebayo Street",
    addressLocality: "Ado-Ekiti",
    addressRegion: "Ekiti State",
    addressCountry: "NG",
  },
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
  pages: {
    home: "/",
    about: "/about/",
    gatherings: "/gatherings/",
    messages: "/messages/",
    visit: "/visit/",
    give: "/give/",
    watchLive: "/watch-live/",
    gatheringsArchive: "/gatherings/",
  },
  metadataDescriptions: {
    home: "Remnant Christian Network, Ekiti — an apostolic extension of RCN Global in Ado-Ekiti. Join us for prayer, the Word and fellowship.",
  },
  anchors: { fiveAnswers: "/#five-answers", posterWall: "/#poster-wall", messages: "/#messages" },
  assets: {
    logoDark: "/brand/logo-dark-bg.webp",
    heroPhoto: "/photos/rcnekiti-hero-image",
    epac26Teaching: "/photos/829735486_1138139442206766_5013005523647939209_n",
    epac26Recap: [
      { src: "/photos/829735486_1138139442206766_5013005523647939209_n", alt: "A minister teaching with a microphone on Day 1 of EPAC'26", widths: [480, 768, 1280, 1920] },
      { src: "/photos/829836919_1138141282206582_7763966123917588285_n", alt: "A woman listening during EPAC'26", widths: [480, 768, 1280] },
      { src: "/photos/830342956_1138140125540031_5219339381914869045_n", alt: "A man in prayer during EPAC'26", widths: [480, 768, 1280, 1920] },
      { src: "/photos/831533238_1138142002206510_2021870020264775082_n", alt: "A minister teaching with a microphone on Day 1 of EPAC'26", widths: [480, 768, 1280, 1920] },
    ],
    epac24Recap: [
      { src: "/photos/481253042_667657259254989_189795438339971617_n", alt: "A woman ministering at the lectern during EPAC 2024", widths: [480] },
      { src: "/photos/483365088_667658405921541_3473423411238449739_n", alt: "A woman ministering at the lectern during EPAC 2024", widths: [480, 768] },
      { src: "/photos/483366631_667657979254917_3995995404734382850_n", alt: "A minister in a blue jacket praying during EPAC 2024", widths: [480, 768, 1280, 1920] },
      { src: "/photos/483487647_667658312588217_6477995873806559024_n", alt: "A woman worshipping with a keyboard player behind her at EPAC 2024", widths: [480, 768] },
      { src: "/photos/483526109_667657995921582_6470703740998442775_n", alt: "A woman ministering at the lectern during EPAC 2024", widths: [480, 768, 1280, 1920] },
      { src: "/photos/483526630_667658572588191_126311178804020310_n", alt: "Worshippers praying together at EPAC 2024", widths: [480, 768, 1280, 1920] },
      { src: "/photos/483527733_667658402588208_1636280419037978111_n", alt: "A woman singing into a microphone at EPAC 2024", widths: [480] },
      { src: "/photos/483548996_667844235902958_2125994357373455449_n", alt: "A man in a checked shirt in passionate prayer at EPAC 2024", widths: [480, 768, 1280, 1920] },
      { src: "/photos/484196881_667658099254905_9186517460869828831_n", alt: "Two men praying together at EPAC 2024", widths: [480, 768, 1280, 1920] },
      { src: "/photos/484652126_668266819194033_5861525555669882468_n", alt: "A minister speaking to the congregation at EPAC 2024", widths: [480, 768, 1280] },
    ],
    youtubeEmbedBase: "https://www.youtube-nocookie.com/embed/",
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

export function mapSearchUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapSearch)}`;
}
