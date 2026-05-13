export type Locale = "ca" | "es" | "en" | "fr";

export type ParishId =
  | "andorra-la-vella"
  | "escaldes-engordany"
  | "encamp"
  | "canillo"
  | "la-massana"
  | "ordino"
  | "sant-julia-de-loria";

export type SectionId =
  | "emergency"
  | "comu"
  | "fer"
  | "lloguers"
  | "carburant"
  | "temps"
  | "alertes"
  | "utilitats";

export type AppState =
  | { mode: "discovery" }
  | { mode: "parish"; parish: ParishId; section?: SectionId };

export interface ContactNumber {
  kind: "police" | "firefighters" | "emergency" | "comu" | "traffic" | "medical";
  label: Record<Locale, string>;
  phone: string;
  hours?: "24/7" | string;
}

export interface Experience {
  id: string;
  category: "nature" | "food" | "family" | "culture" | "hidden";
  title: Record<Locale, string>;
  blurb: Record<Locale, string>;
  image: { src: string; alt: string; w: number; h: number };
  geo?: { lat: number; lng: number };
  externalUrl?: string;
  season?: "all" | "winter" | "summer";
}

export interface UtilityRef {
  kind: "pharmacy" | "hospital" | "parking" | "ev";
  label: Record<Locale, string>;
  address?: string;
  phone?: string;
  url?: string;
}

export interface FuelStation {
  id: string;
  name: string;
  address: string;
}

export interface FuelSnapshot {
  stationId: string;
  gasoline95: number;
  diesel: number;
  currency: "EUR";
  updatedAt: string;
}

export interface Parish {
  id: ParishId;
  name: Record<Locale, string>;
  slogan?: Record<Locale, string>;
  population: number;
  area_km2: number;
  capital?: boolean;
  comu: {
    name: string;
    url: string;
    logo: string;
    address: string;
    phone: string;
  };
  emergency: ContactNumber[];
  utilities: UtilityRef[];
  thingsToDo: Experience[];
  rentals: { provider: "idealista" | "pisos.ad" | "local"; url: string; logo?: string }[];
  fuelStations: FuelStation[];
  weather?: {
    temp: number;
    condition: string;
    icon: string;
  };
  fuelPrices?: {
    gasoline95: number;
    diesel: number;
    updatedAt: string;
  };
}
