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
    canonical: "/tcs/pyq",
  },
  openGraph: {
    url: "/tcs/pyq",
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

import pyqData from "@/data/pyq_data.json";
import { Section } from "./PYQClient";

export default function PYQPage() {
  const data = pyqData as Section[];
  const filtered = data.filter(item => (item as any).track === "tcs-nqt" || !(item as any).track);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />
      <PYQClient data={filtered} />
    </>
  );
}
