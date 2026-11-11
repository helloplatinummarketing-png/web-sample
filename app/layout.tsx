import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { themeScript } from "@/lib/theme";
import { Providers } from "@/components/layout/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap", weight: ["600", "700"], preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Licensed Overseas Recruitment from Kenya`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "recruitment agency Kenya",
    "jobs abroad for Kenyans",
    "NEA licensed agency",
    "UK health and care visa",
    "Germany skilled worker visa",
    "jobs in Dubai from Kenya",
    "Canada work permit Kenya",
    "Poland work permit",
  ],
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F8FC" },
    { media: "(prefers-color-scheme: dark)", color: "#071230" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <Providers>
          <SmoothScroll />
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
