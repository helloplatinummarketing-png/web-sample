import { ArrowRight } from "lucide-react";
import { featuredJobs, jobs } from "@/data/jobs";
import { ButtonLink, Container, SectionHeading } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { JobCard } from "../jobs/JobCard";

export function FeaturedJobs() {
  return (
    <section className="bg-surface-2/60 py-20 sm:py-28" aria-labelledby="jobs-title">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            id="jobs-title"
            eyebrow="Featured openings"
            title="Verified roles, hiring now"
            intro="Every vacancy below is from an employer we've vetted, with a written contract and a clear salary."
          />
          <ButtonLink href="/jobs" variant="outline" className="shrink-0">
            View all {jobs.length} jobs <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredJobs.map((j, i) => (
            <Reveal as="li" key={j.slug} delay={(i % 3) * 0.07}>
              <JobCard job={j} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
