import ExamClient from "@/app/tcs/exam/ExamClient";
import { EXAM_QUESTIONS } from "@/lib/exam";

export const metadata = {
  title: "HackWithInfy Mock Exam — Infosys Simulator",
  description: "Simulate a HackWithInfy style exam round.",
  alternates: { canonical: "/infosys/exam" },
};

export default function InfosysExamPage() {
  const filtered = EXAM_QUESTIONS.filter(q => q.track === "hackwithinfy");
  return <ExamClient questions={filtered} track="hackwithinfy" />;
}
