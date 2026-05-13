"use client";

import { Phone, Flame, Building2, Share2 } from "lucide-react";
import { Parish, Locale } from "@/lib/types";

interface QuickActionsProps {
  parish: Parish;
  locale: Locale;
}

const QUICK = [
  { key: "police", icon: Phone, label: { ca: "Policia", es: "Policía", en: "Police", fr: "Police" }, phone: "110" },
  { key: "firefighters", icon: Flame, label: { ca: "Bombers", es: "Bomberos", en: "Fire", fr: "Pompiers" }, phone: "118" },
  { key: "comu", icon: Building2, label: { ca: "Comú", es: "Común", en: "Council", fr: "Commun" }, phone: null },
  { key: "share", icon: Share2, label: { ca: "Compartir", es: "Compartir", en: "Share", fr: "Partager" }, phone: null },
] as const;

export function QuickActions({ parish, locale }: QuickActionsProps) {
  const handleAction = async (key: string, phone: string | null) => {
    if (key === "comu") {
      window.open(parish.comu.url, "_blank", "noopener");
      return;
    }
    if (key === "share") {
      const url = `${window.location.origin}/#${parish.id}`;
      if (navigator.share) {
        await navigator.share({ title: parish.name[locale], url });
      } else {
        await navigator.clipboard.writeText(url);
      }
      return;
    }
    if (phone) window.location.href = `tel:${phone}`;
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      {QUICK.map(({ key, icon: Icon, label, phone }) => (
        <button
          key={key}
          onClick={() => handleAction(key, phone)}
          className="flex flex-col justify-between aspect-square rounded-[14px] bg-surface-2 border border-line p-2.5 cursor-pointer active:scale-95 transition-transform"
        >
          <div className="w-6 h-6 rounded-[8px] bg-accent-soft border border-accent-line flex items-center justify-center">
            <Icon size={13} strokeWidth={1.75} className="text-accent" />
          </div>
          <div className="text-[10px] text-ink-dim leading-tight">
            {label[locale]}
            {phone && <div className="text-ink font-mono">{phone}</div>}
          </div>
        </button>
      ))}
    </div>
  );
}
