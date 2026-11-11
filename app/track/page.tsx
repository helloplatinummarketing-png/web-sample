import type { Metadata } from "next";
import { Suspense } from "react";
import { Tracker } from "@/components/track/Tracker";
import { Container, PageHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Track your application",
  description: "Enter your reference number and phone to see where your application is on its journey.",
  alternates: { canonical: "/track" },
};

export default function TrackPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Application tracker"
        title={
          <>
            Where is my <span className="text-coral">application?</span>
          </>
        }
        intro="Enter the reference from your boarding pass and the phone number you applied with."
      />
      <Container className="pb-24">
        <Suspense fallback={<div className="h-64" />}>
          <Tracker />
        </Suspense>
      </Container>
    </main>
  );
}
