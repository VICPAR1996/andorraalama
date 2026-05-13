"use client";

import { Fuel, MapPin } from "lucide-react";
import { Parish, Locale } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

function AnimatedPrice({ target }: { target: number }) {
  const [display, setDisplay] = useState(0);
  const frame = useRef<number | null>(null);
  const start = useRef<number | null>(null);

  useEffect(() => {
    start.current = null;
    const animate = (ts: number) => {
      if (!start.current) start.current = ts;
      const progress = Math.min((ts - start.current) / 600, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * target);
      if (progress < 1) frame.current = requestAnimationFrame(animate);
    };
    frame.current = requestAnimationFrame(animate);
    return () => { if (frame.current) cancelAnimationFrame(frame.current); };
  }, [target]);

  return <span>{display.toFixed(3)}</span>;
}

interface FuelPriceCardProps {
  parish: Parish;
  locale: Locale;
}

export function FuelPriceCard({ parish }: FuelPriceCardProps) {
  const prices = parish.fuelPrices;
  if (!prices) return null;

  const nearest = parish.fuelStations[0];

  return (
    <div
      className="bg-paper-2 border-2 border-ink rounded-[22px] p-4"
      style={{ boxShadow: "5px 5px 0 #2a1f17" }}
    >
      <div className="text-[11px] font-mono text-ink-mute tracking-[0.08em] uppercase mb-3">
        Carburant · avui
      </div>
      <div className="flex flex-col gap-2">
        {[
          { label: "Gasolina 95", value: prices.gasoline95 },
          { label: "Dièsel", value: prices.diesel },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex items-center justify-between py-2.5 px-3 rounded-[12px] border-2 border-ink bg-paper"
            style={{ boxShadow: "2px 2px 0 #2a1f17" }}
          >
            <div className="flex items-center gap-2">
              <Fuel size={14} strokeWidth={2} className="text-ink-mute" />
              <span className="text-[13px] font-bold text-ink">{label}</span>
            </div>
            <span
              className="font-mono text-[13px] font-bold text-ink px-2 py-0.5 rounded-[7px] border border-ink"
              style={{ background: "var(--caldes)" }}
            >
              € <AnimatedPrice target={value} /> /L
            </span>
          </div>
        ))}
        {nearest && (
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-2 text-[12px] text-ink-soft">
              <MapPin size={13} strokeWidth={2} />
              Estació + propera
            </div>
            <span className="font-mono text-[11px] text-ink-mute truncate max-w-[120px]">
              {nearest.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
