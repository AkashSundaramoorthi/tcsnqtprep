import type { Metadata } from "next";
import CodingClient from "./CodingClient";
import { QUESTIONS } from "@/lib/questions";

export const metadata: Metadata = {
  title: "Coding Practice — 50 TCS NQT Problems",
  description:
    "Practice 50 TCS NQT coding problems (Easy, Medium, Hard) with an in-browser JavaScript runner. Track your progress, run test cases, and mark problems as solved.",
  keywords: ["TCS NQT coding", "TCS NQT programming", "TCS NQT coding problems", "TCS iON coding"],
  alternates: {
    canonical: "/tcs/coding",
  },
  openGraph: {
    url: "/tcs/coding",
    title: "TCS NQT Coding Practice — 50 Problems",
    description: "50 TCS NQT coding problems with in-browser runner.",
  },
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "TCS NQT Coding Practice IDE",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "description": "Browser-based coding IDE supporting Python, JS, C, C++, Java and C# with pre-loaded test cases for TCS NQT coding problems."
};

export default function CodingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />
      <CodingClient questions={QUESTIONS.filter(q => q.track === "tcs-nqt" || !q.track)} />
    </>
  );
}
