export type Message = {
  id: string;
  title: string;
  status: "published" | "draft";
  youtubeId: string | null;
  series: string;
  cover: string | null;
  fallback: "youtube";
};

export const messages: Message[] = [
  { id: "built-to-last-1", title: "Built to Last, Part 1", status: "published", youtubeId: null, series: "Built to Last", cover: null, fallback: "youtube" },
  { id: "built-to-last-2", title: "Built to Last, Part 2", status: "published", youtubeId: null, series: "Built to Last", cover: null, fallback: "youtube" },
  { id: "build-me-fortress-2", title: "Build Me a Fortress, Part 2", status: "published", youtubeId: null, series: "Build Me a Fortress", cover: null, fallback: "youtube" },
  { id: "stand-as-gods-man", title: "Stand as God's Man", status: "published", youtubeId: null, series: "Stand as God's Man", cover: null, fallback: "youtube" },
  { id: "fervent-spirit-message", title: "Fervent in the Spirit", status: "published", youtubeId: null, series: "Fervent in the Spirit", cover: "/flyers/2026-08-28-fervent-in-the-spirit.webp", fallback: "youtube" },
  { id: "empowering-destiny", title: "Empowering Destiny", status: "published", youtubeId: null, series: "Empowering Destiny", cover: null, fallback: "youtube" },
];
