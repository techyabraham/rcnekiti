import type { EventRecord } from "./events";
import type { ScheduleItem } from "./schedule";
import { nextOccurrences } from "./occurrences.ts";

const utcStamp = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
const escapeText = (value: string) => value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
function eventBlock(start: string, summary: string, description: string, rule?: string, end?: string) {
  return ["BEGIN:VEVENT", `UID:${encodeURIComponent(summary)}-${start}@rcnekiti`, `DTSTAMP:${utcStamp(new Date())}`, `DTSTART:${start}`, ...(end ? [`DTEND:${end}`] : []), `SUMMARY:${escapeText(summary)}`, `DESCRIPTION:${escapeText(description)}`, ...(rule ? [`RRULE:${rule}`] : []), "END:VEVENT"].join("\r\n");
}

export function buildCalendar(events: EventRecord[], rules: ScheduleItem[], now = new Date()) {
  const blocks: string[] = [];
  for (const rule of rules.filter((item) => item.status === "published" && item.frequency === "weekly")) {
    const occurrence = nextOccurrences([rule], now, 1)[0];
    if (!occurrence) continue;
    const start = utcStamp(new Date(occurrence.startsAt));
    const end = occurrence.endsAt ? utcStamp(new Date(occurrence.endsAt)) : undefined;
    const byDay = rule.id === "weekly-prayer" ? "FR" : "SU";
    blocks.push(eventBlock(start, occurrence.title, `${rule.description} All times WAT. Venue: ${rule.venue}.`, `FREQ=WEEKLY;BYDAY=${byDay}`, end));
  }
  const monthly = rules.find((item) => item.id === "monthly-encounters" && item.status === "published");
  if (monthly) {
    const occurrence = nextOccurrences([monthly], now, 1)[0];
    if (occurrence) {
      const friday = new Date(occurrence.startsAt);
      const datePart = (date: Date) => date.toISOString().slice(0, 10).replace(/-/g, "");
      const lastSaturday = new Date(Date.UTC(friday.getUTCFullYear(), friday.getUTCMonth() + 1, 0));
      lastSaturday.setUTCDate(lastSaturday.getUTCDate() - ((lastSaturday.getUTCDay() + 1) % 7));
      blocks.push(eventBlock(`${datePart(friday)}T160000Z`, "Monthly Encounters · Friday session", `${monthly.description} Starts 5:00 PM WAT. Venue: ${monthly.venue}.`, "FREQ=MONTHLY;BYDAY=-1FR"));
      blocks.push(eventBlock(`${datePart(lastSaturday)}T060000Z`, "Monthly Encounters · Saturday session", `${monthly.description} Starts 7:00 AM WAT. Venue: ${monthly.venue}.`, "FREQ=MONTHLY;BYDAY=-1SA"));
    }
  }
  for (const event of events) {
    if (event.status !== "published" || !event.dateISO || Date.parse(`${event.dateISO}T23:59:59+01:00`) < now.getTime() || !event.time) continue;
    const match = event.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!match) continue;
    let hour = Number(match[1]) % 12;
    if (match[3].toUpperCase() === "PM") hour += 12;
    const [year, month, day] = event.dateISO.split("-").map(Number);
    const start = utcStamp(new Date(Date.UTC(year, month - 1, day, hour - 1, Number(match[2]))));
    blocks.push(eventBlock(start, event.title, `${event.series}. All times WAT. Venue: RCN Prayer Tent.`));
  }
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//RCN Ekiti//Gatherings//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", ...blocks, "END:VCALENDAR", ""].join("\r\n");
}
