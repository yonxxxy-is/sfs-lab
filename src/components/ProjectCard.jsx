import { forwardRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Eye, Github } from "lucide-react";
import Badge from "./Badge";
import SipimReceipt from "./SipimReceipt";
import { button, heading, muted, subheading } from "./tokens";
import { categoryIcon } from "../lib/icons";
import { ease, spring } from "../lib/motion";

function Preview({ p }) {
  if (p.preview === "receipt") return <SipimReceipt variant="card" />;

  if (p.image) {
    return (
      <img
        src={p.image}
        alt={p.imageAlt ?? p.title}
        width="800"
        height="450"
        loading="lazy"
        decoding="async"
        className="aspect-video w-full bg-white object-contain"
      />
    );
  }

  const Icon = categoryIcon[p.category];
  return (
    <div
      aria-hidden="true"
      className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-slate-900 dark:bg-slate-800"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#ffffff08_1px,_transparent_1px)] [background-size:20px_20px]" />
      {Icon && <Icon className="relative size-10 text-slate-500" strokeWidth={1.25} />}
    </div>
  );
}

// forwardRef is required so AnimatePresence (popLayout) can measure the card.
const ProjectCard = forwardRef(function ProjectCard({ p, onSelect, index = 0 }, ref) {
  return (
    <motion.article
      ref={ref}
      layout="position"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease, delay: (index % 2) * 0.06 },
      }}
      whileHover={{ y: -2, transition: spring }}
      viewport={{ once: true, amount: 0.15 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ layout: { duration: 0.3, ease } }}
      className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-colors duration-150 hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-600"
    >
      <Preview p={p} />

      <div className="flex flex-1 flex-col p-5">
        <p className={subheading}>{p.category}</p>
        <h3 className={`mt-1.5 text-base font-semibold leading-snug tracking-tight ${heading}`}>
          {p.title}
        </h3>
        <p className={`mt-2 line-clamp-3 text-sm leading-relaxed ${muted}`}>{p.text}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.slice(0, 4).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
          {p.tags.length > 4 && <Badge>+{p.tags.length - 4}</Badge>}
        </div>

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
            <button
              type="button"
              onClick={() => onSelect(p)}
              className={button("secondary", "sm")}
              aria-haspopup="dialog"
            >
              <Eye size={13} aria-hidden="true" /> Case study
            </button>
            {p.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className={button("ghost", "sm")}
              >
                {l.type === "github" && <Github size={13} aria-hidden="true" />}
                {l.label}
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
});

export default ProjectCard;
