import Link from "next/link";
import { site } from "@/data/site";

/** Placeholder mark: a globe with a sunrise arc. Replace with the client's logo. */
export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name}, home`}>
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="12" fill="none" stroke="#0e9f6e" strokeWidth="1.5" />
        <ellipse cx="16" cy="16" rx="5" ry="12" fill="none" stroke="#0e9f6e" strokeWidth="1" opacity="0.7" />
        <path d="M4 16h24" stroke="#0e9f6e" strokeWidth="1" opacity="0.7" />
        <path d="M6 22 Q16 4 27 12" fill="none" stroke="#ff6b4a" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="27" cy="12" r="2.4" fill="#ff6b4a" />
      </svg>
      <span className="whitespace-nowrap font-display text-sm font-bold leading-tight text-ivory">
        {site.shortName}
        <span className="block font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-jade-300">Overseas Careers</span>
      </span>
    </Link>
  );
}
