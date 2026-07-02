import type { Metadata } from "next";
import ExamClient from "./ExamClient";
import { EXAM_QUESTIONS } from "@/lib/exam";

export const metadata: Metadata = {
  title: "Mock Exam — 80-Question TCS NQT Simulator",
  description:
    "Take a full 80-question, 192-minute TCS NQT mock exam (Numerical, Reasoning, Advanced Quant, Verbal MCQ sections plus 2 coding problems). Covers Numerical, Verbal, Reasoning, and Advanced sections. Get a detailed score breakdown and answer review.",
  keywords: [
    "TCS NQT mock exam", "TCS NQT practice test", "TCS NQT online test",
    "TCS NQT exam simulator", "TCS iON NQT mock",
  ],
  openGraph: {
    title: "TCS NQT Mock Exam — 80 Questions, 192 Minutes",
    description: "Simulate the real TCS NQT with a 192-minute timed mock exam.",
  },
};

export default function ExamPage() {
  return <ExamClient questions={EXAM_QUESTIONS} />;
}
