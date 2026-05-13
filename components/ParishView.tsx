"use client";

import { motion } from "framer-motion";
import { Parish, Locale } from "@/lib/types";
import { ParishHeader } from "@/components/parish/ParishHeader";
import { QuickActions } from "@/components/parish/QuickActions";
import { EmergencyCard } from "@/components/parish/EmergencyCard";
import { ComuCard } from "@/components/parish/ComuCard";
import { ThingsToDoCarousel } from "@/components/parish/ThingsToDoCarousel";
import { FuelPriceCard } from "@/components/parish/FuelPriceCard";
import { StickySOSBar } from "@/components/parish/StickySOSBar";
import { Chip } from "@/components/ui/Chip";
import { ease, dur } from "@/lib/motion";

interface ParishViewProps {
  parish: Parish;
  locale: Locale;
  onBack: () => void;
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const item = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: dur.base, ease: ease.decel } },
};

export function ParishView({ parish, locale, onBack }: ParishViewProps) {
  return (
    <motion.div
      key={`parish-${parish.id}`}
      className="fixed inset-0 flex flex-col"
      style={{ background: "#0a0a0b" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: dur.base, ease: ease.decel }}
    >
      <ParishHeader parish={parish} locale={locale} onBack={onBack} />

      <div
        className="flex-1 overflow-y-auto"
        style={{ paddingBottom: 80 }}
      >
        <motion.div
          className="px-4 pt-5 flex flex-col gap-5"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* parish name + meta */}
          <motion.div variants={item}>
            <div className="text-[9.5px] text-ink-dim font-mono tracking-[0.06em] uppercase mb-1">
              Parròquia
            </div>
            <div className="text-[28px] font-semibold text-ink tracking-[-0.02em] leading-tight">
              {parish.name[locale]}
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              <Chip>{parish.population.toLocaleString("ca")} hab.</Chip>
              {parish.weather && (
                <Chip live>
                  {parish.weather.temp}°C · {parish.weather.condition}
                </Chip>
              )}
              {parish.capital && (
                <Chip>Capital</Chip>
              )}
            </div>
          </motion.div>

          {/* quick actions */}
          <motion.div variants={item}>
            <QuickActions parish={parish} locale={locale} />
          </motion.div>

          {/* emergency */}
          <motion.div variants={item}>
            <EmergencyCard parish={parish} locale={locale} />
          </motion.div>

          {/* comú */}
          <motion.div variants={item}>
            <ComuCard parish={parish} locale={locale} />
          </motion.div>

          {/* things to do */}
          {parish.thingsToDo?.length > 0 && (
            <motion.div variants={item}>
              <ThingsToDoCarousel parish={parish} locale={locale} />
            </motion.div>
          )}

          {/* fuel */}
          {parish.fuelPrices && (
            <motion.div variants={item}>
              <FuelPriceCard parish={parish} locale={locale} />
            </motion.div>
          )}
        </motion.div>
      </div>

      <StickySOSBar />
    </motion.div>
  );
}
