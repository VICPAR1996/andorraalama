"use client";

import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { Parish, Locale } from "@/lib/types";
import { cn } from "@/lib/cn";

interface ThingsToDoCarouselProps {
  parish: Parish;
  locale: Locale;
}

const CATEGORY_COLORS: Record<string, string> = {
  nature: "bg-[oklch(76%_0.14_155_/_0.15)] border-[oklch(76%_0.14_155_/_0.4)]",
  food: "bg-[oklch(78%_0.14_70_/_0.15)] border-[oklch(78%_0.14_70_/_0.4)]",
  family: "bg-accent-soft border-accent-line",
  culture: "bg-[oklch(72%_0.12_290_/_0.15)] border-[oklch(72%_0.12_290_/_0.4)]",
  hidden: "bg-[oklch(72%_0.14_320_/_0.15)] border-[oklch(72%_0.14_320_/_0.4)]",
};

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  nature: { ca: "Natura", es: "Naturaleza", en: "Nature", fr: "Nature" },
  food: { ca: "Gastronomia", es: "Gastronomía", en: "Food", fr: "Gastronomie" },
  family: { ca: "Família", es: "Familia", en: "Family", fr: "Famille" },
  culture: { ca: "Cultura", es: "Cultura", en: "Culture", fr: "Culture" },
  hidden: { ca: "Amagat", es: "Oculto", en: "Hidden", fr: "Caché" },
};

export function ThingsToDoCarousel({ parish, locale }: ThingsToDoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!parish.thingsToDo?.length) return null;

  return (
    <div>
      <div className="text-[11px] font-mono text-ink-mute tracking-[0.08em] uppercase mb-3">
        Coses per fer
      </div>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
      >
        {parish.thingsToDo.map((exp, i) => (
          <div
            key={exp.id}
            className={cn(
              "flex-shrink-0 snap-start rounded-[16px] border overflow-hidden",
              "bg-surface-2",
              i === 0 ? "w-[60%]" : "w-[48%]",
              "aspect-[4/5] relative"
            )}
          >
            {/* placeholder image bg */}
            <div
              className="absolute inset-0"
              style={{
                background: "repeating-linear-gradient(135deg, #16161c 0 8px, #1c1c24 8px 16px)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <span
                className={cn(
                  "inline-block text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full border mb-1.5",
                  CATEGORY_COLORS[exp.category]
                )}
              >
                {CATEGORY_LABELS[exp.category]?.[locale] ?? exp.category}
              </span>
              <div className="text-[13px] font-semibold text-ink leading-tight">
                {exp.title[locale]}
              </div>
              {exp.externalUrl && (
                <a
                  href={exp.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-[10px] text-ink-dim"
                >
                  <ExternalLink size={10} /> Web
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
