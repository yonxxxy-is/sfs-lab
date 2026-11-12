import { Link } from "react-router-dom";
import { button, heading, muted } from "../components/tokens";
import usePageTitle from "../hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("Page not found");
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center pt-14 text-center">
      <p className="font-mono text-6xl font-bold text-slate-200 dark:text-slate-800" aria-hidden="true">
        404
      </p>
      <h1 className={`mt-4 text-xl font-bold tracking-tight ${heading}`}>Page not found</h1>
      <p className={`mt-2 text-sm ${muted}`}>This page doesn&apos;t exist or has moved.</p>
      <Link to="/" className={`${button("primary")} mt-8`}>
        Back to home
      </Link>
    </div>
  );
}
