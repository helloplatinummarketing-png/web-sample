import type { Metadata } from "next";
import { Suspense } from "react";
import { ApplyWizard } from "@/components/forms/ApplyWizard";
import { Container, PageHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Apply online",
  description: "Apply for overseas work in five short steps. A licensed advisor reviews every application personally.",
  alternates: { canonical: "/apply" },
};

export default function ApplyPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Apply online · 5 steps"
        title={
          <>
            Plot your route <span className="text-coral">abroad.</span>
          </>
        }
        intro="One application covers every destination. Watch the line draw from Nairobi to your chosen country as you go."
      />
      <Container className="pb-24">
        <Suspense fallback={<div className="h-96" />}>
          <ApplyWizard />
        </Suspense>
      </Container>
    </main>
  );
}
