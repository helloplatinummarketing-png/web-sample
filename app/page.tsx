import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Destinations } from "@/components/home/Destinations";
import { EligibilityChecker } from "@/components/home/EligibilityChecker";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturedJobs } from "@/components/home/FeaturedJobs";
import { Fees } from "@/components/home/Fees";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";
import { ScamAwareness } from "@/components/home/ScamAwareness";
import { FAQ } from "@/components/home/FAQ";
import { CtaBand } from "@/components/CtaBand";
import { faqs } from "@/data/content";

export default function HomePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <Hero />
      <TrustBar />
      <Destinations />
      <EligibilityChecker />
      <HowItWorks />
      <FeaturedJobs />
      <Fees />
      <Stats />
      <Testimonials />
      <ScamAwareness />
      <FAQ />
      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
