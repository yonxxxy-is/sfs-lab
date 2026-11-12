import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Mail, X } from "lucide-react";
import { button } from "./tokens";

const LABELS = {
  idle: { icon: <Mail size={15} aria-hidden="true" />, text: "Copy email" },
  copied: { icon: <Check size={15} aria-hidden="true" />, text: "Copied" },
  failed: { icon: <X size={15} aria-hidden="true" />, text: "Copy failed" },
};

// The address is never rendered as text or a mailto: link; it is only copied on click.
export default function CopyEmailButton({ email, className = "" }) {
  const [state, setState] = useState("idle");
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const flash = (next) => {
    setState(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2200);
  };

  const handleCopy = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      flash("copied");
    } catch {
      flash("failed");
    }
  };

  const { icon, text } = LABELS[state];

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`${button("secondary")} ${className}`}
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={state}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.12 }}
          className="inline-flex items-center gap-2"
        >
          {icon}
          <span>{text}</span>
          {state === "idle" && <Copy size={12} className="opacity-40" aria-hidden="true" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
