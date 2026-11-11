import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui/primitives";
import { Tracker } from "@/components/track/Tracker";

export const metadata: Metadata = {
  title: "Track Your Application",
  description: "Check the status of your overseas job application with your reference number and phone number.",
  alternates: { canonical: "/track" },
};

export default function TrackPage() {
  return (
    <>
      <PageHeader
        eyebrow="Track application"
        title="Where is my application?"
        intro="Enter the reference number from your confirmation SMS or email, plus the phone number you applied with."
      />
      <Container className="py-12 sm:py-16">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-surface-2" />}>
          <Tracker />
        </Suspense>
      </Container>
    </>
  );
}
