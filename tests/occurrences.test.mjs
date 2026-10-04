import test from "node:test";
import assert from "node:assert/strict";
import { liveOccurrence, nextOccurrences } from "../content/occurrences.ts";
import { schedule } from "../content/schedule.ts";

const now = new Date("2026-10-04T12:00:00.000Z");

test("returns the next three published programs in Lagos local time", () => {
  const next = nextOccurrences(schedule, now, 3);
  assert.deepEqual(next.map(({ title, startsAt }) => [title, startsAt]), [
    ["Weekly Prayer", "2026-10-09T16:00:00.000Z"],
    ["Sunday Service", "2026-10-11T07:00:00.000Z"],
    ["Monthly Encounters", "2026-10-30T16:00:00.000Z"],
  ]);
  assert.equal(next[2].timeLabel, "Fri 5:00 PM · Sat 7:00 AM WAT");
});

test("finds each month's final Friday and excludes already-started gatherings", () => {
  const monthly = schedule.filter((rule) => rule.id === "monthly-encounters");
  const dec = nextOccurrences(monthly, new Date("2026-12-20T13:00:00.000Z"), 1);
  assert.equal(dec[0].startsAt, "2026-12-25T16:00:00.000Z");
  const afterFridayStart = nextOccurrences(schedule, new Date("2026-10-09T16:15:00.000Z"), 1);
  assert.equal(afterFridayStart[0].title, "Sunday Service");
});

test("uses Africa/Lagos year-round UTC+1 with no seasonal shift", () => {
  const summer = nextOccurrences(schedule, new Date("2026-06-01T12:00:00.000Z"), 1);
  assert.equal(summer[0].startsAt, "2026-06-05T16:00:00.000Z");
});

test("prioritizes weekly meetings only during their published live windows", () => {
  assert.equal(liveOccurrence(schedule, new Date("2026-10-09T16:00:00.000Z"))?.title, "Weekly Prayer");
  assert.equal(liveOccurrence(schedule, new Date("2026-10-09T20:00:00.000Z")), null);
});
