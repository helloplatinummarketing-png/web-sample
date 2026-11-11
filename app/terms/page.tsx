import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Terms of service", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of service" intro="Sample terms for the demo. Have the client's lawyer review them before launch. Last updated: [DATE].">
      <section>
        <h2>Our service</h2>
        <p>
          {site.name} is a recruitment agency licensed by the National Employment Authority ({site.licence}). We help candidates find verified overseas jobs and
          prepare their applications. Final hiring and visa decisions are made by employers and immigration authorities.
        </p>
      </section>
      <section>
        <h2>Fees</h2>
        <ul>
          <li>The only fee we charge candidates is the published registration fee, paid to our company Paybill: [REFUND POLICY].</li>
          <li>We never charge for a job offer, and never ask for payment to a personal phone number.</li>
          <li>Visa, medical and travel costs are explained in writing before you commit to anything.</li>
        </ul>
      </section>
      <section>
        <h2>Your responsibilities</h2>
        <p>You agree to give accurate information and genuine documents. False documents will end your application and may be reported to the authorities.</p>
      </section>
      <section>
        <h2>Sample content</h2>
        <p>This website is a demo. Jobs, statistics, stories and fees shown are sample content.</p>
      </section>
    </LegalPage>
  );
}
