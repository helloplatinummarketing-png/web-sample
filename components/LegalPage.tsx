import type { ReactNode } from "react";
import { PageHeader } from "./PageHeader";
import { Container } from "./ui/primitives";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} intro="Last updated: [DATE]" />
      <Container className="py-12 sm:py-16">
        <article className="mx-auto max-w-3xl">
          <p className="rounded-xl border border-gold/40 bg-gold-50 p-4 text-sm text-fg dark:bg-gold/10">
            Placeholder text for the demo. Have this page reviewed by a qualified Kenyan legal professional before going live.
          </p>
          <div className="mt-10 space-y-8 text-muted [&_a]:font-semibold [&_a]:text-link [&_a]:underline [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-fg [&_li]:leading-relaxed [&_p]:mt-3 [&_p]:leading-relaxed [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
            {children}
          </div>
        </article>
      </Container>
    </>
  );
}
