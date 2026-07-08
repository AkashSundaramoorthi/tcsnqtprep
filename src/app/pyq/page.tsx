import type { Metadata } from "next";
import PYQClient from "./PYQClient";

export const metadata: Metadata = {
  title: "TCS NQT Previous Year Questions (PYQ) Bank",
  description:
    "Curated TCS NQT Previous Year Questions with worked solutions across Numerical Ability, Verbal Ability, Reasoning, Programming Logic MCQs, and Coding problems.",
  keywords: [
    "TCS NQT PYQ", "TCS NQT previous year questions", "TCS NQT question paper",
    "TCS NQT 2023 questions", "TCS NQT 2024 questions", "TCS iON NQT PYQ",
  ],
  alternates: {
    canonical: "/pyq",
  },
  openGraph: {
    url: "/pyq",
    title: "TCS NQT Previous Year Questions (PYQ)",
    description: "Complete PYQ bank with worked solutions for all TCS NQT sections.",
  },
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "TCS NQT Previous Year Questions (PYQ)",
  "description": "Curated TCS NQT Previous Year Questions with worked solutions across all sections.",
  "provider": {
    "@type": "Organization",
    "name": "TCS NQT Prep Hub",
    "sameAs": "https://tcsnqtprep.vercel.app"
  }
};

export default function PYQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />
      <PYQClient />
    </>
  );
}
