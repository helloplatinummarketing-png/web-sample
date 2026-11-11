import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Briefcase, Building2, CalendarDays, CheckCircle2, Clock, Gift, ListChecks, MapPin, Stamp, Wallet } from "lucide-react";
import { jobBySlug, jobs } from "@/data/jobs";
import { destinationBySlug } from "@/data/destinations";
import { formatDate } from "@/lib/format";
import { Badge, Container, Flag, btn, card } from "@/components/ui/primitives";
import { JobCard } from "@/components/jobs/JobCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = jobBySlug(slug);
  if (!job) return {};
  const dest = destinationBySlug(job.country);
  return {
    title: `${job.title} in ${job.city}, ${dest?.name}`,
    description: `${job.summary} Salary ${job.salary}. ${job.visaType} visa. Closes ${formatDate(job.closing)}.`,
    alternates: { canonical: `/jobs/${job.slug}` },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = jobBySlug(slug);
  if (!job) notFound();
  const dest = destinationBySlug(job.country);
  const related = jobs.filter((j) => j.slug !== job.slug && (j.country === job.country || j.sector === job.sector)).slice(0, 3);

  const applyHref = `/apply?${new URLSearchParams({
    job: job.slug,
    country: job.country,
    field: job.field,
    visa: job.visaType,
  }).toString()}`;

  const sections = [
    { icon: Briefcase, title: "What you'll do", items: job.responsibilities },
    { icon: ListChecks, title: "Requirements", items: job.requirements },
    { icon: Gift, title: "Benefits", items: job.benefits },
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(40,71,217,0.55),transparent_55%)]" />
        <Container className="py-12 sm:py-16">
          <Link href="/jobs" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-gold">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All jobs
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {dest && <Flag code={dest.flag} name={dest.name} size={40} />}
            <Badge tone={job.skill === "Skilled" ? "royal" : "gold"}>{job.skill}</Badge>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/85">{job.sector}</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">{job.title}</h1>
          <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-white/75">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-gold" aria-hidden="true" /> {job.city}, {dest?.name}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Building2 className="h-4 w-4 text-gold" aria-hidden="true" /> {job.employer}
            </span>
          </p>
        </Container>
      </section>

      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_360px]">
        <div className="space-y-10">
          <div>
            <h2 className="text-xl font-bold text-fg">About the role</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">{job.summary}</p>
          </div>
          {sections.map(({ icon: Icon, title, items }) => (
            <div key={title}>
              <h2 className="flex items-center gap-2.5 text-xl font-bold text-fg">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-royal-50 text-royal dark:bg-royal/20 dark:text-royal-300">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                {title}
              </h2>
              <ul className="mt-4 space-y-3">
                {items.map((it) => (
                  <li key={it} className="flex gap-3 text-fg">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-600 dark:text-gold" aria-hidden="true" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className={`${card} overflow-hidden`}>
            <div className="h-1 bg-gradient-to-r from-gold via-gold-300 to-royal" aria-hidden="true" />
            <dl className="divide-y divide-line">
              {[
                { icon: Wallet, label: "Salary", value: job.salary, sub: job.salaryNote },
                { icon: Stamp, label: "Visa type", value: job.visaType },
                { icon: Briefcase, label: "Contract", value: job.contract },
                { icon: Clock, label: "Hours", value: job.hours },
                { icon: CalendarDays, label: "Closing date", value: formatDate(job.closing) },
              ].map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="relative py-4 pl-[52px] pr-5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                    <Icon className="absolute left-5 top-[18px] h-5 w-5 text-royal dark:text-gold" aria-hidden="true" />
                    {label}
                  </dt>
                  <dd className="mt-0.5 font-semibold text-fg">{value}</dd>
                  {sub && <dd className="text-sm text-muted">{sub}</dd>}
                </div>
              ))}
            </dl>
            <div className="border-t border-line p-5">
              <Link href={applyHref} className={btn("gold", "w-full py-3.5 text-base")}>
                Apply for this job <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <p className="mt-3 text-center text-xs text-muted">Posted {formatDate(job.posted)} · Ref. {job.slug.toUpperCase().slice(0, 12)}</p>
            </div>
          </div>
        </aside>
      </Container>

      {related.length > 0 && (
        <section className="bg-surface-2/60 py-14" aria-labelledby="related-title">
          <Container>
            <h2 id="related-title" className="text-2xl font-bold text-fg">
              Similar roles
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((j) => (
                <li key={j.slug}>
                  <JobCard job={j} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}    </>
  );
}
