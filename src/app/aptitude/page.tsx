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

export default function AptitudePage() {
  return <AptitudeClient topics={TOPICS} />;
}
