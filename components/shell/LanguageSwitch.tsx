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
        className="w-11 h-11 rounded-[14px] bg-surface-2 border border-line text-ink-dim font-mono text-[12px] flex items-center justify-center cursor-pointer"
        aria-label="Canviar idioma"
      >
        {locale.toUpperCase()}
      </button>
      {open && (
        <div className="absolute top-12 right-0 bg-surface border border-line rounded-[14px] overflow-hidden z-50 py-1">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => { onChange(l.code); setOpen(false); }}
              className={cn(
                "block w-full px-4 py-2 text-left font-mono text-[12px] cursor-pointer hover:bg-surface-2",
                l.code === locale ? "text-accent" : "text-ink-dim"
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
