"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import { ease, dur } from "@/lib/motion";

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
      className="sticky bottom-0 left-0 right-0 z-20 px-3.5 pb-[max(16px,env(safe-area-inset-bottom))] pt-3"
      style={{
        background: "linear-gradient(0deg, #0a0a0b 60%, transparent)",
      }}
    >
      <div className="flex gap-2">
        <motion.button
          onClick={handleSOS}
          className="flex-1 flex items-center justify-center gap-2 rounded-full h-[52px] text-[15px] font-semibold text-white cursor-pointer"
          style={{
            background: "var(--danger)",
            boxShadow: "0 8px 30px -10px oklch(70% 0.18 25 / 0.6)",
          }}
          whileTap={{ scale: 0.96 }}
          animate={confirming ? { boxShadow: ["0 8px 30px -10px oklch(70% 0.18 25 / 0.6)", "0 8px 40px -6px oklch(70% 0.18 25 / 0.9)", "0 8px 30px -10px oklch(70% 0.18 25 / 0.6)"] } : {}}
          transition={confirming ? { duration: 0.6, repeat: Infinity } : {}}
        >
          <Phone size={16} strokeWidth={2} />
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
    </div>
  );
}
