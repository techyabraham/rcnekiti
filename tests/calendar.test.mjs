import assert from "node:assert/strict";
import { buildCalendar } from "../content/calendar.ts";
import { events } from "../content/events.ts";
import { schedule } from "../content/schedule.ts";

const calendar = buildCalendar(events, schedule, new Date("2026-10-04T12:00:00.000Z"));

assert.match(calendar, /^BEGIN:VCALENDAR\r\nVERSION:2\.0/);
assert.match(calendar, /DTSTART:20261009T160000Z\r\n.*RRULE:FREQ=WEEKLY;BYDAY=FR/s);
assert.match(calendar, /DTSTART:20261011T070000Z\r\n.*RRULE:FREQ=WEEKLY;BYDAY=SU/s);
assert.match(calendar, /DTSTART:20261030T160000Z\r\n.*RRULE:FREQ=MONTHLY;BYDAY=-1FR/s);
assert.match(calendar, /DTSTART:20261031T060000Z\r\n.*RRULE:FREQ=MONTHLY;BYDAY=-1SA/s);
assert.doesNotMatch(calendar, /SUMMARY:EPAC'26: Sustaining Spiritual Watch/);
assert.match(calendar, /END:VCALENDAR\r\n$/);

const september = buildCalendar(events, schedule, new Date("2026-09-28T12:00:00.000Z"));
assert.match(september, /DTSTART:20260930T150000Z\r\nSUMMARY:EPAC'26: Sustaining Spiritual Watch/);

const october = buildCalendar(events, schedule, new Date("2026-10-25T12:00:00.000Z"));
assert.match(october, /DTSTART:20261031T060000Z\r\n.*RRULE:FREQ=MONTHLY;BYDAY=-1SA/s);

const april = buildCalendar(events, schedule, new Date("2027-04-01T12:00:00.000Z"));
assert.match(april, /DTSTART:20270424T060000Z\r\n.*RRULE:FREQ=MONTHLY;BYDAY=-1SA/s);

console.log("Calendar export checks passed");
