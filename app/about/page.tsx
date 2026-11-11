import { BadgeCheck, HeartHandshake, Scale, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { stats, team } from "@/data/content";
import { site } from "@/data/site";
import { ButtonLink, Container, Eyebrow, PageHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "About us",
  description: `${site.name} is a licensed Nairobi recruitment agency guiding Kenyans to verified jobs abroad.`,
  alternates: { canonical: "/about" },
};

const values = [
  { icon: ShieldCheck, title: "Licensed & accountable", text: `Registered with the National Employment Authority (${site.licence}) and audited every year.` },
  { icon: Scale, title: "Honest about costs", text: "Every fee is written down before you pay. Never cash, never a personal number." },
  { icon: HeartHandshake, title: "With you after you land", text: "WhatsApp check-ins through your first 90 days abroad, and a contact you can call." },
];

export default function AboutPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="About us"
        title={
          <>
            A Nairobi agency built on <span className="text-coral">honest routes.</span>
          </>
        }
        intro="We started because too many friends lost savings to fake agents. Today we place Kenyans with verified employers in eight countries, one documented step at a time. (Sample story for the demo.)"
      />
      <Container className="pb-16">
        <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5">
              <dt className="text-sm text-sand/70">{s.label}</dt>
              <dd className="mt-1 font-display text-4xl font-bold text-coral">{s.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-sand/50">Sample figures.</p>
      </Container>
      <div className="section-light">
        <Container className="grid gap-12 py-20 lg:grid-cols-2">
          <div>
            <Eyebrow className="!text-coral-600">What we stand for</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold text-fg sm:text-4xl">Three promises to every candidate</h2>
            <ul className="mt-8 space-y-6">
              {values.map((v) => (
                <li key={v.title} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-night-900 text-coral">
                    <v.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-fg">{v.title}</h3>
                    <p className="mt-1 text-muted">{v.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow className="!text-coral-600">The team</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold text-fg sm:text-4xl">People you can call</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {team.map((m, i) => (
                <li key={i} className="rounded-2xl border border-line bg-white p-5">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-sand font-display font-bold text-jade-700" aria-hidden="true">
                    {m.role.slice(0, 2).toUpperCase()}
                  </span>
                  <p className="mt-3 font-bold text-fg">{m.name}</p>
                  <p className="text-sm text-muted">{m.role}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-jade-700">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" /> {site.licence}
            </p>
          </div>
        </Container>
      </div>
      <Container className="py-20 text-center">
        <h2 className="text-3xl font-bold text-ivory sm:text-4xl">Ready to plot your route?</h2>
        <div className="mt-6 flex justify-center gap-3">
          <ButtonLink href="/apply">Start My Journey</ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Talk to us
          </ButtonLink>
        </div>
      </Container>
    </main>
  );
}
