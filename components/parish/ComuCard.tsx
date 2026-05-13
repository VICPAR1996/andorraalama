import { ExternalLink, Phone } from "lucide-react";
import { Parish, Locale } from "@/lib/types";

interface ComuCardProps {
  parish: Parish;
  locale: Locale;
}

export function ComuCard({ parish, locale }: ComuCardProps) {
  const { comu, tamarro } = parish;

  return (
    <div
      className="bg-paper-2 border-2 border-ink rounded-[22px] p-4"
      style={{ boxShadow: "5px 5px 0 #2a1f17" }}
    >
      <div className="text-[11px] font-mono text-ink-mute tracking-[0.08em] uppercase mb-3">
        Comú
      </div>
      <div className="flex items-start gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-[12px] border-2 border-ink flex items-center justify-center shrink-0 text-[22px]"
          style={{ background: tamarro.color }}
        >
          🏛️
        </div>
        <div className="min-w-0">
          <div className="text-[14px] font-bold text-ink truncate">{comu.name}</div>
          <div className="text-[12px] text-ink-soft mt-0.5 truncate">{comu.address}</div>
        </div>
      </div>
      <div className="flex gap-2">
        <a
          href={comu.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 rounded-[12px] py-2.5 text-[13px] font-bold border-2 border-ink text-paper active:translate-x-[1px] active:translate-y-[1px] transition-transform"
          style={{ background: tamarro.color, boxShadow: "3px 3px 0 #2a1f17" }}
        >
          <ExternalLink size={14} strokeWidth={2.5} />
          Web oficial
        </a>
        <a
          href={`tel:${comu.phone}`}
          className="flex-1 flex items-center justify-center gap-2 rounded-[12px] py-2.5 text-[13px] font-bold border-2 border-ink bg-paper text-ink active:translate-x-[1px] active:translate-y-[1px] transition-transform"
          style={{ boxShadow: "3px 3px 0 #2a1f17" }}
        >
          <Phone size={14} strokeWidth={2.5} />
          Trucar
        </a>
      </div>
    </div>
  );
}
