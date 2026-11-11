import type { ReactNode } from "react";
import { Container, PageHeader } from "./ui/primitives";

export function LegalPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <main id="main">
      <PageHeader eyebrow={eyebrow} title={title} intro={intro} />
      <div className="section-light">
        <Container className="py-16 sm:py-20">
          <div className="max-w-3xl space-y-8 text-base leading-relaxed text-muted [&_a]:font-semibold [&_a]:text-jade-700 [&_a]:underline [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-fg [&_li]:ml-5 [&_li]:list-disc [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:space-y-1.5">
            {children}
          </div>
        </Container>
      </div>
    </main>
  );
}
