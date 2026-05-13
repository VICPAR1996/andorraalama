"use client";

import { Fuel, MapPin } from "lucide-react";
import { Parish, Locale } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { useEffect, useRef, useState } from "react";

interface FuelPriceCardProps {
  parish: Parish;
  locale: Locale;
}

function AnimatedPrice({ target }: { target: number }) {
  const [display, setDisplay] = useState(0);
  const frame = useRef<number | null>(null);
  const start = useRef<number | null>(null);
  const duration = 600;

  useEffect(() => {
    start.current = null;
    const animate = (ts: number) => {
      if (!start.current) start.current = ts;
      const progress = Math.min((ts - start.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * target);
      if (progress < 1) frame.current = requestAnimationFrame(animate);
    };
    frame.current = requestAnimationFrame(animate);
    return () => { if (frame.current) cancelAnimationFrame(frame.current); };
  }, [target]);

  return <span>{display.toFixed(3)}</span>;
}

export function FuelPriceCard({ parish, locale }: FuelPriceCardProps) {
  const prices = parish.fuelPrices;
  if (!prices) return null;

  const nearestStation = parish.fuelStations[0];

  return (
    <Card>
      <div className="text-[11px] font-mono text-ink-mute tracking-[0.08em] uppercase mb-3">
        Carburant · avui
      </div>
      <div className="flex flex-col divide-y divide-line">
        <div className="flex items-center justify-between py-2.5">
          <div className="flex items-center gap-2">
            <Fuel size={15} strokeWidth={1.75} className="text-ink-mute" />
            <span className="text-[13px] text-ink">Gasolina 95</span>
          </div>
          <span className="font-mono text-[14px] text-ink">
            € <AnimatedPrice target={prices.gasoline95} /> / L
          </span>
        </div>
        <div className="flex items-center justify-between py-2.5">
          <div className="flex items-center gap-2">
            <Fuel size={15} strokeWidth={1.75} className="text-ink-mute" />
            <span className="text-[13px] text-ink">Dièsel</span>
          </div>
          <span className="font-mono text-[14px] text-ink">
            € <AnimatedPrice target={prices.diesel} /> / L
          </span>
        </div>
        {nearestStation && (
          <div className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-2">
              <MapPin size={15} strokeWidth={1.75} className="text-ink-mute" />
              <span className="text-[13px] text-ink-dim">Estació + propera</span>
            </div>
            <span className="font-mono text-[11px] text-ink-dim text-right max-w-[120px] truncate">
              {nearestStation.name}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
