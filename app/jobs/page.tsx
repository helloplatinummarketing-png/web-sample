import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui/primitives";
import { JobBoard } from "@/components/jobs/JobBoard";
import { jobs } from "@/data/jobs";

export const metadata: Metadata = {
  title: "Jobs Abroad",
  description: `Browse ${jobs.length} verified overseas vacancies for Kenyans in the UK, Germany, Canada, Poland, Japan, UAE, Qatar and Australia. Filter by country, sector, skill level and visa type.`,
  alternates: { canonical: "/jobs" },
};

export default function JobsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Job board"
        title="Find your next role abroad"
        intro="Every listing is from a vetted employer, with a written contract and transparent pay. Filter by country, sector, skill level and visa type."
      />
      <Container className="py-12 sm:py-16">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-surface-2" />}>
          <JobBoard />
        </Suspense>
      </Container>
    </>
  );
}
