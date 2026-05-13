"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Parish, ParishId, Locale } from "@/lib/types";
import { DiscoveryView } from "@/components/DiscoveryView";
import { ParishView } from "@/components/ParishView";

interface AppShellProps {
  parishes: Record<ParishId, Parish>;
}

export function AppShell({ parishes }: AppShellProps) {
  const [locale, setLocale] = useState<Locale>("ca");
  const [selected, setSelected] = useState<ParishId | null>(null);

  // URL hash sync
  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && hash in parishes) setSelected(hash as ParishId);
      else setSelected(null);
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [parishes]);

  const handleSelect = (id: ParishId) => {
    window.location.hash = id;
    setSelected(id);
  };

  const handleBack = () => {
    window.location.hash = "";
    setSelected(null);
  };

  return (
    <AnimatePresence mode="wait">
      {selected ? (
        <ParishView
          key={selected}
          parish={parishes[selected]}
          locale={locale}
          onBack={handleBack}
        />
      ) : (
        <DiscoveryView
          key="discovery"
          onSelect={handleSelect}
          locale={locale}
          onLocaleChange={setLocale}
        />
      )}
    </AnimatePresence>
  );
}
