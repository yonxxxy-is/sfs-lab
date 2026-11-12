import { ExternalLink } from "lucide-react";
import { profile } from "../data/profile";
import Logo from "./Logo";
import CopyEmailButton from "./CopyEmailButton";
import { button, heading, muted } from "./tokens";

export default function Footer() {
  const { linkedin, github, email } = profile.links;
  return (
    <footer className="mt-28 border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex max-w-4xl flex-col justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center">
        <div>
          <div className={`flex items-center gap-2.5 ${heading}`}>
            <Logo className="h-4 w-auto" />
            <p className="text-sm font-semibold">{profile.name}</p>
          </div>
          <p className={`mt-2 text-xs ${muted}`}>
            Data analytics, IT governance, and business analysis.
          </p>
          <p className={`mt-1 text-xs ${muted}`}>© {new Date().getFullYear()} {profile.name}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CopyEmailButton email={email} />
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className={button("secondary")}>
            LinkedIn <ExternalLink size={13} aria-hidden="true" />
          </a>
          <a href={github} target="_blank" rel="noopener noreferrer" className={button("secondary")}>
            GitHub <ExternalLink size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
