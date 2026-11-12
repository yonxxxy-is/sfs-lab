import { ExternalLink } from "lucide-react";
import { profile } from "../data/profile";
import Section from "../components/Section";
import Badge from "../components/Badge";
import Divider from "../components/Divider";
import { RevealGroup, RevealItem } from "../components/Reveal";
import { body, card, heading, meta, muted, subheading } from "../components/tokens";
import usePageTitle from "../hooks/usePageTitle";

export default function About() {
  usePageTitle("About");
  const { education: e, skills, experience, highlights } = profile;

  return (
    <div className="pt-16">
      <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${heading}`}>About</h1>
      <p className={`mt-2 max-w-xl text-sm leading-relaxed ${muted}`}>
        Education, skills, certifications, and experience.
      </p>

      <RevealGroup className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {highlights.map((h) => (
          <RevealItem key={h.label} className={`${card} flex flex-col gap-1`}>
            <span className={`text-xs ${muted}`}>{h.issuer}</span>
            <span className={`text-sm font-semibold ${heading}`}>{h.label}</span>
            <span className={`${meta} w-fit`}>{h.tag}</span>
          </RevealItem>
        ))}
      </RevealGroup>

      <Section title="Education and certifications">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[1.2fr_1fr]">
          <div className={card}>
            <div className="flex items-start justify-between gap-3">
              <h3 className={`text-base font-bold ${heading}`}>{e.school}</h3>
              <Badge>Bachelor&apos;s</Badge>
            </div>
            <p className={`mt-1 text-sm ${body}`}>{e.degree}</p>
            <p className={`mt-1 ${meta}`}>
              GPA {e.gpa}, {e.period}
            </p>
            <div className="mt-4">
              <Divider />
            </div>
            <p className={`mb-2 mt-4 ${subheading}`}>Core coursework</p>
            <div className="flex flex-wrap gap-1.5">
              {e.coursework.map((c) => (
                <Badge key={c}>{c}</Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className={subheading}>Certifications</p>
            {e.certs.map((cert) => (
              <div key={cert.name} className={`${card} flex items-start justify-between gap-3`}>
                <div>
                  <p className={`text-sm font-semibold ${heading}`}>{cert.name}</p>
                  <p className={`mt-0.5 text-xs ${muted}`}>
                    {cert.issuer}, {cert.year}
                  </p>
                </div>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    aria-label={`Verify ${cert.name} credential`}
                  >
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Skills">
        <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Object.entries(skills).map(([group, items]) => (
            <RevealItem key={group} className={card}>
              <h3 className={`mb-3 text-sm font-semibold ${heading}`}>{group}</h3>
              <div className="flex flex-wrap gap-1.5">
                {items.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section title="Experience and leadership">
        <RevealGroup className="space-y-4">
          {experience.map((x) => (
            <RevealItem key={`${x.role}-${x.org}`} className={card}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className={`font-semibold ${heading}`}>{x.role}</h3>
                {x.period && <span className={meta}>{x.period}</span>}
              </div>
              <p className={`mt-0.5 text-sm ${muted}`}>{x.org}</p>
              <p className={`mt-3 text-sm leading-relaxed ${body}`}>{x.text}</p>
              {x.photos?.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {x.photos.slice(0, 4).map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${x.role} at ${x.org}`}
                      width="400"
                      height="300"
                      loading="lazy"
                      className="aspect-[4/3] w-full rounded-md object-cover"
                    />
                  ))}
                </div>
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
    </div>
  );
}
