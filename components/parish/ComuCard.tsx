import { ExternalLink, Building2, Phone } from "lucide-react";
import { Parish, Locale } from "@/lib/types";
import { Card } from "@/components/ui/Card";

interface ComuCardProps {
  parish: Parish;
  locale: Locale;
}

export function ComuCard({ parish, locale }: ComuCardProps) {
  const { comu } = parish;

  return (
    <Card>
      <div className="text-[11px] font-mono text-ink-mute tracking-[0.08em] uppercase mb-3">
        Comú
      </div>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-[10px] bg-accent-soft border border-accent-line flex items-center justify-center shrink-0">
          <Building2 size={18} strokeWidth={1.75} className="text-accent" />
        </div>
        <div className="min-w-0">
          <div className="text-[14px] font-semibold text-ink truncate">{comu.name}</div>
          <div className="text-[12px] text-ink-dim mt-0.5 truncate">{comu.address}</div>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <a
          href={comu.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 rounded-full py-2.5 text-[13px] font-medium bg-surface-2 border border-line text-ink"
        >
          <ExternalLink size={14} strokeWidth={1.75} />
          Web oficial
        </a>
        <a
          href={`tel:${comu.phone}`}
          className="flex-1 flex items-center justify-center gap-2 rounded-full py-2.5 text-[13px] font-medium bg-surface-2 border border-line text-ink"
        >
          <Phone size={14} strokeWidth={1.75} />
          Trucar
        </a>
      </div>
    </Card>
  );
}
