"use client";

import { useState } from "react";
import { Phone, ChevronDown } from "lucide-react";
import { Parish, Locale } from "@/lib/types";
import { motion } from "framer-motion";
import { dur } from "@/lib/motion";

interface EmergencyCardProps {
  parish: Parish;
  locale: Locale;
}

export function EmergencyCard({ parish, locale }: EmergencyCardProps) {
  const [expanded, setExpanded] = useState(false);
  const sorted = [...parish.emergency];
  const visible = expanded ? sorted : sorted.slice(0, 3);

  return (
    <div
      className="bg-paper-2 border-2 border-ink rounded-[22px] p-4"
      style={{ boxShadow: "5px 5px 0 #2a1f17" }}
    >
      <div className="text-[11px] font-mono text-ink-mute tracking-[0.08em] uppercase mb-3">
        Emergències
      </div>
      <div className="flex flex-col gap-2">
        {visible.map((c) => (
          <a
            key={c.phone}
            href={`tel:${c.phone}`}
            className="flex items-center justify-between py-2.5 px-3 rounded-[12px] border-2 border-ink bg-paper active:translate-x-[1px] active:translate-y-[1px] transition-transform"
            style={{ boxShadow: "2px 2px 0 #2a1f17" }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-[9px] border-2 border-ink flex items-center justify-center"
                style={{ background: parish.tamarro.color }}
              >
                <Phone size={13} strokeWidth={2.5} className="text-paper" />
              </div>
              <div>
                <div className="text-[13px] text-ink font-bold leading-tight">{c.label[locale]}</div>
                {c.hours && <div className="text-[10px] text-ink-mute font-mono">{c.hours}</div>}
              </div>
            </div>
            <div className="font-mono text-[14px] font-bold text-ink bg-caldes border border-ink rounded-[6px] px-2 py-0.5">
              {c.phone}
            </div>
          </a>
        ))}
      </div>

      {sorted.length > 3 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2.5 w-full flex items-center justify-center gap-1 text-[12px] font-mono text-ink-soft cursor-pointer py-1"
        >
          {expanded ? "Menys" : `+${sorted.length - 3} més`}
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: dur.fast }}>
            <ChevronDown size={14} strokeWidth={2} />
          </motion.span>
        </button>
      )}
    </div>
  );
}
