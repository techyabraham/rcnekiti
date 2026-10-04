import test from "node:test";
import assert from "node:assert/strict";
import { shouldEnableMotion } from "../components/home/motion-preferences.ts";

const desktop = { reducedMotion: false, saveData: false, deviceMemory: 8, hardwareConcurrency: 8, finePointer: true };

test("allows the full motion layer on a capable desktop", () => {
  assert.equal(shouldEnableMotion(desktop), true);
});

test("keeps motion static for reduced motion, data saver, and constrained devices", () => {
  assert.equal(shouldEnableMotion({ ...desktop, reducedMotion: true }), false);
  assert.equal(shouldEnableMotion({ ...desktop, saveData: true }), false);
  assert.equal(shouldEnableMotion({ ...desktop, deviceMemory: 2 }), false);
  assert.equal(shouldEnableMotion({ ...desktop, hardwareConcurrency: 4 }), false);
  assert.equal(shouldEnableMotion({ ...desktop, finePointer: false }), false);
});
