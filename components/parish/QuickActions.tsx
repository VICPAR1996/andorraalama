"use client";

import { Phone, Flame, Building2, Share2 } from "lucide-react";
import { Parish, Locale } from "@/lib/types";

interface QuickActionsProps {
  parish: Parish;
  locale: Locale;
}

export function QuickActions({ parish, locale }: QuickActionsProps) {
  const color = parish.tamarro.color;

  const tiles = [
    { key: "police", icon: Phone, label: { ca: "Policia", es: "Policía", en: "Police", fr: "Police" }, sub: "110", bg: color },
    { key: "firefighters", icon: Flame, label: { ca: "Bombers", es: "Bomberos", en: "Fire", fr: "Pompiers" }, sub: "118", bg: "#b14536" },
    { key: "comu", icon: Building2, label: { ca: "Comú", es: "Común", en: "Council", fr: "Commun" }, sub: ".ad", bg: "#4a89a8" },
    { key: "share", icon: Share2, label: { ca: "Compartir", es: "Compartir", en: "Share", fr: "Partager" }, sub: null, bg: "#8e6db5" },
  ] as const;

  const handleAction = async (key: string) => {
    if (key === "police") { window.location.href = "tel:110"; return; }
    if (key === "firefighters") { window.location.href = "tel:118"; return; }
    if (key === "comu") { window.open(parish.comu.url, "_blank", "noopener"); return; }
    if (key === "share") {
      const url = `${window.location.origin}/#${parish.id}`;
      if (navigator.share) await navigator.share({ title: parish.name[locale], url });
      else await navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-2.5">
      {tiles.map(({ key, icon: Icon, label, sub, bg }) => (
        <button
          key={key}
          onClick={() => handleAction(key)}
          className="flex flex-col justify-between aspect-square rounded-[14px] border-2 border-ink p-2.5 cursor-pointer active:translate-x-[2px] active:translate-y-[2px] transition-transform"
          style={{ background: bg, boxShadow: "3px 3px 0 #2a1f17" }}
        >
          <div className="w-6 h-6 rounded-[7px] bg-paper border-2 border-ink flex items-center justify-center">
            <Icon size={12} strokeWidth={2.5} style={{ color: bg }} />
          </div>
          <div className="text-[10px] font-bold text-paper leading-tight">
            {label[locale]}
            {sub && <div className="font-mono text-paper opacity-80">{sub}</div>}
          </div>
        </button>
      ))}
    </div>
  );
}
