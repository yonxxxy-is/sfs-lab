import { motion } from "framer-motion";
import { fadeUp, staggerBase, viewportOnce } from "../lib/motion";

// Single element that fades up once when it scrolls into view.
export function Reveal({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}

// Container that staggers its <RevealItem> children when it scrolls into view.
export function RevealGroup({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={staggerBase}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className = "" }) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
