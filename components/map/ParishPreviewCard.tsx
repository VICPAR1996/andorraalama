"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ParishId, Parish, Locale } from "@/lib/types";
import { TamarroSvg } from "@/components/TamarroSvg";
import { dur, ease } from "@/lib/motion";

interface ParishPreviewCardProps {
  parish: Parish | null;
  locale: Locale;
  onSelect: (id: ParishId) => void;
}

export function ParishPreviewCard({ parish, locale, onSelect }: ParishPreviewCardProps) {
  return (
    <AnimatePresence>
      {parish && (
        <motion.div
          key={parish.id}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
          style={{ width: "min(320px, calc(100vw - 48px))" }}
          initial={{ y: 16, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 10, opacity: 0, scale: 0.96 }}
          transition={{ duration: dur.fast, ease: ease.decel }}
          onClick={() => onSelect(parish.id)}
        >
          <div
            className="rounded-[22px] border-2 border-ink overflow-hidden"
            style={{ boxShadow: "5px 5px 0 #2a1f17", background: parish.tamarro.color }}
          >
            {/* colored top strip */}
            <div className="flex items-center gap-3 px-4 pt-3 pb-2">
              <TamarroSvg color={parish.tamarro.color} size={48} />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-mono text-paper opacity-75 tracking-[0.08em] uppercase">
                  Parròquia · {parish.tamarro.id}
                </div>
                <div className="text-[20px] font-extrabold text-paper leading-tight truncate">
                  {parish.name[locale]}
                </div>
                <div
                  className="text-[14px] text-paper opacity-85 leading-tight"
                  style={{ fontFamily: "var(--font-caveat), cursive" }}
                >
                  {parish.tamarro.bio[locale]}
                </div>
              </div>
              {parish.weather && (
                <div className="text-[13px] font-mono text-paper opacity-80 shrink-0">
                  {parish.weather.temp}°C
                </div>
              )}
            </div>

            {/* stats strip */}
            <div
              className="flex items-center gap-3 px-4 py-2.5 border-t-2 border-ink"
              style={{ background: "#fbf6e8" }}
            >
              <span className="text-[12px] font-bold text-ink">
                {parish.population.toLocaleString("ca")} hab.
              </span>
              <span className="text-ink-mute">·</span>
              <span className="text-[12px] font-bold text-ink">
                {parish.area_km2} km²
              </span>
              <div className="ml-auto">
                <span
                  className="text-[13px] font-extrabold text-paper px-3 py-1 rounded-full border-2 border-ink"
                  style={{ background: parish.tamarro.color, boxShadow: "2px 2px 0 #2a1f17" }}
                >
                  Entrar →
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
