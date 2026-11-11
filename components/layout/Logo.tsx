import Link from "next/link";
import { site } from "@/data/site";

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-xl bg-navy ring-1 ring-gold/40 dark:bg-navy-800 ${className}`}>
      <svg viewBox="0 0 40 40" className="h-[70%] w-[70%]" aria-hidden="true">
        <circle cx="20" cy="20" r="13" fill="none" stroke="#F5B841" strokeWidth="1.6" />
        <ellipse cx="20" cy="20" rx="6" ry="13" fill="none" stroke="#F5B841" strokeWidth="1.2" opacity=".65" />
        <path d="M7 20h26" stroke="#F5B841" strokeWidth="1.2" opacity=".65" />
        <path d="M14 27c4-9 10-13 18-15" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="12" r="2.6" fill="#F5B841" />
      </svg>
    </span>
  );
}

export function Logo({ invert = false }: { invert?: boolean }) {
  return (
    <Link href="/" className="group flex min-w-0 items-center gap-2.5" aria-label={`${site.name}, home`}>
      <LogoMark />
      <span className="min-w-0 leading-tight">
        <span className={`block truncate font-display text-[15px] font-bold ${invert ? "text-white" : "text-fg"}`}>{site.name}</span>
        <span className={`hidden text-[11px] font-medium sm:block ${invert ? "text-white/60" : "text-muted"}`}>{site.licence}</span>
      </span>
    </Link>
  );
}
