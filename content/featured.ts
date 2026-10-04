import { events, epacRecaps } from "./events";
import { liveOccurrence } from "./occurrences";
import type { ScheduleItem } from "./schedule";

export function selectFeatured(now = new Date(), rules: ScheduleItem[] = []) {
  const live = liveOccurrence(rules, now);
  if (live) return { kind: "live" as const, occurrence: live };
  const upcoming = events
    .filter((event) => event.status === "published" && event.dateISO && Date.parse(`${event.dateISO}T23:59:59+01:00`) >= now.getTime())
    .sort((a, b) => (a.dateISO ?? "").localeCompare(b.dateISO ?? ""));
  if (upcoming.length) return { kind: "upcoming" as const, event: upcoming[0] };
  const recap = [...epacRecaps].filter((item) => item.dateISO && Date.parse(`${item.dateISO}T23:59:59+01:00`) < now.getTime()).sort((a, b) => (b.dateISO ?? "").localeCompare(a.dateISO ?? ""))[0];
  return { kind: "recap" as const, recap: recap ?? epacRecaps[epacRecaps.length - 1] };
}
