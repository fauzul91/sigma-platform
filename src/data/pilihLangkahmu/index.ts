import type { Scenario } from "./types";
import { rencanaSetelahLulus } from "./scenarios/rencanaSetelahLulus";
import { kirimPap } from "./scenarios/kirimPap";
import { nongkrongMalam } from "./scenarios/nongkrongMalam";
import { batasanDiri } from "./scenarios/batasanDiri";

export * from "./types";

export const ALL_SCENARIOS: Scenario[] = [
  rencanaSetelahLulus,
  kirimPap,
  nongkrongMalam,
  batasanDiri,
];

export function getScenarioById(id: string): Scenario | undefined {
  return ALL_SCENARIOS.find((s) => s.id === id);
}