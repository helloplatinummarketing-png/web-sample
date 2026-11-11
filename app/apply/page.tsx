import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Lock, PhoneCall } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Container, card } from "@/components/ui/primitives";
import { ApplyWizard } from "@/components/forms/ApplyWizard";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Apply Now",
  description: "Apply online for verified overseas jobs and visa sponsorship from Kenya. Five simple steps, about 10 minutes, from your phone.",
  alternates: { canonical: "/apply" },
};

const perks = [
  { icon: Clock, title: "About 10 minutes", body: "Save time: have your CV and passport photo ready." },
  { icon: PhoneCall, title: "Advisor call in 2 days", body: "A real person reviews every application." },
  { icon: Lock, title: "Your data is protected", body: "Handled under the Kenya Data Protection Act, 2019." },
];

export default function ApplyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Application"
        title="Start your journey abroad"
        intro="Five short steps. Your progress is shown at the top, and you can go back to edit anything before you submit."
      />
      <Container className="grid gap-8 py-12 sm:py-16 lg:grid-cols-[1fr_300px]">
        <div className={`${card} p-5 sm:p-10`}>
          <Suspense fallback={<div className="h-[480px] animate-pulse rounded-xl bg-surface-2" />}>
            <ApplyWizard />
          </Suspense>
        </div>
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {perks.map(({ icon: Icon, title, body }) => (
            <div key={title} className={`${card} flex gap-4 p-5`}>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-gold">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display font-semibold text-fg">{title}</p>
                <p className="text-sm text-muted">{body}</p>
              </div>
            </div>
          ))}
          <p className="rounded-2xl border border-gold/40 bg-gold-50 p-5 text-sm text-fg dark:bg-gold/10">
            Need help? Call or WhatsApp{" "}
            <a href={`tel:+${site.phoneDigits}`} className="font-semibold text-link underline underline-offset-2">
              {site.phoneDisplay}
            </a>
            . {site.licence}.
          </p>
        </aside>
      </Container>
    </>
  );
}
