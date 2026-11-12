import { lazy, Suspense, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";
import CopyEmailButton from "../components/CopyEmailButton";
import { Reveal, RevealGroup, RevealItem } from "../components/Reveal";
import { body, button, card, heading, muted, subheading } from "../components/tokens";
import { iconMap } from "../lib/icons";
import { fadeUp, staggerHero } from "../lib/motion";
import usePageTitle from "../hooks/usePageTitle";

const CaseStudyModal = lazy(() => import("../components/CaseStudyModal"));

export default function Home() {
  usePageTitle();
  const [selectedProject, setSelectedProject] = useState(null);
  const closeModal = useCallback(() => setSelectedProject(null), []);
  const featured = projects.filter((p) => p.featured);

  return (
    <div>
      {/* Hero: the one orchestrated entrance on the site */}
      <motion.section
        variants={staggerHero}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-xl flex-col items-center pt-16 text-center sm:pt-20"
      >
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 dark:border-slate-800"
        >
          <span className="size-1.5 rounded-full bg-slate-900 dark:bg-slate-100" aria-hidden="true" />
          <span className={`text-xs font-medium ${body}`}>{profile.status}</span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className={`mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl ${heading}`}
        >
          {profile.headline}
        </motion.h1>

        <motion.p variants={fadeUp} className={`mt-3 text-base font-medium sm:text-lg ${body}`}>
          {profile.subheadline}
        </motion.p>

        <motion.p variants={fadeUp} className={`mt-3 text-sm leading-relaxed sm:text-base ${muted}`}>
          {profile.description}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link to="/projects" className={button("primary")}>
            View projects <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <a href={profile.links.cv} download className={button("secondary")}>
            <Download size={15} aria-hidden="true" /> Download CV
          </a>
          <CopyEmailButton email={profile.links.email} />
        </motion.div>

        <motion.dl
          variants={fadeUp}
          className="mt-10 grid w-full grid-cols-3 gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800"
        >
          {profile.metrics.map((m) => (
            <div key={m.label} className="flex flex-col items-center justify-center bg-white px-3 py-5 dark:bg-slate-900">
              <dd className={`font-mono text-xl font-bold sm:text-2xl ${heading}`}>{m.value}</dd>
              <dt className={`mt-1 px-1 text-center text-xs leading-tight ${muted}`}>{m.label}</dt>
            </div>
          ))}
        </motion.dl>
      </motion.section>

      {/* What I do */}
      <Section
        title="What I do"
        subtitle="Where data, business processes, and information security meet."
      >
        <RevealGroup className="grid gap-4 sm:grid-cols-3">
          {profile.pillars.map((p) => {
            const Icon = iconMap[p.icon] ?? iconMap.Workflow;
            return (
              <RevealItem key={p.title} className={card}>
                <div className="mb-3 flex size-8 items-center justify-center rounded-md border border-slate-200 dark:border-slate-800">
                  <Icon className={`size-4 ${muted}`} aria-hidden="true" />
                </div>
                <h3 className={`text-sm font-semibold ${heading}`}>{p.title}</h3>
                <p className={`mt-1.5 text-sm leading-relaxed ${muted}`}>{p.text}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      {/* Featured projects */}
      <Section
        title="Featured projects"
        subtitle="Selected work in data analytics, systems development, and IT audit."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} onSelect={setSelectedProject} />
          ))}
        </div>
        <div className="mt-6">
          <Link to="/projects" className={`${button("ghost", "sm")} -ml-3`}>
            View all {projects.length} projects <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </Section>

      {/* Leadership */}
      <Reveal className="mt-20 rounded-lg border border-slate-200 bg-slate-50 p-7 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <p className={subheading}>Leadership and community</p>
        <h2 className={`mt-2 text-xl font-bold tracking-tight ${heading}`}>{profile.banner.title}</h2>
        <p className={`mt-2 max-w-xl text-sm leading-relaxed ${body}`}>{profile.banner.text}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link to="/about" className={button("primary")}>
            View experience
          </Link>
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className={button("secondary")}>
            Connect on LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </Reveal>

      {selectedProject && (
        <Suspense fallback={null}>
          <CaseStudyModal project={selectedProject} onClose={closeModal} />
        </Suspense>
      )}
    </div>
  );
}
