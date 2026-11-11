import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms and conditions for using the ${site.name} website and recruitment services.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <section>
        <h2>1. About our services</h2>
        <p>
          {site.name} is a private employment agency licensed by the National Employment Authority ({site.licence}). We provide career assessment, employer
          matching, interview preparation and visa documentation support.
        </p>
      </section>
      <section>
        <h2>2. No guarantees</h2>
        <p>
          Submitting an application or using the Eligibility Checker does not guarantee a job offer or visa. Final decisions rest with employers and immigration
          authorities. Eligibility results on this website are indicative only.
        </p>
      </section>
      <section>
        <h2>3. Fees</h2>
        <p>
          A one-time registration fee of {site.registrationFee} applies after your consultation. What it covers is explained on our{" "}
          <Link href="/#fees">fees section</Link>. All payments are made only to our official Paybill or company account and are receipted.
        </p>
      </section>
      <section>
        <h2>4. Your responsibilities</h2>
        <ul>
          <li>Provide accurate information and genuine documents</li>
          <li>Attend scheduled interviews, medicals and orientation sessions</li>
          <li>Inform us promptly of any changes to your circumstances</li>
        </ul>
      </section>
      <section>
        <h2>5. Refunds</h2>
        <p>Our refund policy is provided in writing before payment. [Insert the client&apos;s refund policy here.]</p>
      </section>
      <section>
        <h2>6. Governing law</h2>
        <p>These terms are governed by the laws of the Republic of Kenya.</p>
      </section>
    </LegalPage>
  );
}
