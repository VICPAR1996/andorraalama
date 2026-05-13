"use client";

import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Parish, Locale } from "@/lib/types";
import { TamarroSvg } from "@/components/TamarroSvg";

interface ParishHeaderProps {
  parish: Parish;
  locale: Locale;
  onBack: () => void;
}

export function ParishHeader({ parish, locale, onBack }: ParishHeaderProps) {
  const { tamarro } = parish;

  return (
    <div
      className="sticky top-0 z-20 border-b-2 border-ink"
      style={{
        background: tamarro.color,
        boxShadow: "0 4px 0 #2a1f17",
        minHeight: 96,
      }}
    >
      <div className="h-full px-4 pt-[max(12px,env(safe-area-inset-top))] pb-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-[10px] bg-paper border-2 border-ink cursor-pointer active:translate-x-[1px] active:translate-y-[1px] shrink-0"
          style={{ boxShadow: "2px 2px 0 #2a1f17" }}
          aria-label="Tornar al mapa"
        >
          <ChevronLeft size={18} strokeWidth={2.5} className="text-ink" />
        </button>

        <div className="shrink-0">
          <TamarroSvg color={tamarro.color} size={52} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-mono text-paper opacity-80 tracking-[0.08em] uppercase">
            Parròquia · {tamarro.id}
          </div>
          <div className="text-[17px] font-extrabold text-paper leading-tight truncate">
            {parish.name[locale]}
          </div>
          <div
            className="text-[14px] text-paper opacity-80 leading-tight"
            style={{ fontFamily: "var(--font-caveat), cursive" }}
          >
            {tamarro.bio[locale]}
          </div>
        </div>

        {parish.weather && (
          <div className="text-[12px] font-mono text-paper opacity-90 shrink-0">
            {parish.weather.temp}°C
          </div>
        )}
      </div>
    </div>
  );
}
