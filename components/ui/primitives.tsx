import Link from "next/link";
import gb from "flag-icons/flags/4x3/gb.svg";
import de from "flag-icons/flags/4x3/de.svg";
import ca from "flag-icons/flags/4x3/ca.svg";
import pl from "flag-icons/flags/4x3/pl.svg";
import jp from "flag-icons/flags/4x3/jp.svg";
import ae from "flag-icons/flags/4x3/ae.svg";
import qa from "flag-icons/flags/4x3/qa.svg";
import au from "flag-icons/flags/4x3/au.svg";
import ke from "flag-icons/flags/4x3/ke.svg";
import type { ComponentProps, ReactNode } from "react";
import { Reveal } from "./Reveal";

/* ── Container ─────────────────────────────────────────────── */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

/* ── Buttons ───────────────────────────────────────────────── */
type Variant = "gold" | "primary" | "outline" | "ghost" | "light";
const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 whitespace-nowrap";
const variants: Record<Variant, string> = {
  gold: "bg-gold text-navy shadow-lg shadow-gold/25 hover:bg-gold-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold/30",
  primary:
    "bg-navy text-white shadow-lg shadow-navy/20 hover:bg-navy-800 hover:-translate-y-0.5 dark:bg-royal dark:hover:bg-royal-400",
  outline:
    "border border-line bg-surface text-fg hover:-translate-y-0.5 hover:border-royal hover:text-royal dark:hover:border-gold dark:hover:text-gold",
  ghost: "text-fg hover:bg-surface-2",
  light: "bg-white text-navy shadow-lg hover:-translate-y-0.5 hover:bg-gold-50",
};
export const btn = (variant: Variant = "primary", className = "") => `${base} ${variants[variant]} ${className}`;

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link {...props} className={btn(variant, className)} />;
}

/* ── Section heading with thin gold rule ───────────────────── */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  id,
  invert = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "left";
  id?: string;
  invert?: boolean;
}) {
  const center = align === "center";
  return (
    <Reveal className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
          <span className="gold-rule" aria-hidden="true" />
          <p className={`text-xs font-bold uppercase tracking-[0.2em] ${invert ? "text-gold" : "text-royal dark:text-gold"}`}>
            {eyebrow}
          </p>
          {center && <span className="gold-rule rotate-180" aria-hidden="true" />}
        </div>
      )}
      <h2
        id={id}
        className={`mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem] ${invert ? "text-white" : "text-fg"}`}
      >
        {title}
      </h2>
      {intro && <p className={`mt-4 text-lg leading-relaxed ${invert ? "text-royal-300" : "text-muted"}`}>{intro}</p>}
    </Reveal>
  );
}

/* ── Flag ──────────────────────────────────────────────────── */
// Self-hosted SVG flags (flag-icons, MIT): same-origin, ~1KB each, crisp at any size.
const flags: Record<string, string | { src: string }> = { gb, de, ca, pl, jp, ae, qa, au, ke };

export function Flag({ code, name, size = 28, className = "" }: { code: string; name: string; size?: number; className?: string }) {
  const h = Math.round(size * 0.75);
  const f = flags[code];
  if (!f) return null;
  return (
    <img
      src={typeof f === "string" ? f : f.src}
      alt={`Flag of ${name}`}
      width={size}
      height={h}
      loading="lazy"
      decoding="async"
      className={`shrink-0 rounded-[4px] object-cover shadow-sm ring-1 ring-black/10 ${className}`}
      style={{ width: size, height: h }}
    />
  );
}

/* ── Badge ─────────────────────────────────────────────────── */
export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "gold" | "royal" | "success" }) {
  const tones = {
    neutral: "bg-surface-2 text-fg",
    gold: "bg-gold-50 text-[#7a5200] ring-1 ring-gold/40 dark:bg-gold/15 dark:text-gold",
    royal: "bg-royal-50 text-royal dark:bg-royal/25 dark:text-royal-300",
    success: "bg-success/10 text-success dark:text-green-400",
  };
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

/* ── Card ──────────────────────────────────────────────────── */
export const card =
  "rounded-2xl border border-line bg-surface shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(11,27,63,0.12)]";
