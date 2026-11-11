import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/format";
import { PageHeader } from "@/components/PageHeader";
import { Container, card } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Speak to a licensed advisor by phone, WhatsApp or email, or visit our Nairobi office. ${site.licence}.`,
  alternates: { canonical: "/contact" },
};

const cards = [
  { icon: Phone, title: "Call us", value: site.phoneDisplay, href: `tel:+${site.phoneDigits}` },
  { icon: null, title: "WhatsApp", value: "Chat with an advisor", href: whatsappLink(site.phoneDigits, site.whatsappMessage), external: true },
  { icon: Mail, title: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, title: "Visit us", value: site.address },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Talk to a real advisor" intro="Questions about a job, a visa or our fees? We're happy to help, in English or Kiswahili." />

      <Container className="py-12 sm:py-16">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, value, href, external }, i) => {
            const inner = (
              <>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-gold">
                  {Icon ? <Icon className="h-5 w-5" aria-hidden="true" /> : <WhatsAppIcon className="h-5 w-5" />}
                </span>
                <span className="mt-4 block font-display font-semibold text-fg">{title}</span>
                <span className="mt-1 block break-words text-sm text-muted">{value}</span>
              </>
            );
            const cls = `${card} block h-full p-6 transition hover:-translate-y-1 hover:border-royal/40 dark:hover:border-gold/40`;
            return (
              <Reveal as="li" key={title} delay={i * 0.06}>
                {href ? (
                  <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {inner}
                  </a>
                ) : (
                  <div className={cls}>{inner}</div>
                )}
              </Reveal>
            );
          })}
        </ul>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <Reveal className={`${card} p-6 sm:p-10`}>
            <h2 className="text-2xl font-bold text-fg">Send us a message</h2>
            <p className="mt-1 text-sm text-muted">We reply within one working day.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal className={`${card} p-6`}>
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-fg">
                <Clock className="h-5 w-5 text-royal dark:text-gold" aria-hidden="true" /> Office hours
              </h2>
              <dl className="mt-4 divide-y divide-line text-sm">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 py-2.5">
                    <dt className="text-muted">{h.days}</dt>
                    <dd className="font-semibold text-fg">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.08} className={`${card} flex-1 overflow-hidden`}>
              <iframe
                title={`Map showing our office in ${site.mapQuery}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=13&output=embed`}
                className="h-full min-h-[320px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </Reveal>
          </div>
        </div>
      </Container>
    </>
  );
}
