import { ChapterSection } from "@/components/home/ChapterSection";
import { Hero } from "@/components/home/Hero";
import { HomeJourney } from "@/components/home/HomeJourney";
import { IntroLoader } from "@/components/home/IntroLoader";
import { chapters } from "@/data/journey";
import { preload } from "react-dom";
import { site } from "@/data/site";

export default function HomePage() {
  preload("/textures/earth-poster.webp", { as: "image", fetchPriority: "high" });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phoneDisplay,
    email: site.email,
    address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE", streetAddress: site.address },
  };
  return (
    <>
      <IntroLoader />
      <HomeJourney />
      <main id="main" className="relative">
        <div id="journey">
          <Hero />
          {chapters.slice(1).map((c) => (
            <ChapterSection key={c.id} chapter={c} />
          ))}
        </div>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
