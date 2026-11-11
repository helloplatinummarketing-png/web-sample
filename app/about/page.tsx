import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, CalendarCheck, FileBadge2, HeartHandshake, MapPin, ShieldCheck, Target } from "lucide-react";
import { aboutStory, team } from "@/data/content";
import { images, site } from "@/data/site";
import { PageHeader } from "@/components/PageHeader";
import { Container, SectionHeading, card } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About Us",
  description: `Our story, mission and team. ${site.name} is an NEA-licensed recruitment agency helping Kenyans build global careers safely.`,
  alternates: { canonical: "/about" },
};

const valueIcons = [ShieldCheck, BadgeCheck, HeartHandshake];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About us" title={aboutStory.heading} intro="Licensed, transparent and proudly Kenyan. Here's who we are and why we do this work." />

      {/* Story + office photo */}
      <Container className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-2xl shadow-navy/20">
            <Image src={images.office} alt="Our advisors in a team meeting at the Nairobi office" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 shadow-xl">
            <MapPin className="h-5 w-5 text-royal dark:text-gold" aria-hidden="true" />
            <span className="text-sm">
              <span className="block font-semibold text-fg">Nairobi office</span>
              <span className="text-xs text-muted">Walk-ins welcome during office hours</span>
            </span>
          </div>
        </Reveal>
        <div>
          <SectionHeading align="left" eyebrow="Our story" title="Why we started" />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            {aboutStory.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </Container>

      {/* Mission + values */}
      <section className="bg-navy py-16 text-white sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold text-navy">
              <Target className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="mt-6 text-3xl font-bold sm:text-4xl">Our mission</h2>
            <p className="mt-4 text-xl leading-relaxed text-white/80">{aboutStory.mission}</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3">
            {aboutStory.values.map((v, i) => {
              const Icon = valueIcons[i] ?? ShieldCheck;
              return (
                <Reveal as="li" key={v.title} delay={i * 0.08} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Icon className="h-6 w-6 text-gold" aria-hidden="true" />
                  <h3 className="mt-4 font-semibold">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">{v.body}</p>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-24" aria-labelledby="team-title">
        <Container>
          <SectionHeading id="team-title" eyebrow="Our team" title="The people behind your journey" intro="Experienced advisors who answer the phone, before and after you travel." />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal as="li" key={m.role} delay={i * 0.07} className={`${card} p-6 text-center`}>
                <span
                  className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-navy to-royal font-display text-2xl font-bold text-gold ring-4 ring-gold/30"
                  aria-hidden="true"
                >
                  {m.initials}
                </span>
                <h3 className="mt-5 font-semibold text-fg">{m.name}</h3>
                <p className="text-sm font-medium text-royal dark:text-gold">{m.role}</p>
                <p className="mt-2 text-sm text-muted">{m.bio}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Licence details */}
      <section className="pb-6" aria-labelledby="licence-title">
        <Container>
          <Reveal className={`${card} grid gap-6 overflow-hidden p-6 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center`}>
            <span className="grid h-20 w-20 place-items-center rounded-2xl bg-navy text-gold ring-1 ring-gold/40">
              <FileBadge2 className="h-9 w-9" aria-hidden="true" />
            </span>
            <div>
              <h2 id="licence-title" className="text-2xl font-bold text-fg">
                Licensing &amp; compliance
              </h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                {[
                  { k: "Licence", v: site.licence },
                  { k: "Issued by", v: "National Employment Authority (NEA), Kenya" },
                  { k: "Valid until", v: site.licenceValidUntil },
                  { k: "Company registration", v: site.companyRegNo },
                  { k: "Data protection", v: "Registered under the Kenya Data Protection Act, 2019" },
                  { k: "Office", v: site.address },
                ].map(({ k, v }) => (
                  <div key={k} className="rounded-xl bg-surface-2/60 p-4">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{k}</dt>
                    <dd className="mt-1 font-medium text-fg">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 flex items-center gap-2 text-sm text-muted">
                <CalendarCheck className="h-4 w-4" aria-hidden="true" /> Verify our licence on the NEA&apos;s official list of licensed private employment agencies.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="pt-16">
        <CtaBand />
      </div>
    </>
  );
}
