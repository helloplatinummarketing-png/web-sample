import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects your personal data under the Kenya Data Protection Act, 2019.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <section>
        <h2>1. Who we are</h2>
        <p>
          {site.name} ({site.licence}) is the data controller for personal data collected through this website and our services. Contact our Data Protection
          Officer at <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </section>
      <section>
        <h2>2. Data we collect</h2>
        <ul>
          <li>Identity and contact details: name, email, phone number, county.</li>
          <li>Career information: CV, qualifications, work history, language skills.</li>
          <li>Documents you upload: passport copy, certificates.</li>
          <li>Technical data: basic, anonymised analytics about how the site is used.</li>
        </ul>
      </section>
      <section>
        <h2>3. Why we use it</h2>
        <p>
          To assess your eligibility, match you with employers, prepare visa documentation and keep you updated. We process your data on the basis of your
          consent and to take steps at your request before entering a contract, as permitted by the Kenya Data Protection Act, 2019.
        </p>
      </section>
      <section>
        <h2>4. Who we share it with</h2>
        <p>
          Only with your consent: prospective employers, embassies and immigration authorities, and service providers such as medical centres and training
          partners. Where data is transferred outside Kenya, we apply appropriate safeguards. We never sell your data.
        </p>
      </section>
      <section>
        <h2>5. Your rights</h2>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Correct inaccurate data or request deletion</li>
          <li>Object to processing or withdraw consent at any time</li>
          <li>Lodge a complaint with the Office of the Data Protection Commissioner (ODPC)</li>
        </ul>
      </section>
      <section>
        <h2>6. Retention &amp; security</h2>
        <p>We keep your data only as long as needed for recruitment purposes or as required by law, and protect it with appropriate technical and organisational measures.</p>
      </section>
    </LegalPage>
  );
}
