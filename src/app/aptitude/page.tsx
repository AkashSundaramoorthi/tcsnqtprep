import type { Metadata } from "next";
import AptitudeClient from "./AptitudeClient";
import { TOPICS } from "@/lib/aptitude";

export const metadata: Metadata = {
  title: "Aptitude Guide — 30 TCS NQT Topics",
  description:
    "Master 30 TCS NQT aptitude topics with step-by-step method guides and solved practice problems. Covers Numerical, Verbal, Reasoning, and Advanced sections.",
  keywords: [
    "TCS NQT aptitude", "TCS NQT numerical ability", "TCS NQT verbal ability",
    "TCS NQT reasoning", "TCS NQT aptitude preparation", "TCS placement aptitude",
  ],
  alternates: {
    canonical: "/aptitude",
  },
  openGraph: {
    url: "/aptitude",
    title: "TCS NQT Aptitude Guide — 30 Topics",
    description: "30 method guides for TCS NQT aptitude sections.",
  },
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "TCS NQT Aptitude Guide",
  "description": "30 method guides for TCS NQT aptitude sections covering Numerical, Verbal, Reasoning, and Advanced sections.",
  "provider": {
    "@type": "Organization",
    "name": "TCS NQT Prep Hub",
    "sameAs": "https://tcsnqtprep.vercel.app"
  }
};

export default function AptitudePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />
      <AptitudeClient topics={TOPICS} />
    </>
  );
}
