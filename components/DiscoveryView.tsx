"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ParishId, Locale } from "@/lib/types";
import { ParishMap } from "@/components/map/ParishMap";
import { BrandLockup } from "@/components/shell/BrandLockup";
import { LanguageSwitch } from "@/components/shell/LanguageSwitch";
import { ease, dur } from "@/lib/motion";

interface DiscoveryViewProps {
  onSelect: (id: ParishId) => void;
  locale: Locale;
  onLocaleChange: (l: Locale) => void;
}

export function DiscoveryView({ onSelect, locale, onLocaleChange }: DiscoveryViewProps) {
  const [bobbing, setBobbing] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setBobbing((v) => !v), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      key="discovery"
      className="fixed inset-0 flex flex-col"
      style={{
        background:
          "radial-gradient(1000px 600px at 70% -5%, oklch(72% 0.16 245 / 0.12), transparent 60%), #0a0a0b",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: dur.base, ease: ease.decel }}
    >
      {/* top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-start justify-between px-5 pt-[max(18px,env(safe-area-inset-top))]">
        <BrandLockup />
        <LanguageSwitch locale={locale} onChange={onLocaleChange} />
      </div>

      {/* map */}
      <div className="absolute inset-0 flex items-center justify-center px-8">
        <div className="w-full max-w-[420px] aspect-[400/320]">
          <ParishMap onSelect={onSelect} />
        </div>
      </div>

      {/* hint pill */}
      <motion.div
        className="absolute bottom-[max(40px,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2"
        animate={{ y: bobbing ? -2 : 2 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-line bg-white/5 backdrop-blur-xl text-[12px] font-medium text-ink whitespace-nowrap">
          Selecciona una parròquia ↑
        </div>
      </motion.div>
    </motion.div>
  );
}
