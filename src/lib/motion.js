// Shared motion language: one easing curve, one entrance, one stagger.
export const ease = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

const stagger = (gap = 0.07, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export const staggerBase = stagger(0.08);
export const staggerHero = stagger(0.09, 0.15);

export const viewportOnce = { once: true, amount: 0.2 };

export const spring = { type: "spring", stiffness: 420, damping: 36 };
