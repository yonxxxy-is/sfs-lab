import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile } from "../data/profile";
import Logo from "./Logo";
import { button } from "./tokens";
import { ease, spring } from "../lib/motion";

const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About", end: false },
  { to: "/projects", label: "Projects", end: false },
];

const linkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors duration-150 ${
    isActive
      ? "text-slate-900 dark:text-slate-50"
      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Thin reading-progress line under the header.
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-5 py-3.5" aria-label="Main navigation">
        <Link
          to="/"
          className="text-slate-900 dark:text-slate-50"
          aria-label="Sion Felix Saragih, home"
        >
          <Logo animated className="h-5 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 sm:flex">
          <div className="flex gap-7">
            {NAV.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={linkClass}>
                {({ isActive }) => (
                  <span className="relative inline-block py-1">
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        transition={spring}
                        className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-slate-900 dark:bg-slate-100"
                      />
                    )}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
          <div className="border-l border-slate-200 pl-6 dark:border-slate-800">
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={button("primary", "sm")}
              aria-label="Contact me on LinkedIn"
            >
              Contact <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`${button("ghost", "sm")} size-9 p-0! sm:hidden`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="overflow-hidden border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 sm:hidden"
          >
            <nav className="flex flex-col px-5 pb-5 pt-2" aria-label="Mobile navigation">
              {NAV.map(({ to, label, end }) => (
                <NavLink key={to} to={to} end={end} className={(s) => `${linkClass(s)} py-2.5`}>
                  {label}
                </NavLink>
              ))}
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`${button("primary")} mt-3`}
              >
                Contact on LinkedIn <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-slate-900 dark:bg-slate-100"
      />
    </header>
  );
}
