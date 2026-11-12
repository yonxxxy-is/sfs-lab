import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import CaseStudyModal from "../components/CaseStudyModal";
import { heading, meta, muted } from "../components/tokens";
import { spring } from "../lib/motion";
import usePageTitle from "../hooks/usePageTitle";

export default function Projects() {
  usePageTitle("Projects");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const closeModal = useCallback(() => setSelectedProject(null), []);

  // Filters come from the data, so a new category appears automatically.
  const categories = useMemo(() => ["All", ...new Set(projects.map((p) => p.category))], []);

  const filtered =
    activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-16">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${heading}`}>Projects</h1>
          <p className={`mt-2 max-w-xl text-sm leading-relaxed ${muted}`}>
            Case studies in data analytics, systems development, IT audit, and business analysis.
          </p>
        </div>
        <p className={`${meta} sm:pb-1`} aria-live="polite">
          {filtered.length} of {projects.length} projects
        </p>
      </div>

      {/* Filters: scrollable on mobile */}
      <div className="-mx-5 mt-8 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <div className="flex min-w-max gap-x-6 border-b border-slate-200 dark:border-slate-800 sm:min-w-0 sm:flex-wrap">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={isActive}
                className={`relative whitespace-nowrap pb-3 text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? "text-slate-900 dark:text-slate-100"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                {cat}
                {isActive && (
                  <motion.span
                    layoutId="filter-indicator"
                    transition={spring}
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-slate-900 dark:bg-slate-100"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <motion.div layout className="relative mt-8 grid gap-5 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} onSelect={setSelectedProject} />
          ))}
        </AnimatePresence>
      </motion.div>

      <CaseStudyModal project={selectedProject} onClose={closeModal} />
    </div>
  );
}
