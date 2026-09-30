import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { href?: string; label: string };

/**
 * Interior page opening: breadcrumb, serif H1 (lines split on "\n" so headings break where authored; "|" marks an optional break for narrow screens),
 * lead paragraph and an optional aside. Paper background, no dark banner.
 */
export function PageHero({ title, lead, crumbs, aside, id = "page-title", className }: { title: string; lead?: string; crumbs?: Crumb[]; aside?: ReactNode; id?: string; className?: string }) {
  return (
    <section className={["fi-page-hero", className].filter(Boolean).join(" ")} aria-labelledby={id}>
      <div className="fi-shell fi-page-hero__grid">
        <div className="fi-page-hero__copy">
          {crumbs?.length ? (
            <nav className="fi-breadcrumb" aria-label="Breadcrumb">
              <ol>
                {crumbs.map((crumb) => (
                  <li key={crumb.label} aria-current={crumb.href ? undefined : "page"}>
                    {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : crumb.label}
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          <h1 className="fi-page-hero__title" id={id}>
            {title.split("\n").map((line) => (
              <span className="fi-line" key={line}><span>{line.split("|").flatMap((part, index) => (index ? [<wbr key={index} />, part] : [part]))}</span></span>
            ))}
          </h1>
          {lead ? <p className="fi-page-hero__lead">{lead}</p> : null}
        </div>
        {aside ? <div className="fi-page-hero__aside">{aside}</div> : null}
      </div>
    </section>
  );
}
