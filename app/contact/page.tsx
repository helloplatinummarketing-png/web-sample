import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/format";
import { Container, PageHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call, WhatsApp, email or visit ${site.name} in Nairobi.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const items = [
    { icon: Phone, label: "Call", value: site.phoneDisplay, href: `tel:+${site.phoneDigits}` },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with an advisor", href: whatsappLink(site.phoneDigits, site.whatsappMessage) },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: "Office", value: site.address },
    { icon: Clock, label: "Hours", value: site.hours },
  ];
  return (
    <main id="main">
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Talk to a <span className="text-coral">real advisor.</span>
          </>
        }
        intro="Visit us in Nairobi, call, or send a message. We reply within one working day."
      />
      <Container className="grid gap-8 pb-24 lg:grid-cols-[1fr_1.2fr]">
        <ul className="space-y-3">
          {items.map((i) => {
            const body = (
              <>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-coral/15 text-coral">
                  <i.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-jade-300">{i.label}</span>
                  <span className="break-all font-semibold text-ivory">{i.value}</span>
                </span>
              </>
            );
            return (
              <li key={i.label}>
                {i.href ? (
                  <a href={i.href} className="glass flex items-center gap-4 rounded-2xl p-4 transition hover:border-coral/60" {...(i.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {body}
                  </a>
                ) : (
                  <div className="glass flex items-center gap-4 rounded-2xl p-4">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
        <ContactForm />
      </Container>
    </main>
  );
}
