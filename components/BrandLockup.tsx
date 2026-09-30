import { asset } from "@/config/site";

type BrandLockupProps = {
  /** "horizontal" is used in the header (Logo option 1); "stacked" in the footer (option 2). */
  layout?: "horizontal" | "stacked";
  /** "dark" artwork for light backgrounds, "light" artwork for dark backgrounds or photography. */
  tone?: "dark" | "light";
  className?: string;
};

/**
 * The Fukuoka Insider master logo (unaltered artwork, transparent background)
 * with REAL ESTATE set as supporting typography — never baked into the logo file.
 */
export function BrandLockup({ layout = "horizontal", tone = "dark", className }: BrandLockupProps) {
  const src = asset(`/images/brand/logo-${tone}.svg`);
  return (
    <span className={["fi-lockup", `fi-lockup--${layout}`, `fi-lockup--${tone}`, className].filter(Boolean).join(" ")}>
      {/* Plain img keeps the vector crisp at every size. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="fi-lockup__logo" src={src} alt="Fukuoka Insider" width={770} height={259} />
      <span className="fi-lockup__rule" aria-hidden="true" />
      <span className="fi-lockup__sub">
        {layout === "stacked"
          ? "REAL ESTATE".split("").map((letter, index) => (
              <span key={index} aria-hidden="true">{letter === " " ? " " : letter}</span>
            ))
          : "REAL ESTATE"}
        {layout === "stacked" ? <span className="fi-visually-hidden">REAL ESTATE</span> : null}
      </span>
    </span>
  );
}
