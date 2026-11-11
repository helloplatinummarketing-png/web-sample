import { BadgeCheck, Building2, Lock, Receipt } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "../ui/primitives";

const items = [
  { icon: BadgeCheck, title: site.licence, body: "Licensed by the National Employment Authority", highlight: true },
  { icon: Building2, title: "Verified employer partners", body: "Every employer and contract vetted" },
  { icon: Receipt, title: "Transparent fees", body: "One registration fee, always receipted" },
  { icon: Lock, title: "Data protected (Kenya DPA)", body: "Handled under the Data Protection Act, 2019" },
];

export function TrustBar() {
  return (
    <section aria-label="Why you can trust us" className="relative z-10 -mt-4 sm:-mt-8">
      <Container>
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-[0_20px_50px_-24px_rgba(11,27,63,0.3)] sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, body, highlight }) => (
            <li key={title} className="flex items-center gap-4 bg-surface p-5">
              <span
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${
                  highlight ? "bg-navy text-gold ring-1 ring-gold/40" : "bg-royal-50 text-royal dark:bg-royal/20 dark:text-royal-300"
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-sm font-semibold text-fg">{title}</span>
                <span className="block text-xs leading-snug text-muted">{body}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
