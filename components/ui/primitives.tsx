import gb from "flag-icons/flags/4x3/gb.svg";
import de from "flag-icons/flags/4x3/de.svg";
import ca from "flag-icons/flags/4x3/ca.svg";
import pl from "flag-icons/flags/4x3/pl.svg";
import jp from "flag-icons/flags/4x3/jp.svg";
import ae from "flag-icons/flags/4x3/ae.svg";
import qa from "flag-icons/flags/4x3/qa.svg";
import au from "flag-icons/flags/4x3/au.svg";
import ke from "flag-icons/flags/4x3/ke.svg";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

type Variant = "primary" | "ghost" | "dark";
const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";
const variants: Record<Variant, string> = {
  primary: "bg-coral text-night-900 shadow-[0_10px_30px_-10px_rgba(255,107,74,0.8)] hover:-translate-y-0.5 hover:bg-coral-300",
  ghost: "border border-jade/60 bg-white/5 text-ivory backdrop-blur hover:border-jade-300 hover:bg-white/10",
  dark: "bg-night-900 text-ivory hover:bg-night-800",
};
export const btn = (variant: Variant = "primary", className = "") => `${base} ${variants[variant]} ${className}`;

export function ButtonLink({ variant = "primary", className, ...props }: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link {...props} className={btn(variant, className)} />;
}

const flags: Record<string, string | { src: string }> = { gb, de, ca, pl, jp, ae, qa, au, ke };

export function Flag({ code, name, size = 24, className = "" }: { code: string; name: string; size?: number; className?: string }) {
  const f = flags[code];
  if (!f) return null;
  const h = Math.round(size * 0.75);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof f === "string" ? f : f.src}
      alt={`Flag of ${name}`}
      width={size}
      height={h}
      loading="lazy"
      decoding="async"
      className={`shrink-0 rounded-[3px] object-cover ring-1 ring-white/20 ${className}`}
      style={{ width: size, height: h }}
    />
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`font-mono text-xs font-semibold uppercase tracking-[0.18em] text-coral-300 ${className}`}>{children}</p>;
}

export function PageHeader({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <header className="relative overflow-hidden pb-14 pt-32 sm:pt-40">
      <Container className="relative">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] text-ivory sm:text-6xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
        {children}
      </Container>
    </header>
  );
}
