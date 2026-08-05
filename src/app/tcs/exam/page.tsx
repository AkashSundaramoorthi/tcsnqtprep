import type { Metadata } from "next";
import ExamClient from "./ExamClient";
import { EXAM_QUESTIONS } from "@/lib/exam";

export const metadata: Metadata = {
  title: "Mock Exam — 80-Question TCS NQT Simulator",
  description:
    "Take a full 80-question, 190-minute TCS NQT mock exam (Numerical, Reasoning, Advanced Quant, Verbal MCQ sections plus 2 coding problems). Covers Numerical, Verbal, Reasoning, and Advanced sections. Get a detailed score breakdown and answer review.",
  keywords: [
    "TCS NQT mock exam", "TCS NQT practice test", "TCS NQT online test",
    "TCS NQT exam simulator", "TCS iON NQT mock",
  ],
  alternates: {
    canonical: "/tcs/exam",
  },
  openGraph: {
    url: "/tcs/exam",
    title: "TCS NQT Mock Exam — 80 Questions, 190 Minutes",
    description: "Simulate the real TCS NQT with a 190-minute timed mock exam.",
  },
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "TCS NQT Mock Exam",
  "description": "Simulate the real TCS NQT with an 80-question, 190-minute timed mock exam including coding sections.",
  "provider": {
    "@type": "Organization",
    "name": "TCS NQT Prep Hub",
    "sameAs": "https://tcsnqtprep.vercel.app"
  }
};

export default function ExamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />
      <ExamClient questions={EXAM_QUESTIONS} track="tcs-nqt" />
    </>
  );
}
