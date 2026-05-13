"use client";

import { useState } from "react";
import { Locale } from "@/lib/types";
import { cn } from "@/lib/cn";

const LOCALES: { code: Locale; label: string }[] = [
  { code: "ca", label: "CA" },
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
];

interface LanguageSwitchProps {
  locale: Locale;
  onChange: (locale: Locale) => void;
}

export function LanguageSwitch({ locale, onChange }: LanguageSwitchProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-11 h-11 rounded-[12px] bg-paper-2 border-2 border-ink text-ink font-mono text-[12px] font-bold flex items-center justify-center cursor-pointer"
        style={{ boxShadow: "3px 3px 0 #2a1f17" }}
        aria-label="Canviar idioma"
      >
        {locale.toUpperCase()}
      </button>
      {open && (
        <div
          className="absolute top-13 right-0 bg-paper-2 border-2 border-ink rounded-[14px] overflow-hidden z-50 py-1"
          style={{ boxShadow: "4px 4px 0 #2a1f17" }}
        >
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => { onChange(l.code); setOpen(false); }}
              className={cn(
                "block w-full px-4 py-2 text-left font-mono text-[12px] font-bold cursor-pointer hover:bg-paper",
                l.code === locale ? "text-andy" : "text-ink-soft"
              )}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
