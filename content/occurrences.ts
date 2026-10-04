import type { ScheduleItem } from "./schedule";

export type ScheduleOccurrence = {
  id: string;
  programId: string;
  title: string;
  startsAt: string;
  endsAt: string | null;
  timeLabel: string;
  mode: "Hybrid";
  venue: string;
};

const WAT_OFFSET_MS = 60 * 60 * 1000;
const dayMs = 24 * 60 * 60 * 1000;
const two = (value: number) => String(value).padStart(2, "0");
const isoDate = (year: number, month: number, day: number) => `${year}-${two(month)}-${two(day)}`;

function lagosDate(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Lagos", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(date);
  const part = (type: string) => Number(parts.find((item) => item.type === type)?.value);
  return { year: part("year"), month: part("month"), day: part("day") };
}

function localInstant(date: string, hour: number, minute = 0) {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, hour, minute) - WAT_OFFSET_MS).toISOString();
}

function lastFriday(year: number, month: number) {
  const lastDay = new Date(Date.UTC(year, month, 0));
  const friday = lastDay.getUTCDate() - ((lastDay.getUTCDay() + 2) % 7);
  return friday;
}

export function nextOccurrences(rules: ScheduleItem[], now = new Date(), count = 3): ScheduleOccurrence[] {
  if (count <= 0) return [];
  const local = lagosDate(now);
  const localToday = Date.UTC(local.year, local.month - 1, local.day);
  const horizon = 100;
  const occurrences: ScheduleOccurrence[] = [];
  const representedPrograms = new Set<string>();

  for (let offset = 1; offset < horizon; offset += 1) {
    const date = new Date(localToday + offset * dayMs);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const dateKey = isoDate(year, month, day);
    const weekday = date.getUTCDay();

    for (const rule of rules) {
      if (rule.status !== "published" || representedPrograms.has(rule.id)) continue;
      if (rule.frequency === "weekly" && ((rule.id === "weekly-prayer" && weekday === 5) || (rule.id === "sunday-service" && weekday === 0))) {
        const isPrayer = rule.id === "weekly-prayer";
        const startHour = isPrayer ? 17 : 8;
        const endHour = isPrayer ? 20 : 11;
        const endMinute = isPrayer ? 0 : 30;
        const startsAt = localInstant(dateKey, startHour);
        if (Date.parse(startsAt) >= now.getTime()) {
          occurrences.push({
            id: rule.id + "-" + dateKey, programId: rule.id, title: isPrayer ? "Weekly Prayer" : rule.title,
            startsAt, endsAt: localInstant(dateKey, endHour, endMinute),
            timeLabel: isPrayer ? "5:00 PM WAT" : "8:00 AM WAT", mode: rule.mode, venue: rule.venue,
          });
          representedPrograms.add(rule.id);
        }
      }
      if (rule.frequency === "monthly" && day === lastFriday(year, month)) {
        const startsAt = localInstant(dateKey, 17);
        if (Date.parse(startsAt) >= now.getTime()) {
          occurrences.push({
            id: rule.id + "-" + dateKey, programId: rule.id, title: "Monthly Encounters",
            startsAt, endsAt: null, timeLabel: "Fri 5:00 PM · Sat 7:00 AM WAT",
            mode: rule.mode, venue: rule.venue,
          });
          representedPrograms.add(rule.id);
        }
      }
    }
  }
  return occurrences.sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt)).slice(0, count);
}

export function formatOccurrenceDate(startsAt: string) {
  return new Intl.DateTimeFormat("en-NG", {
    timeZone: "Africa/Lagos", weekday: "short", day: "numeric", month: "short",
  }).format(new Date(startsAt));
}

export function liveOccurrence(rules: ScheduleItem[], now = new Date()): ScheduleOccurrence | null {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Lagos", year: "numeric", month: "2-digit", day: "2-digit",
    weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(now);
  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? "0";
  const weekday = part("weekday");
  const date = part("year") + "-" + part("month") + "-" + part("day");
  const minuteOfDay = Number(part("hour")) * 60 + Number(part("minute"));
  for (const rule of rules) {
    if (rule.status !== "published" || rule.frequency !== "weekly") continue;
    const isPrayer = rule.id === "weekly-prayer";
    if ((isPrayer && weekday !== "Fri") || (!isPrayer && rule.id === "sunday-service" && weekday !== "Sun")) continue;
    const start = isPrayer ? 17 * 60 : 8 * 60;
    const end = isPrayer ? 20 * 60 : 11 * 60 + 30;
    if (minuteOfDay < start || minuteOfDay >= end) continue;
    return {
      id: rule.id + "-" + date, programId: rule.id, title: isPrayer ? "Weekly Prayer" : rule.title,
      startsAt: localInstant(date, isPrayer ? 17 : 8), endsAt: localInstant(date, isPrayer ? 20 : 11, isPrayer ? 0 : 30),
      timeLabel: isPrayer ? "5:00 PM WAT" : "8:00 AM WAT", mode: rule.mode, venue: rule.venue,
    };
  }
  return null;
}
