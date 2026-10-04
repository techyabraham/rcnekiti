export type ScheduleItem = {
  id: string;
  title: string;
  status: "published" | "draft";
  day: string;
  frequency: "weekly" | "monthly";
  times: string;
  mode: "Hybrid";
  description: string;
  venue: string;
  rrule: string;
};

export const schedule: ScheduleItem[] = [
  {
    id: "weekly-prayer",
    title: "Weekly Prayer Meeting",
    status: "published",
    day: "Every Friday",
    frequency: "weekly",
    times: "5:00 PM–8:00 PM WAT",
    mode: "Hybrid",
    description: "Communal intercession and seeking God's face.",
    venue: "RCN Prayer Tent",
    rrule: "FREQ=WEEKLY;BYDAY=FR",
  },
  {
    id: "sunday-service",
    title: "Sunday Service",
    status: "published",
    day: "Every Sunday",
    frequency: "weekly",
    times: "8:00 AM–11:30 AM WAT",
    mode: "Hybrid",
    description: "Systematic biblical teaching, worship and fellowship.",
    venue: "RCN Prayer Tent",
    rrule: "FREQ=WEEKLY;BYDAY=SU",
  },
  {
    id: "monthly-encounters",
    title: "Monthly Prayer Contact / Encounters",
    status: "published",
    day: "Last Friday and Saturday of every month",
    frequency: "monthly",
    times: "Friday 5:00 PM; Saturday 7:00 AM WAT",
    mode: "Hybrid",
    description: "Extended multi-session prayer and apostolic teaching.",
    venue: "RCN Prayer Tent",
    rrule: "FREQ=MONTHLY;BYDAY=-1FR",
  },
];

export const draftPrograms = [
  { title: "LifeClass", day: "1st and 3rd Sunday", status: "draft" as const },
];
