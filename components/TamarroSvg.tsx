interface TamarroSvgProps {
  color: string;
  size?: number;
  className?: string;
}

export function TamarroSvg({ color, size = 80, className }: TamarroSvgProps) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* ears / horns */}
      <ellipse cx="28" cy="22" rx="11" ry="14" fill={color} stroke="#2a1f17" strokeWidth="2.5" />
      <ellipse cx="72" cy="22" rx="11" ry="14" fill={color} stroke="#2a1f17" strokeWidth="2.5" />
      {/* inner ear */}
      <ellipse cx="28" cy="22" rx="6" ry="8" fill="#2a1f17" opacity="0.18" />
      <ellipse cx="72" cy="22" rx="6" ry="8" fill="#2a1f17" opacity="0.18" />

      {/* body */}
      <rect x="18" y="30" width="64" height="56" rx="22" fill={color} stroke="#2a1f17" strokeWidth="2.5" />

      {/* belly */}
      <ellipse cx="50" cy="62" rx="20" ry="16" fill="#2a1f17" opacity="0.10" />

      {/* eyes */}
      <rect x="30" y="40" width="14" height="12" rx="4" fill="#2a1f17" />
      <rect x="56" y="40" width="14" height="12" rx="4" fill="#2a1f17" />
      {/* eye shine */}
      <circle cx="36" cy="44" r="3" fill="white" />
      <circle cx="62" cy="44" r="3" fill="white" />

      {/* mouth — big smile with teeth */}
      <path d="M 32 62 Q 50 76 68 62" fill="white" stroke="#2a1f17" strokeWidth="2" />
      <path d="M 32 62 Q 50 76 68 62" fill="none" stroke="#2a1f17" strokeWidth="2.5" strokeLinecap="round" />
      {/* teeth */}
      <rect x="39" y="62" width="7" height="7" rx="2" fill="white" stroke="#2a1f17" strokeWidth="1.5" />
      <rect x="48" y="62" width="7" height="7" rx="2" fill="white" stroke="#2a1f17" strokeWidth="1.5" />
      <rect x="57" y="62" width="7" height="7" rx="2" fill="white" stroke="#2a1f17" strokeWidth="1.5" />

      {/* arms */}
      <path d="M 18 55 Q 4 60 8 72" stroke="#2a1f17" strokeWidth="3" strokeLinecap="round" fill="none" />
      <ellipse cx="8" cy="74" rx="5" ry="4" fill={color} stroke="#2a1f17" strokeWidth="2" />
      <path d="M 82 55 Q 96 60 92 72" stroke="#2a1f17" strokeWidth="3" strokeLinecap="round" fill="none" />
      <ellipse cx="92" cy="74" rx="5" ry="4" fill={color} stroke="#2a1f17" strokeWidth="2" />

      {/* legs */}
      <rect x="30" y="82" width="16" height="22" rx="8" fill={color} stroke="#2a1f17" strokeWidth="2.5" />
      <rect x="54" y="82" width="16" height="22" rx="8" fill={color} stroke="#2a1f17" strokeWidth="2.5" />
      {/* feet */}
      <ellipse cx="38" cy="104" rx="10" ry="6" fill={color} stroke="#2a1f17" strokeWidth="2" />
      <ellipse cx="62" cy="104" rx="10" ry="6" fill={color} stroke="#2a1f17" strokeWidth="2" />

      {/* wood grain lines on body */}
      <path d="M 28 38 Q 32 50 28 62" stroke="#2a1f17" strokeWidth="1" opacity="0.12" strokeLinecap="round" />
      <path d="M 72 38 Q 68 50 72 62" stroke="#2a1f17" strokeWidth="1" opacity="0.12" strokeLinecap="round" />
    </svg>
  );
}
