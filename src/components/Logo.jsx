import { motion, useReducedMotion } from "framer-motion";
import { ease } from "../lib/motion";

// "sfs" monogram: four strokes on one grid (s, f stem + crossbar, s).
// Uses currentColor, so it follows the text color in light and dark mode.
const STROKES = [
  "M14 16A5 4 0 1 0 9 20A5 4 0 1 1 4 24",
  "M23 28V9A6 6 0 0 1 29 3",
  "M19 12.5H28",
  "M44 16A5 4 0 1 0 39 20A5 4 0 1 1 34 24",
];

export default function Logo({ className = "h-5 w-auto", animated = false }) {
  const reduce = useReducedMotion();
  const draw = animated && !reduce;

  return (
    <svg
      viewBox="0 0 48 31"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {STROKES.map((d, i) =>
        draw ? (
          <motion.path
            key={d}
            d={d}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 0.5, delay: 0.1 + i * 0.12, ease },
              opacity: { duration: 0.05, delay: 0.1 + i * 0.12 },
            }}
          />
        ) : (
          <path key={d} d={d} />
        )
      )}
    </svg>
  );
}
