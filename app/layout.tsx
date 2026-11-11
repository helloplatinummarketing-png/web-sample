import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope, Syne } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Shell } from "@/components/layout/Shell";
import { site } from "@/data/site";
import { modeScript } from "@/lib/mode";
import "./globals.css";

const syne = Syne({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-syne", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const jet = JetBrains_Mono({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-jet", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: Overseas jobs & visas from Nairobi`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: ["jobs abroad Kenya", "overseas recruitment Nairobi", "NEA licensed agency", "work visa Kenya", "UK care jobs", "Gulf jobs"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
    url: "/",
    locale: "en_KE",
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#031f1b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${manrope.variable} ${jet.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: modeScript }} />
      </head>
      <body className="antialiased">
        <Shell>
          <Navbar />
          {children}
          <Footer />
        </Shell>
      </body>
    </html>
  );
}
