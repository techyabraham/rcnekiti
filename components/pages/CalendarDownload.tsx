"use client";

import { useState } from "react";
import { CalendarPlus, Download } from "lucide-react";
import { buildCalendar } from "@/content/calendar";
import type { EventRecord } from "@/content/events";
import type { ScheduleItem } from "@/content/schedule";

export function CalendarDownload({ events, schedule }: { events: EventRecord[]; schedule: ScheduleItem[] }) {
  const [downloaded, setDownloaded] = useState(false);
  const download = () => {
    const file = new Blob([buildCalendar(events, schedule)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url; link.download = "rcn-ekiti-gatherings.ics"; link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000); setDownloaded(true);
  };
  return <button type="button" className="calendar-download" onClick={download}><CalendarPlus size={17} aria-hidden="true" />{downloaded ? "Calendar file downloaded" : "Add recurring gatherings to calendar"}<Download size={15} aria-hidden="true" /></button>;
}
