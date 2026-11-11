import type { Metadata } from "next";
import { Suspense } from "react";
import { JobBoard } from "@/components/jobs/JobBoard";
import { Container, PageHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Jobs abroad",
  description: "Sample overseas vacancies for Kenyans in the UK, Germany, Canada, Poland, Japan, the UAE, Qatar and Australia.",
  alternates: { canonical: "/jobs" },
};

export default function JobsPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Job board · sample vacancies"
        title={
          <>
            Find your next job <span className="text-coral">abroad.</span>
          </>
        }
        intro="Every role is checked with the employer before it is posted. Filter by country, sector, skill level and visa type."
      />
      <Container className="pb-24">
        <Suspense fallback={<div className="h-96" />}>
          <JobBoard />
        </Suspense>
      </Container>
    </main>
  );
}
