"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Phone, Building2, MapPin } from "lucide-react";
import { Parish, ParishId, Locale } from "@/lib/types";
import { TamarroSvg } from "@/components/TamarroSvg";
import { dur, ease } from "@/lib/motion";

interface SearchResult {
  type: "parish" | "emergency" | "utility" | "experience" | "comu";
  label: string;
  sublabel?: string;
  parishId: ParishId;
  parishName: string;
  parishColor: string;
  tamarroColor: string;
  action?: string; // tel: or url
  icon: "phone" | "building" | "pin" | "tamarro";
}

interface GlobalSearchProps {
  parishes: Record<ParishId, Parish>;
  locale: Locale;
  onSelectParish: (id: ParishId) => void;
  open: boolean;
  onClose: () => void;
}

function buildIndex(parishes: Record<ParishId, Parish>, locale: Locale): SearchResult[] {
  const results: SearchResult[] = [];

  for (const parish of Object.values(parishes)) {
    // Parish itself
    results.push({
      type: "parish",
      label: parish.name[locale],
      sublabel: parish.slogan?.[locale],
      parishId: parish.id,
      parishName: parish.name[locale],
      parishColor: parish.tamarro.color,
      tamarroColor: parish.tamarro.color,
      icon: "tamarro",
    });

    // Emergency numbers
    for (const c of parish.emergency) {
      results.push({
        type: "emergency",
        label: c.label[locale],
        sublabel: `${parish.name[locale]} · ${c.phone}`,
        parishId: parish.id,
        parishName: parish.name[locale],
        parishColor: parish.tamarro.color,
        tamarroColor: parish.tamarro.color,
        action: `tel:${c.phone}`,
        icon: "phone",
      });
    }

    // Utilities
    for (const u of parish.utilities) {
      results.push({
        type: "utility",
        label: u.label[locale],
        sublabel: `${parish.name[locale]}${u.address ? ` · ${u.address}` : ""}`,
        parishId: parish.id,
        parishName: parish.name[locale],
        parishColor: parish.tamarro.color,
        tamarroColor: parish.tamarro.color,
        action: u.phone ? `tel:${u.phone}` : u.url,
        icon: u.kind === "pharmacy" || u.kind === "hospital" ? "phone" : "pin",
      });
    }

    // Comú
    results.push({
      type: "comu",
      label: parish.comu.name,
      sublabel: `${parish.name[locale]} · ${parish.comu.url}`,
      parishId: parish.id,
      parishName: parish.name[locale],
      parishColor: parish.tamarro.color,
      tamarroColor: parish.tamarro.color,
      action: parish.comu.url,
      icon: "building",
    });

    // Things to do
    for (const exp of parish.thingsToDo) {
      results.push({
        type: "experience",
        label: exp.title[locale],
        sublabel: `${parish.name[locale]} · ${exp.category}`,
        parishId: parish.id,
        parishName: parish.name[locale],
        parishColor: parish.tamarro.color,
        tamarroColor: parish.tamarro.color,
        action: exp.externalUrl,
        icon: "pin",
      });
    }
  }

  return results;
}

const ICON_MAP = {
  phone: Phone,
  building: Building2,
  pin: MapPin,
  tamarro: null,
};

export function GlobalSearch({ parishes, locale, onSelectParish, open, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(() => buildIndex(parishes, locale), [parishes, locale]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [open]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    return index
      .filter((r) => {
        const haystack = `${r.label} ${r.sublabel ?? ""}`.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
        return haystack.includes(q);
      })
      .slice(0, 8);
  }, [query, index]);

  const handleResult = (r: SearchResult) => {
    if (r.type === "parish") {
      onSelectParish(r.parishId);
    } else if (r.action?.startsWith("tel:")) {
      window.location.href = r.action;
    } else if (r.action) {
      window.open(r.action, "_blank", "noopener");
      onSelectParish(r.parishId);
    } else {
      onSelectParish(r.parishId);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* backdrop */}
          <motion.div
            className="fixed inset-0 z-30"
            style={{ background: "rgba(42,31,23,0.4)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dur.fast }}
            onClick={onClose}
          />

          {/* panel */}
          <motion.div
            className="fixed top-0 left-0 right-0 z-40 px-4 pt-[max(16px,env(safe-area-inset-top))]"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: dur.base, ease: ease.decel }}
          >
            {/* search bar */}
            <div
              className="flex items-center gap-3 rounded-[16px] border-2 border-ink px-4 py-3 bg-paper"
              style={{ boxShadow: "4px 4px 0 #2a1f17" }}
            >
              <Search size={18} strokeWidth={2.5} className="text-ink-mute shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busca farmàcia, 110, Caldea..."
                className="flex-1 bg-transparent text-[16px] font-bold text-ink placeholder:text-ink-mute outline-none"
              />
              <button onClick={onClose} className="cursor-pointer text-ink-mute">
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* results */}
            <AnimatePresence>
              {results.length > 0 && (
                <motion.div
                  className="mt-2 rounded-[16px] border-2 border-ink bg-paper overflow-hidden"
                  style={{ boxShadow: "4px 4px 0 #2a1f17" }}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: dur.fast }}
                >
                  {results.map((r, i) => {
                    const Icon = r.icon !== "tamarro" ? ICON_MAP[r.icon] : null;
                    return (
                      <button
                        key={i}
                        onClick={() => handleResult(r)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-paper-2 active:bg-paper-2 border-b border-line-soft last:border-none cursor-pointer transition-colors"
                      >
                        <div
                          className="w-9 h-9 rounded-[10px] border-2 border-ink flex items-center justify-center shrink-0"
                          style={{ background: r.parishColor }}
                        >
                          {r.icon === "tamarro" ? (
                            <TamarroSvg color={r.tamarroColor} size={24} />
                          ) : Icon ? (
                            <Icon size={14} strokeWidth={2.5} className="text-paper" />
                          ) : null}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[14px] font-bold text-ink truncate">{r.label}</div>
                          {r.sublabel && (
                            <div className="text-[11px] font-mono text-ink-mute truncate">{r.sublabel}</div>
                          )}
                        </div>
                        {r.action?.startsWith("tel:") && (
                          <span
                            className="shrink-0 font-mono text-[11px] font-bold text-paper px-2 py-0.5 rounded-full border border-ink"
                            style={{ background: r.parishColor }}
                          >
                            Trucar
                          </span>
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              )}
              {query.trim() && results.length === 0 && (
                <motion.div
                  className="mt-2 rounded-[16px] border-2 border-ink bg-paper px-4 py-4 text-center"
                  style={{ boxShadow: "4px 4px 0 #2a1f17" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div
                    className="text-[18px] text-ink-soft"
                    style={{ fontFamily: "var(--font-caveat), cursive" }}
                  >
                    Res trobat per "{query}" 🤔
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
