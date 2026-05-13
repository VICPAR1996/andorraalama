"use client";

import { useState } from "react";
import { Phone, ChevronDown } from "lucide-react";
import { Parish, Locale } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";
import { ease, dur } from "@/lib/motion";

interface EmergencyCardProps {
  parish: Parish;
  locale: Locale;
}

const KIND_ORDER = ["emergency", "police", "firefighters", "medical", "traffic", "comu"] as const;

export function EmergencyCard({ parish, locale }: EmergencyCardProps) {
  const [expanded, setExpanded] = useState(false);

  const sorted = [...parish.emergency].sort(
    (a, b) => KIND_ORDER.indexOf(a.kind as typeof KIND_ORDER[number]) - KIND_ORDER.indexOf(b.kind as typeof KIND_ORDER[number])
  );

  const visible = expanded ? sorted : sorted.slice(0, 3);

  return (
    <Card>
      <div className="text-[11px] font-mono text-ink-mute tracking-[0.08em] uppercase mb-3">
        Emergències
      </div>
      <div className="flex flex-col gap-1">
        {visible.map((c) => (
          <a
            key={c.phone}
            href={`tel:${c.phone}`}
            className="flex items-center justify-between py-2.5 px-3 rounded-[10px] bg-surface-2 border border-line active:bg-accent-soft transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-[8px] bg-accent-soft border border-accent-line flex items-center justify-center">
                <Phone size={13} strokeWidth={1.75} className="text-accent" />
              </div>
              <div>
                <div className="text-[13px] text-ink font-medium leading-tight">
                  {c.label[locale]}
                </div>
                {c.hours && (
                  <div className="text-[10.5px] text-ink-mute font-mono">{c.hours}</div>
                )}
              </div>
            </div>
            <div className="font-mono text-[14px] text-ink">{c.phone}</div>
          </a>
        ))}
      </div>

      {sorted.length > 3 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 w-full flex items-center justify-center gap-1 text-[12px] text-ink-dim font-mono cursor-pointer py-1"
        >
          {expanded ? "Menys" : `+${sorted.length - 3} més`}
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: dur.fast }}>
            <ChevronDown size={14} strokeWidth={1.75} />
          </motion.span>
        </button>
      )}
    </Card>
  );
}
