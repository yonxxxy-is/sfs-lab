import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Info, X } from "lucide-react";
import Badge from "./Badge";
import Divider from "./Divider";
import SipimReceipt from "./SipimReceipt";
import { body, button, heading, muted, subheading } from "./tokens";
import { ease, spring } from "../lib/motion";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function Dialog({ project, onClose }) {
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose; // keep the latest callback without re-running the effect

  useEffect(() => {
    const prevFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;

    // Lock page scroll without the layout jump caused by the scrollbar disappearing.
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const t = setTimeout(() => dialogRef.current?.focus(), 20);

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = dialogRef.current.querySelectorAll(FOCUSABLE);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
      prevFocus?.focus?.();
    };
  }, []);

  const sections = [
    project.problem && { title: "Problem", content: <p className={`text-sm leading-relaxed ${body}`}>{project.problem}</p> },
    project.solution && { title: "Solution", content: <p className={`text-sm leading-relaxed ${body}`}>{project.solution}</p> },
    project.keyFeatures?.length > 0 && {
      title: "Key features",
      content: (
        <ul className="space-y-2">
          {project.keyFeatures.map((f) => (
            <li key={f} className={`flex items-start gap-2.5 text-sm ${body}`}>
              <CheckCircle2 size={14} className={`mt-0.5 shrink-0 ${muted}`} aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
      ),
    },
    project.outcomes?.length > 0 && {
      title: "Outcomes",
      content: (
        <ul className="space-y-2">
          {project.outcomes.map((r) => (
            <li key={r} className={`flex items-start gap-2.5 text-sm font-medium ${heading}`}>
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-500" aria-hidden="true" />
              {r}
            </li>
          ))}
        </ul>
      ),
    },
  ].filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <motion.div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
        onClick={() => onCloseRef.current()}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.2 } }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1, transition: { ...spring, opacity: { duration: 0.2, ease } } }}
        exit={{ opacity: 0, y: 16, transition: { duration: 0.15, ease } }}
        className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-xl border border-slate-200 bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 sm:rounded-xl"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-6 py-5 dark:border-slate-800 dark:bg-slate-950">
          <div>
            <p className={subheading}>{project.category}</p>
            <h2 id="modal-title" className={`mt-0.5 text-lg font-bold leading-snug tracking-tight ${heading}`}>
              {project.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onCloseRef.current()}
            className={`${button("ghost", "sm")} mt-0.5 shrink-0 p-1.5!`}
            aria-label="Close dialog"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="px-6 py-6">
          <p className={`text-sm leading-relaxed ${body}`}>{project.overview || project.text}</p>

          {project.preview === "receipt" && <SipimReceipt variant="modal" />}

          {project.image && (
            <img
              src={project.image}
              alt={project.imageAlt ?? project.title}
              width="1200"
              height="480"
              loading="lazy"
              decoding="async"
              className="mt-5 w-full rounded-lg border border-slate-200 bg-white object-contain dark:border-slate-800"
            />
          )}

          {project.note && (
            <p className={`mt-5 flex items-start gap-2.5 rounded-md border border-slate-200 bg-slate-50 px-3.5 py-3 text-[13px] leading-relaxed dark:border-slate-800 dark:bg-slate-900 ${body}`}>
              <Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
              {project.note}
            </p>
          )}

          <div className="mt-6 space-y-5">
            {sections.map((s, i) => (
              <div key={s.title}>
                {i > 0 && <Divider />}
                <div className={i > 0 ? "pt-5" : ""}>
                  <h3 className={`mb-2.5 ${subheading}`}>{s.title}</h3>
                  {s.content}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
            <div className="flex flex-wrap gap-2">
              {project.links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className={button("primary")}>
                  {l.label} <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
            <button type="button" onClick={() => onCloseRef.current()} className={button("secondary")}>
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Rendered in a portal so the dialog is never clipped or re-stacked by page transforms.
export default function CaseStudyModal({ project, onClose }) {
  return createPortal(
    <AnimatePresence>
      {project && <Dialog key={project.id} project={project} onClose={onClose} />}
    </AnimatePresence>,
    document.body
  );
}
