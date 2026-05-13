"use client";

import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Parish, Locale } from "@/lib/types";
import { Chip } from "@/components/ui/Chip";
import { ParishMap } from "@/components/map/ParishMap";

interface ParishHeaderProps {
  parish: Parish;
  locale: Locale;
  onBack: () => void;
}

export function ParishHeader({ parish, locale, onBack }: ParishHeaderProps) {
  return (
    <motion.div
      layoutId="parish-header"
      className="sticky top-0 z-20 border-b border-line"
      style={{
        background: "linear-gradient(180deg, #0e0e13, #0a0a0d)",
        height: 96,
      }}
    >
      <div className="h-full px-4 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center text-ink-dim active:text-ink cursor-pointer"
          aria-label="Tornar al mapa"
        >
          <ChevronLeft size={20} strokeWidth={1.75} />
        </button>

        <div className="w-9 h-9 rounded-[10px] overflow-hidden border border-accent-line bg-accent-soft shrink-0">
          <ParishMap compact activeParish={parish.id} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-[9.5px] text-ink-dim font-mono tracking-[0.06em] uppercase">
            Parròquia
          </div>
          <div className="text-[15px] font-semibold text-ink leading-tight truncate">
            {parish.name[locale]}
          </div>
        </div>

        {parish.weather && (
          <div className="text-[11px] font-mono text-ink-dim shrink-0">
            {parish.weather.temp}°C
          </div>
        )}
      </div>
    </motion.div>
  );
}
