"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParishId } from "@/lib/types";
import { dur, ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

const PARISHES: {
  id: ParishId;
  label: string;
  tamarroName: string;
  color: string;
  d: string;
  labelX: number;
  labelY: number;
  tamarroX: number;
  tamarroY: number;
}[] = [
  {
    id: "ordino",
    label: "Ordino",
    tamarroName: "Dino",
    color: "#b14536",
    d: "M 80 40 L 140 35 L 175 55 L 185 85 L 170 110 L 145 120 L 110 115 L 80 100 L 65 75 Z",
    labelX: 122, labelY: 88, tamarroX: 118, tamarroY: 55,
  },
  {
    id: "canillo",
    label: "Canillo",
    tamarroName: "Nilo",
    color: "#f0a020",
    d: "M 260 40 L 320 50 L 360 80 L 370 120 L 340 150 L 300 155 L 270 140 L 250 110 L 248 80 Z",
    labelX: 305, labelY: 105, tamarroX: 300, tamarroY: 62,
  },
  {
    id: "la-massana",
    label: "La Massana",
    tamarroName: "Massa",
    color: "#4a89a8",
    d: "M 65 75 L 110 115 L 145 120 L 155 145 L 135 165 L 105 170 L 75 155 L 55 130 L 50 100 Z",
    labelX: 98, labelY: 143, tamarroX: 93, tamarroY: 108,
  },
  {
    id: "encamp",
    label: "Encamp",
    tamarroName: "Enko",
    color: "#6fa64a",
    d: "M 210 70 L 248 80 L 250 110 L 270 140 L 300 155 L 295 175 L 260 180 L 235 165 L 215 140 L 200 110 L 205 85 Z",
    labelX: 248, labelY: 135, tamarroX: 244, tamarroY: 95,
  },
  {
    id: "andorra-la-vella",
    label: "Andorra la Vella",
    tamarroName: "Andy",
    color: "#e8743b",
    d: "M 155 145 L 175 140 L 200 145 L 215 140 L 235 165 L 225 185 L 200 195 L 175 190 L 158 178 L 150 162 Z",
    labelX: 192, labelY: 175, tamarroX: 188, tamarroY: 140,
  },
  {
    id: "escaldes-engordany",
    label: "Escaldes",
    tamarroName: "Caldes",
    color: "#efb13c",
    d: "M 175 140 L 205 85 L 200 110 L 215 140 L 200 145 Z",
    labelX: 200, labelY: 122, tamarroX: 196, tamarroY: 83,
  },
  {
    id: "sant-julia-de-loria",
    label: "Sant Julià",
    tamarroName: "Lau",
    color: "#8e6db5",
    d: "M 105 170 L 135 165 L 155 145 L 150 162 L 158 178 L 175 190 L 175 220 L 145 235 L 110 220 L 90 200 L 88 180 Z",
    labelX: 132, labelY: 205, tamarroX: 126, tamarroY: 162,
  },
];

interface ParishMapProps {
  compact?: boolean;
  activeParish?: ParishId | null;
  onSelect?: (id: ParishId) => void;
  onHover?: (id: ParishId | null) => void;
}

function TamarroHead({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 40 46" fill="none">
      <ellipse cx="12" cy="9" rx="5" ry="7" fill={color} stroke="#2a1f17" strokeWidth="2" />
      <ellipse cx="28" cy="9" rx="5" ry="7" fill={color} stroke="#2a1f17" strokeWidth="2" />
      <rect x="6" y="12" width="28" height="24" rx="10" fill={color} stroke="#2a1f17" strokeWidth="2" />
      <rect x="11" y="17" width="6" height="5" rx="2" fill="#2a1f17" />
      <rect x="23" y="17" width="6" height="5" rx="2" fill="#2a1f17" />
      <circle cx="14" cy="19" r="1.5" fill="white" />
      <circle cx="26" cy="19" r="1.5" fill="white" />
      <path d="M 13 28 Q 20 33 27 28" stroke="#2a1f17" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function ParishMap({ compact = false, activeParish, onSelect, onHover }: ParishMapProps) {
  const [hovered, setHovered] = useState<ParishId | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePointerDown = (id: ParishId) => {
    longPressTimer.current = setTimeout(() => {}, 500);
  };

  const handlePointerUp = (id: ParishId) => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    onSelect?.(id);
    if (typeof window !== "undefined") {
      const nav = window.navigator as Navigator & { vibrate?: (p: number) => void };
      nav.vibrate?.(8);
    }
  };

  return (
    <svg
      viewBox="50 30 330 220"
      className="w-full h-full"
      style={{ touchAction: "none" }}
    >
      {PARISHES.map((p) => {
        const isActive = activeParish === p.id;
        const isHovered = hovered === p.id;
        const highlight = isActive || isHovered;

        return (
          <g key={p.id}>
            <motion.path
              d={p.d}
              fill={p.color}
              fillOpacity={isActive ? 1 : isHovered ? 0.85 : compact ? 0.7 : 0.65}
              stroke="#2a1f17"
              strokeWidth={isActive ? 2.5 : 2}
              style={{
                filter: isActive ? `drop-shadow(3px 3px 0 #2a1f17)` : undefined,
                cursor: compact ? "default" : "pointer",
              }}
              animate={{ scale: isActive ? 1.02 : 1 }}
              transition={{ duration: dur.fast, ease: ease.standard }}
              onPointerEnter={() => { if (!compact) { setHovered(p.id); onHover?.(p.id); } }}
              onPointerLeave={() => { if (!compact) { setHovered(null); onHover?.(null); } }}
              onPointerDown={() => !compact && handlePointerDown(p.id)}
              onPointerUp={() => !compact && handlePointerUp(p.id)}
            />

            {/* Tamarro head marker */}
            {!compact && (
              <motion.g
                style={{ pointerEvents: "none" }}
                animate={
                  isHovered
                    ? { y: [0, -4, 0], rotate: [-3, 3, -3, 0] }
                    : { y: 0, rotate: 0 }
                }
                transition={
                  isHovered
                    ? { duration: 0.5, ease: "easeInOut" }
                    : { duration: 0.2 }
                }
              >
                <foreignObject
                  x={p.tamarroX - 11}
                  y={p.tamarroY - 11}
                  width={22}
                  height={25}
                >
                  <TamarroHead color={p.color} size={22} />
                </foreignObject>
              </motion.g>
            )}

            {/* Label always visible */}
            {!compact && (
              <text
                x={p.labelX}
                y={p.labelY}
                textAnchor="middle"
                fill={isActive ? "#2a1f17" : "rgba(42,31,23,0.75)"}
                fontSize={isActive ? "9.5" : "8.5"}
                fontFamily="var(--font-caveat), cursive"
                fontWeight={isActive ? "700" : "600"}
                style={{ pointerEvents: "none" }}
              >
                {p.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
