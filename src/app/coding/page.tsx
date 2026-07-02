import type { Metadata } from "next";
import CodingClient from "./CodingClient";
import { QUESTIONS } from "@/lib/questions";

export const metadata: Metadata = {
  title: "Coding Practice — 48 TCS NQT Problems",
  description:
    "Practice 48 TCS NQT coding problems (Easy, Medium, Hard) with an in-browser JavaScript runner. Track your progress, run test cases, and mark problems as solved.",
  keywords: ["TCS NQT coding", "TCS NQT programming", "TCS NQT coding problems", "TCS iON coding"],
  openGraph: {
    title: "TCS NQT Coding Practice — 48 Problems",
    description: "48 TCS NQT coding problems with in-browser runner.",
  },
};

export default function CodingPage() {
  return <CodingClient questions={QUESTIONS} />;
}
