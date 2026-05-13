"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import { dur } from "@/lib/motion";

export function StickySOSBar() {
  const [confirming, setConfirming] = useState(false);

  const handleSOS = () => {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    window.location.href = "tel:112";
  };

  return (
    <div
      className="sticky bottom-0 left-0 right-0 z-20 px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-3"
      style={{ background: "linear-gradient(0deg, #f6efe0 60%, transparent)" }}
    >
      <motion.button
        onClick={handleSOS}
        className="w-full flex items-center justify-center gap-2 rounded-[14px] h-[54px] text-[16px] font-extrabold text-paper border-2 border-ink cursor-pointer"
        style={{
          background: "#b14536",
          boxShadow: confirming ? "0 0 0 #2a1f17" : "4px 4px 0 #2a1f17",
        }}
        whileTap={{ scale: 0.97 }}
      >
        <Phone size={17} strokeWidth={2.5} />
        <AnimatePresence mode="wait">
          {confirming ? (
            <motion.span
              key="confirm"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: dur.fast }}
            >
              Confirmar trucada · 112
            </motion.span>
          ) : (
            <motion.span
              key="sos"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: dur.fast }}
            >
              SOS · 112
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
