import { heading, muted } from "./tokens";

export default function Section({ title, subtitle, children, className = "" }) {
  return (
    <section className={`mt-20 ${className}`}>
      <div className="mb-7">
        <h2 className={`text-xl font-bold tracking-tight ${heading}`}>{title}</h2>
        {subtitle && <p className={`mt-1 text-sm leading-relaxed ${muted}`}>{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
