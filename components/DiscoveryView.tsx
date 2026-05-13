"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { ParishId, Parish, Locale } from "@/lib/types";
import { ParishMap } from "@/components/map/ParishMap";
import { ParishPreviewCard } from "@/components/map/ParishPreviewCard";
import { BrandLockup } from "@/components/shell/BrandLockup";
import { LanguageSwitch } from "@/components/shell/LanguageSwitch";
import { GlobalSearch } from "@/components/GlobalSearch";
import { dur, ease } from "@/lib/motion";

interface DiscoveryViewProps {
  parishes: Record<ParishId, Parish>;
  onSelect: (id: ParishId) => void;
  locale: Locale;
  onLocaleChange: (l: Locale) => void;
}

// Staggered entrance sequence
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: dur.slow, ease: ease.decel } },
};

const mapVariants = {
  hidden: { scale: 0.88, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.65, ease: ease.decel, delay: 0.2 },
  },
};

export function DiscoveryView({ parishes, onSelect, locale, onLocaleChange }: DiscoveryViewProps) {
  const [bobbing, setBobbing] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hoveredParish, setHoveredParish] = useState<ParishId | null>(null);

  useEffect(() => {
    const t = setInterval(() => setBobbing((v) => !v), 4000);
    return () => clearInterval(t);
  }, []);

  const handleSelect = (id: ParishId) => {
    setHoveredParish(null);
    onSelect(id);
  };

  return (
    <>
      <motion.div
        key="discovery"
        className="fixed inset-0 flex flex-col"
        style={{
          background:
            "radial-gradient(circle at 12% 8%, rgba(232,116,59,0.10), transparent 35%), radial-gradient(circle at 88% 18%, rgba(74,137,168,0.08), transparent 30%), #f6efe0",
        }}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit={{ opacity: 0, scale: 0.97, transition: { duration: dur.base, ease: ease.standard } }}
      >
        {/* top bar */}
        <motion.div
          variants={fadeUp}
          className="absolute top-0 left-0 right-0 z-10 flex items-start justify-between px-5 pt-[max(18px,env(safe-area-inset-top))]"
        >
          <BrandLockup />
          <div className="flex items-center gap-2">
            {/* search button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="w-11 h-11 rounded-[12px] bg-paper-2 border-2 border-ink flex items-center justify-center cursor-pointer"
              style={{ boxShadow: "3px 3px 0 #2a1f17" }}
              aria-label="Cercar"
            >
              <Search size={17} strokeWidth={2.5} className="text-ink" />
            </button>
            <LanguageSwitch locale={locale} onChange={onLocaleChange} />
          </div>
        </motion.div>

        {/* map */}
        <motion.div
          variants={mapVariants}
          className="absolute inset-0 flex items-center justify-center px-6 pt-28 pb-24"
        >
          <div className="w-full max-w-[420px] aspect-[400/320]">
            <ParishMap
              onSelect={handleSelect}
              onHover={setHoveredParish}
            />
          </div>
        </motion.div>

        {/* parish preview card */}
        <ParishPreviewCard
          parish={hoveredParish ? parishes[hoveredParish] : null}
          locale={locale}
          onSelect={handleSelect}
        />

        {/* hint pill — hidden when preview is showing */}
        <AnimatePresence>
          {!hoveredParish && (
            <motion.div
              className="absolute bottom-[max(36px,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2"
              animate={{ y: bobbing ? -3 : 3 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              initial={{ opacity: 0, y: 16 }}
              exit={{ opacity: 0, y: 8, transition: { duration: dur.fast } }}
            >
              <div
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-ink text-ink whitespace-nowrap"
                style={{
                  background: "#fbf6e8",
                  boxShadow: "3px 3px 0 #2a1f17",
                  fontFamily: "var(--font-caveat), cursive",
                  fontSize: "18px",
                  fontWeight: 700,
                }}
              >
                Toca una parròquia 👇
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* global search overlay */}
      <GlobalSearch
        parishes={parishes}
        locale={locale}
        onSelectParish={handleSelect}
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
