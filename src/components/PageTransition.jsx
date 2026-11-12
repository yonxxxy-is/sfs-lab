import { motion } from "framer-motion";
import { ease } from "../lib/motion";

// Opacity only: the page's own entrance (hero stagger, card reveals) supplies the movement.
export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, ease } }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
    >
      {children}
    </motion.div>
  );
}
