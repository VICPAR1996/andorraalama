"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ParishId, Locale } from "@/lib/types";
import { ParishMap } from "@/components/map/ParishMap";
import { BrandLockup } from "@/components/shell/BrandLockup";
import { LanguageSwitch } from "@/components/shell/LanguageSwitch";
import { dur, ease } from "@/lib/motion";

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
          "radial-gradient(circle at 12% 8%, rgba(232,116,59,0.10), transparent 35%), radial-gradient(circle at 88% 18%, rgba(74,137,168,0.08), transparent 30%), #f6efe0",
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
      <div className="absolute inset-0 flex items-center justify-center px-6 pt-28 pb-20">
        <div className="w-full max-w-[420px] aspect-[400/320]">
          <ParishMap onSelect={onSelect} />
        </div>
      </div>

      {/* hint pill */}
      <motion.div
        className="absolute bottom-[max(36px,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2"
        animate={{ y: bobbing ? -3 : 3 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      >
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-ink text-[13px] font-bold text-ink whitespace-nowrap"
          style={{
            background: "#fbf6e8",
            boxShadow: "3px 3px 0 #2a1f17",
            fontFamily: "var(--font-caveat), cursive",
            fontSize: "18px",
          }}
        >
          Toca una parròquia 👇
        </div>
      </motion.div>
    </motion.div>
  );
}
