import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Privacy policy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy policy" intro="Sample policy for the demo. Have the client's lawyer review it before launch. Last updated: [DATE].">
      <section>
        <h2>Who we are</h2>
        <p>
          {site.name} ({site.companyRegNo}, {site.licence}) is the data controller for personal data collected through this website. We process data under the
          Kenya Data Protection Act, 2019.
        </p>
      </section>
      <section>
        <h2>What we collect</h2>
        <ul>
          <li>Contact details: name, phone number, email and county.</li>
          <li>Career details: field of work, experience, qualifications and preferred destinations.</li>
          <li>Documents you upload: CV, passport bio page and certificates.</li>
        </ul>
      </section>
      <section>
        <h2>How we use it</h2>
        <p>Only to assess your eligibility, match you with verified employers, prepare your visa application and keep you informed. We never sell your data.</p>
      </section>
      <section>
        <h2>Sharing</h2>
        <p>We share your profile with an employer or embassy only after you approve it. Service providers that store data for us are bound by contract to protect it.</p>
      </section>
      <section>
        <h2>Your rights</h2>
        <p>
          You can ask to see, correct or delete your data, or withdraw consent at any time, by emailing <a href={`mailto:${site.email}`}>{site.email}</a>. You may also
          complain to the Office of the Data Protection Commissioner.
        </p>
      </section>
      <section>
        <h2>Retention</h2>
        <p>We keep application data for up to 24 months after your last contact with us, unless the law requires longer.</p>
      </section>
    </LegalPage>
  );
}
