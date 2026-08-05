import CodingClient from "@/app/tcs/coding/CodingClient";
import { QUESTIONS } from "@/lib/questions";

export const metadata = {
  title: "HackWithInfy Coding Practice — Infosys Placement Prep",
  description: "Practice HackWithInfy-style DSA coding problems with an in-browser IDE.",
  alternates: { canonical: "/infosys/coding" },
};

export default function InfosysCodingPage() {
  const filtered = QUESTIONS.filter(q => q.track === "hackwithinfy");
  return <CodingClient questions={filtered} track="infosys" />;
}
