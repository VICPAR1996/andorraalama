export function BrandLockup() {
  return (
    <div className="select-none">
      <div className="text-[28px] font-extrabold text-ink leading-none tracking-tight">
        Andorra{" "}
        <span className="text-andy">a&nbsp;la</span>
      </div>
      <div
        className="text-[32px] text-ink-soft leading-none mt-0.5 rotate-[-1.5deg] inline-block"
        style={{ fontFamily: "var(--font-caveat), cursive", fontWeight: 700 }}
      >
        mà 👋
      </div>
      <div className="text-[11px] font-mono text-ink-mute tracking-wide mt-2 leading-snug max-w-[160px]">
        Tot el país, en un tap.
      </div>
    </div>
  );
}
