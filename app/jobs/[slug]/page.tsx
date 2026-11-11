import { ArrowLeft, ArrowUpRight, BadgeCheck, CalendarDays, Clock, FileText, MapPin, Stamp, Wallet } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { destinationBySlug } from "@/data/destinations";
import { jobBySlug, jobs } from "@/data/jobs";
import { site } from "@/data/site";
import { formatDate } from "@/lib/format";
import { ButtonLink, Container, Eyebrow, Flag } from "@/components/ui/primitives";

export const generateStaticParams = () => jobs.map((j) => ({ slug: j.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const job = jobBySlug((await params).slug);
  if (!job) return {};
  const d = destinationBySlug(job.country);
  return {
    title: `${job.title}, ${job.city}`,
    description: `${job.title} in ${job.city}, ${d?.country}. ${job.salary}. ${job.summary}`,
    alternates: { canonical: `/jobs/${job.slug}` },
  };
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="glass rounded-2xl p-6">
      <h2 className="font-display text-lg font-bold text-ivory">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-sand/85">
        {items.map((i) => (
          <li key={i} className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" aria-hidden="true" />
            {i}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const job = jobBySlug((await params).slug);
  if (!job) notFound();
  const d = destinationBySlug(job.country)!;
  const facts = [
    { icon: Wallet, label: "Salary", value: job.salary },
    { icon: Stamp, label: "Visa", value: job.visaType },
    { icon: FileText, label: "Contract", value: job.contract },
    { icon: Clock, label: "Hours", value: job.hours },
    { icon: CalendarDays, label: "Closes", value: formatDate(job.closing) },
  ];
  return (
    <main id="main" className="pb-24 pt-28">
      <Container>
        <Link href="/jobs" className="inline-flex items-center gap-1.5 text-sm font-semibold text-jade-300 hover:text-ivory">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All jobs
        </Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <header>
              <Eyebrow>
                {job.sector} · {job.skill}
              </Eyebrow>
              <h1 className="mt-3 text-4xl font-bold leading-tight text-ivory sm:text-5xl">{job.title}</h1>
              <p className="mt-3 flex items-center gap-2 text-sand/80">
                <Flag code={d.flag} name={d.country} size={24} />
                <MapPin className="h-4 w-4" aria-hidden="true" /> {job.city}, {d.country} · {job.employer}
              </p>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-sand/85">{job.summary}</p>
            </header>
            <List title="What you'll do" items={job.responsibilities} />
            <List title="What you need" items={job.requirements} />
            <List title="What the employer offers" items={job.benefits} />
          </div>
          <aside>
            <div className="glass space-y-5 rounded-2xl p-6 lg:sticky lg:top-24">
              <span className="pill">Sample job</span>
              <dl className="space-y-3.5 text-sm">
                {facts.map((f) => (
                  <div key={f.label} className="flex gap-3">
                    <f.icon className="mt-0.5 h-4 w-4 shrink-0 text-coral" aria-hidden="true" />
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-jade-300">{f.label}</dt>
                      <dd className="font-semibold text-ivory">{f.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <ButtonLink href={`/apply?country=${job.country}&job=${job.slug}&field=${job.field}`} className="w-full">
                Apply for this job <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <p className="flex gap-2 text-xs leading-relaxed text-sand/70">
                <BadgeCheck className="h-4 w-4 shrink-0 text-jade-300" aria-hidden="true" />
                {site.licence}. We never charge you for a job offer.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
