import type { Chapter } from "@/lib/journey-types";
import { Container, Eyebrow } from "../ui/primitives";
import { GlassCard } from "../journey/GlassCard";
import { EligibilityQuiz } from "./EligibilityQuiz";
import { FinalCard } from "./FinalCard";
import { ButtonLink } from "../ui/primitives";

/**
 * A scroll chapter. In 3D mode it's a tall scroll spacer whose content is kept as readable,
 * visually hidden HTML (the globe shows it). In lite mode it renders as a normal timeline.
 */
export function ChapterSection({ chapter: c }: { chapter: Chapter }) {
  const cards = c.kind === "timeline" ? c.nodes.slice(1) : [];
  return (
    <section id={c.id} aria-labelledby={`${c.id}-title`} className="chapter py-20 sm:py-28" style={{ ["--h" as string]: `${c.vh}vh` }}>
      <div className="chapter-a11y">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h2 id={`${c.id}-title`} className="mt-3 text-3xl font-bold leading-tight text-ivory sm:text-5xl">
              {c.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">{c.intro}</p>
          </div>

          {cards.length > 0 && (
            <ol className="relative mt-12 space-y-6 border-l border-jade/40 pl-6 sm:pl-10 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0 lg:border-l-0 lg:pl-0 xl:grid-cols-3">
              {cards.map((n) => (
                <li key={n.id} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[31px] top-6 grid h-3 w-3 place-items-center rounded-full bg-coral ring-4 ring-coral/20 sm:-left-[47px] lg:hidden"
                  />
                  <GlassCard node={n} compact className="h-full" />
                </li>
              ))}
            </ol>
          )}

          {c.kind === "pause" && (
            <div className="only-lite mt-10 max-w-lg">
              <EligibilityQuiz idPrefix="qlite" compact />
            </div>
          )}

          {c.kind === "burst" && (
            <>
              <div className="only-lite mt-10 max-w-xl">
                <FinalCard compact decorative={false} />
              </div>
              <div className="only-3d">
                <ButtonLink href="/apply">Apply Now</ButtonLink>
              </div>
            </>
          )}
        </Container>
      </div>
    </section>
  );
}
