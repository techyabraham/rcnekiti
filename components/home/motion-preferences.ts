export type MotionEnvironment = {
  reducedMotion: boolean;
  saveData: boolean;
  deviceMemory?: number;
  hardwareConcurrency?: number;
  finePointer: boolean;
};

export function shouldEnableMotion(environment: MotionEnvironment) {
  return !environment.reducedMotion
    && !environment.saveData
    && !(environment.deviceMemory && environment.deviceMemory <= 2)
    && !(environment.hardwareConcurrency && environment.hardwareConcurrency <= 4)
    && environment.finePointer;
}

export function readMotionEnvironment(): MotionEnvironment {
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  return {
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    saveData: nav.connection?.saveData === true,
    deviceMemory: nav.deviceMemory,
    hardwareConcurrency: nav.hardwareConcurrency,
    finePointer: window.matchMedia("(pointer: fine)").matches,
  };
}
