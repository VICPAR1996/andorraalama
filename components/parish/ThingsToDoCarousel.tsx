"use client";

import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { Parish, Locale } from "@/lib/types";

interface ThingsToDoCarouselProps {
  parish: Parish;
  locale: Locale;
}

const CATEGORY_BG: Record<string, string> = {
  nature: "#aac28c",
  food: "#efb13c",
  family: "#4a89a8",
  culture: "#8e6db5",
  hidden: "#e8743b",
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
        {parish.thingsToDo.map((exp, i) => {
          const bg = CATEGORY_BG[exp.category] ?? parish.tamarro.color;
          return (
            <div
              key={exp.id}
              className="flex-shrink-0 snap-start rounded-[16px] border-2 border-ink overflow-hidden relative"
              style={{
                width: i === 0 ? "62%" : "50%",
                aspectRatio: "4/5",
                background: `repeating-linear-gradient(135deg, ${bg} 0 8px, ${bg}cc 8px 16px)`,
                boxShadow: "4px 4px 0 #2a1f17",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span
                  className="inline-block text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-ink mb-1.5 font-bold"
                  style={{ background: "#fbf6e8", color: "#2a1f17" }}
                >
                  {exp.category}
                </span>
                <div className="text-[13px] font-extrabold text-paper leading-tight">
                  {exp.title[locale]}
                </div>
                {exp.externalUrl && (
                  <a
                    href={exp.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-[10px] text-paper opacity-80"
                  >
                    <ExternalLink size={10} /> Web
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
