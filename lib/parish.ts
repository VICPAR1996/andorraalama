import { Parish, ParishId } from "./types";

export const PARISH_IDS: ParishId[] = [
  "andorra-la-vella",
  "escaldes-engordany",
  "encamp",
  "canillo",
  "la-massana",
  "ordino",
  "sant-julia-de-loria",
];

export async function loadParish(id: ParishId): Promise<Parish> {
  const data = await import(`../data/parishes/${id}.json`);
  return data.default as Parish;
}

export async function getAllParishes(): Promise<Parish[]> {
  return Promise.all(PARISH_IDS.map(loadParish));
}
