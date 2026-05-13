export const ease = {
  standard: [0.22, 0.61, 0.36, 1] as [number, number, number, number],
  decel: [0.0, 0.0, 0.2, 1] as [number, number, number, number],
  spring: { type: "spring" as const, stiffness: 380, damping: 32, mass: 0.9 },
};

export const dur = { fast: 0.18, base: 0.28, slow: 0.42 };

export const staggerChildren = {
  animate: { transition: { staggerChildren: 0.06 } },
};

export const fadeSlideUp = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: dur.base, ease: ease.decel } },
  exit: { y: -20, opacity: 0, transition: { duration: dur.fast, ease: ease.standard } },
};
