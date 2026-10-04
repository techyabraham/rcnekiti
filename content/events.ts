export type EventRecord = {
  id: string;
  title: string;
  status: "published" | "draft";
  dateISO: string | null;
  endDateISO?: string;
  time?: string;
  flyer: string;
  alt: string;
  series: string;
  speakers: string[];
  featured?: boolean;
  description?: string;
};

export const events: EventRecord[] = [
  { id: "lifeclass-relationship", title: "LifeClass: Relationship", status: "published", dateISO: "2026-02-15", time: "5:00 PM", flyer: "/flyers/2026-02-15-lifeclass-relationship.webp", alt: "Flyer: LifeClass: Relationship, Sunday 15 February, 5 PM", series: "LifeClass", speakers: ["Dr. Taiwo Omolayo"] },
  { id: "praying-always-3", title: "Praying Always, Part 3", status: "published", dateISO: "2026-02-20", time: "5:00 PM", flyer: "/flyers/2026-02-20-praying-always-part-3.webp", alt: "Flyer: Praying Always, Part 3, Friday 20 February, 5 PM", series: "Prayer Tent", speakers: ["Dr. Taiwo Omolayo"] },
  { id: "engaging-spiritual-gate", title: "Engaging Spiritual Gate (Gatekeepers Retreat)", status: "published", dateISO: "2026-02-27", endDateISO: "2026-02-28", time: "5:00 PM prompt", flyer: "/flyers/2026-02-27-engaging-spiritual-gate.webp", alt: "Flyer: Engaging Spiritual Gate (Gatekeepers Retreat), 27–28 February", series: "Conference", speakers: ["Dr. Taiwo Omolayo", "Min. Akin", "Rev. Deji Oloruntoba"], description: "For territorial prophets, prophetic intercessors, pastors, young ministers, heads of businesses, family heads and purposeful people." },
  { id: "deep-calleth", title: "The Deep Calleth", status: "published", dateISO: "2026-03-06", time: "5:00 PM", flyer: "/flyers/2026-03-06-the-deep-calleth.webp", alt: "Flyer: The Deep Calleth, Friday 6 March, 5 PM", series: "Prayer Tent", speakers: ["Dr. Taiwo Omolayo", "Pst. Oyesola", "Pst. Peter"] },
  { id: "stand-up-look-up", title: "Stand Up and Look Up", status: "published", dateISO: "2026-03-13", time: "5:00 PM", flyer: "/flyers/2026-03-13-stand-up-and-look-up.webp", alt: "Flyer: Stand Up and Look Up, Friday 13 March, 5 PM", series: "Prayer Tent", speakers: ["Dr. Taiwo Omolayo"] },
  { id: "prayer-tent-schedule", title: "Prayer Tent: schedule flyer", status: "published", dateISO: null, flyer: "/flyers/prayer-tent-schedule.webp", alt: "Flyer: RCN Prayer Tent meeting schedule", series: "Prayer Tent", speakers: [] },
  { id: "fresh-start", title: "Fresh Start", status: "published", dateISO: "2026-03-20", time: "5:00 PM", flyer: "/flyers/2026-03-20-fresh-start.webp", alt: "Flyer: Fresh Start, Friday 20 March, 5 PM", series: "Prayer Tent", speakers: ["Dr. Taiwo Omolayo"] },
  { id: "higher-measure", title: "Higher Measure (March Encounters)", status: "published", dateISO: "2026-03-27", endDateISO: "2026-03-28", time: "Friday 5:00 PM; Saturday 7:00 AM", flyer: "/flyers/2026-03-27-higher-measure.webp", alt: "Flyer: Higher Measure, Friday 27 and Saturday 28 March", series: "Encounters", speakers: ["Min. Jude Oluwatobi", "Apst. Akin Akinyemi", "Dr. Taiwo Omolayo", "Pst. Peter"] },
  { id: "prevailing-cross", title: "The Prevailing Power of the Cross", status: "published", dateISO: "2026-04-03", time: "5:00 PM", flyer: "/flyers/2026-04-03-prevailing-power-cross.webp", alt: "Flyer: The Prevailing Power of the Cross, Friday 3 April, 5 PM", series: "Prayer Tent", speakers: ["Dr. Taiwo Omolayo"] },
  { id: "laws-kingdom-2", title: "The Laws of the Kingdom, Part 2 (April Encounter)", status: "published", dateISO: "2026-04-24", endDateISO: "2026-04-25", time: "Friday 5:00 PM; Saturday 7:00 AM", flyer: "/flyers/2026-04-24-laws-of-kingdom-part-2.webp", alt: "Flyer: The Laws of the Kingdom, Part 2, 24–25 April", series: "Encounters", speakers: ["Dr. Taiwo Omolayo", "Apst. Valentine Omessa"] },
  { id: "laws-kingdom-3", title: "The Laws of the Kingdom, Part 3", status: "published", dateISO: "2026-05-01", time: "5:00 PM", flyer: "/flyers/2026-05-01-laws-of-kingdom-part-3.webp", alt: "Flyer: The Laws of the Kingdom, Part 3, Friday 1 May, 5 PM", series: "Prayer Tent", speakers: ["Dr. Taiwo Omolayo"] },
  { id: "kingdom-growth", title: "Kingdom Growth", status: "published", dateISO: "2026-05-08", flyer: "/flyers/2026-05-08-kingdom-growth.webp", alt: "Flyer: Kingdom Growth, Friday 8 May", series: "Prayer Tent", speakers: ["Dr. Taiwo Omolayo"] },
  { id: "prophetic-dimensions", title: "Prophetic Dimensions", status: "published", dateISO: "2026-05-15", flyer: "/flyers/2026-05-15-prophetic-dimensions.webp", alt: "Flyer: Prophetic Dimensions, Friday 15 May", series: "Prayer Tent", speakers: ["Dr. Taiwo Omolayo"] },
  { id: "pre-iec-prayer", title: "Pre-IEC Prayer", status: "published", dateISO: "2026-05-22", flyer: "/flyers/2026-05-22-pre-iec-prayer.webp", alt: "Flyer: Pre-IEC Prayer, Friday 22 May", series: "Prayer Tent", speakers: ["Dr. Taiwo Omolayo"] },
  { id: "rise-saviours", title: "Rise of Saviours", status: "published", dateISO: "2026-06-05", flyer: "/flyers/2026-06-05-rise-of-saviours.webp", alt: "Flyer: Rise of Saviours, Friday 5 June", series: "Prayer Tent", speakers: ["Dr. Taiwo Omolayo"] },
  { id: "reawakening-priests", title: "Reawakening the Priests", status: "published", dateISO: "2026-06-12", flyer: "/flyers/2026-06-12-reawakening-priests.webp", alt: "Flyer: Reawakening the Priests, Friday 12 June", series: "Prayer Tent", speakers: ["Dr. Taiwo Omolayo"] },
  { id: "divine-service", title: "Divine Service", status: "published", dateISO: null, time: "Friday 10th, 5:00 PM (month unconfirmed)", flyer: "/flyers/divine-service.webp", alt: "Flyer: Divine Service, Friday 10th (month unconfirmed)", series: "Prayer Tent", speakers: ["Dr. Taiwo Omolayo"] },
  { id: "divine-service-2", title: "Divine Service, Part 2", status: "published", dateISO: null, time: "Friday 17th, 5:00 PM (month unconfirmed)", flyer: "/flyers/divine-service-part-2.webp", alt: "Flyer: Divine Service, Part 2, Friday 17th (month unconfirmed)", series: "Prayer Tent", speakers: ["Dr. Taiwo Omolayo"] },
  { id: "city-takers-2", title: "City Takers Anointing, Part 2", status: "published", dateISO: "2026-08-07", time: "5:00 PM", flyer: "/flyers/2026-08-07-city-takers-anointing-part-2.webp", alt: "Flyer: City Takers Anointing, Part 2, Friday 7 August, 5 PM", series: "Prayer Tent", speakers: ["Dr. Taiwo Omolayo"] },
  { id: "family-life-prayers", title: "Family Life Prayers: Beauty for Ashes", status: "published", dateISO: "2026-08-14", time: "5:00 PM", flyer: "/flyers/2026-08-14-family-life-prayers.webp", alt: "Flyer: Family Life Prayers: Beauty for Ashes, Friday 14 August, 5 PM", series: "Prayer Tent", speakers: ["Dr. Taiwo Omolayo"] },
  { id: "fervent-spirit", title: "Fervent in the Spirit (August Encounters)", status: "published", dateISO: "2026-08-28", endDateISO: "2026-08-29", time: "Friday 5:00 PM; Saturday 7:00 AM", flyer: "/flyers/2026-08-28-fervent-in-the-spirit.webp", alt: "Flyer: Fervent in the Spirit, 28–29 August", series: "Encounters", speakers: ["Dr. Taiwo Omolayo"] },
  { id: "living-beyond-limit", title: "Living Beyond Limit", status: "published", dateISO: "2026-09-04", time: "5:00 PM", flyer: "/flyers/2026-09-04-living-beyond-limit.webp", alt: "Flyer: Living Beyond Limit, Friday 4 September, 5 PM", series: "Prayer Tent", speakers: ["Dr. Taiwo Omolayo"] },
  { id: "enlarged-pre-epac", title: "Enlarged: Pre-EPAC Prayer Meeting", status: "published", dateISO: "2026-09-18", time: "5:00 PM", flyer: "/flyers/2026-09-18-enlarged-pre-epac.webp", alt: "Flyer: Enlarged: Pre-EPAC Prayer Meeting, Friday 18 September, 5 PM", series: "Prayer Tent", speakers: ["Dr. Taiwo Omolayo"] },
  { id: "epac-26", title: "EPAC'26: Sustaining Spiritual Watch", status: "published", dateISO: "2026-09-30", endDateISO: "2026-10-03", time: "Wednesday–Saturday 4:00 PM; Saturday 7:00 AM", flyer: "/flyers/2026-09-30-epac-26-sustaining-spiritual-watch.webp", alt: "Flyer: EPAC'26, Sustaining Spiritual Watch, 30 September–3 October 2026", series: "Conference", speakers: ["Min. Glory Tonye Okoto", "Pst. Jude Oluwatobi", "Dr. Taiwo Omolayo", "Apostle Toluwalogo Agboola", "Rev. Deji Oloruntoba", "Min. Jerome"], featured: true },
];

export const epacRecaps = [
  { year: "2024", title: "The Recovery of Apostolic Mandate", photos: ["481253042", "483365088", "483366631", "483487647", "483526109", "483526630", "483527733", "483548996", "484196881", "484652126"], dateISO: null },
  { year: "2026", title: "Sustaining Spiritual Watch", photos: ["829735486", "829836919", "830342956", "831533238"], dateISO: "2026-09-30" },
];
