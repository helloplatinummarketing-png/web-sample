import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Stamp, Wallet } from "lucide-react";
import type { Job } from "@/data/jobs";
import { destinationBySlug } from "@/data/destinations";
import { formatDate } from "@/lib/format";
import { Badge, Flag, card } from "../ui/primitives";

export function JobCard({ job, headingLevel = "h3" }: { job: Job; headingLevel?: "h2" | "h3" }) {
  const dest = destinationBySlug(job.country);
  const H = headingLevel;
  return (
    <article
      className={`${card} group relative flex h-full flex-col p-5 transition duration-300 hover:-translate-y-1 hover:border-royal/40 hover:shadow-[0_24px_50px_-24px_rgba(11,27,63,0.35)] dark:hover:border-gold/40`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {dest && <Flag code={dest.flag} name={dest.name} size={34} />}
          <div>
            <p className="text-xs font-semibold text-muted">{job.sector}</p>
            <p className="flex items-center gap-1 text-xs text-muted">
              <MapPin className="h-3 w-3" aria-hidden="true" /> {job.city}, {dest?.name}
            </p>
          </div>
        </div>
        <Badge tone={job.skill === "Skilled" ? "royal" : "gold"}>{job.skill}</Badge>
      </div>

      <H className="mt-4 text-lg font-bold leading-snug text-fg">
        <Link href={`/jobs/${job.slug}`} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
          {job.title}
        </Link>
      </H>

      <dl className="mt-4 space-y-2 text-sm">
        <div>
          <dt className="sr-only">Salary</dt>
          <dd className="flex items-center gap-2 font-semibold text-fg">
            <Wallet className="h-4 w-4 shrink-0 text-royal dark:text-gold" aria-hidden="true" />
            {job.salary}
          </dd>
        </div>
        <div>
          <dt className="sr-only">Visa type</dt>
          <dd className="flex items-center gap-2 text-muted">
            <Stamp className="h-4 w-4 shrink-0" aria-hidden="true" />
            {job.visaType}
          </dd>
        </div>
        <div>
          <dt className="sr-only">Closing date</dt>
          <dd className="flex items-center gap-2 text-muted">
            <CalendarDays className="h-4 w-4 shrink-0" aria-hidden="true" />
            Closes {formatDate(job.closing)}
          </dd>
        </div>
      </dl>

      <div className="mt-auto flex items-center justify-between border-t border-line pt-4 text-sm font-semibold text-royal dark:text-gold" aria-hidden="true">
        View details
        <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
      <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 transition group-hover:opacity-100" />
    </article>
  );
}
