"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParishId } from "@/lib/types";
import { ease, dur } from "@/lib/motion";
import { cn } from "@/lib/cn";

const PARISHES: { id: ParishId; label: string; d: string; labelX: number; labelY: number }[] = [
  {
    id: "canillo",
    label: "Canillo",
    d: "M 260 40 L 320 50 L 360 80 L 370 120 L 340 150 L 300 155 L 270 140 L 250 110 L 248 80 Z",
    labelX: 305,
    labelY: 100,
  },
  {
    id: "encamp",
    label: "Encamp",
    d: "M 210 70 L 248 80 L 250 110 L 270 140 L 300 155 L 295 175 L 260 180 L 235 165 L 215 140 L 200 110 L 205 85 Z",
    labelX: 248,
    labelY: 128,
  },
  {
    id: "ordino",
    label: "Ordino",
    d: "M 80 40 L 140 35 L 175 55 L 185 85 L 170 110 L 145 120 L 110 115 L 80 100 L 65 75 Z",
    labelX: 122,
    labelY: 78,
  },
  {
    id: "la-massana",
    label: "La Massana",
    d: "M 65 75 L 110 115 L 145 120 L 155 145 L 135 165 L 105 170 L 75 155 L 55 130 L 50 100 Z",
    labelX: 98,
    labelY: 135,
  },
  {
    id: "andorra-la-vella",
    label: "Andorra la Vella",
    d: "M 155 145 L 175 140 L 200 145 L 215 140 L 235 165 L 225 185 L 200 195 L 175 190 L 158 178 L 150 162 Z",
    labelX: 192,
    labelY: 170,
  },
  {
    id: "escaldes-engordany",
    label: "Escaldes",
    d: "M 175 140 L 205 85 L 200 110 L 215 140 L 200 145 Z",
    labelX: 198,
    labelY: 118,
  },
  {
    id: "sant-julia-de-loria",
    label: "Sant Julià",
    d: "M 105 170 L 135 165 L 155 145 L 150 162 L 158 178 L 175 190 L 175 220 L 145 235 L 110 220 L 90 200 L 88 180 Z",
    labelX: 132,
    labelY: 200,
  },
];

interface ParishMapProps {
  compact?: boolean;
  activeParish?: ParishId | null;
  onSelect?: (id: ParishId) => void;
}

export function ParishMap({ compact = false, activeParish, onSelect }: ParishMapProps) {
  const [hovered, setHovered] = useState<ParishId | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePointerDown = (id: ParishId) => {
    longPressTimer.current = setTimeout(() => {
      // long press: future command sheet
    }, 500);
  };

  const handlePointerUp = (id: ParishId) => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    onSelect?.(id);
    if (typeof window !== "undefined" && (window.navigator as Navigator & { vibrate?: (p: number) => void }).vibrate) {
      (window.navigator as Navigator & { vibrate: (p: number) => void }).vibrate(8);
    }
  };

  return (
    <motion.svg
      viewBox="50 30 330 220"
      className={cn("w-full h-full", compact ? "opacity-90" : "")}
      style={{ touchAction: "none" }}
    >
      <defs>
        <radialGradient id="mapGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="oklch(72% 0.16 245)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="50" y="30" width="330" height="220" fill="url(#mapGlow)" />

      {PARISHES.map((p) => {
        const isActive = activeParish === p.id;
        const isHovered = hovered === p.id;

        return (
          <g key={p.id}>
            <motion.path
              d={p.d}
              fill={
                isActive
                  ? "oklch(72% 0.16 245 / 0.18)"
                  : isHovered
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(255,255,255,0.025)"
              }
              stroke={
                isActive
                  ? "oklch(72% 0.16 245 / 0.55)"
                  : isHovered
                  ? "rgba(255,255,255,0.22)"
                  : "rgba(255,255,255,0.12)"
              }
              strokeWidth={isActive ? 1.5 : 1}
              style={{
                filter: isActive
                  ? "drop-shadow(0 0 12px oklch(72% 0.16 245 / 0.4))"
                  : undefined,
                cursor: "pointer",
              }}
              animate={{ scale: isActive ? 1.02 : 1 }}
              transition={{ duration: dur.fast, ease: ease.standard }}
              onPointerEnter={() => !compact && setHovered(p.id)}
              onPointerLeave={() => !compact && setHovered(null)}
              onPointerDown={() => !compact && handlePointerDown(p.id)}
              onPointerUp={() => !compact && handlePointerUp(p.id)}
            />
            {!compact && (
              <motion.text
                x={p.labelX}
                y={p.labelY}
                textAnchor="middle"
                fill={
                  isActive
                    ? "oklch(72% 0.16 245)"
                    : isHovered
                    ? "rgba(255,255,255,0.85)"
                    : "rgba(255,255,255,0.45)"
                }
                fontSize={isActive ? "9" : "8"}
                fontFamily="var(--mono)"
                letterSpacing="0.05em"
                style={{ textTransform: "uppercase", pointerEvents: "none" }}
                animate={{
                  fill: isActive
                    ? "oklch(72% 0.16 245)"
                    : isHovered
                    ? "rgba(255,255,255,0.85)"
                    : "rgba(255,255,255,0.45)",
                }}
                transition={{ duration: dur.fast }}
              >
                {p.label}
              </motion.text>
            )}
          </g>
        );
      })}
    </motion.svg>
  );
}
