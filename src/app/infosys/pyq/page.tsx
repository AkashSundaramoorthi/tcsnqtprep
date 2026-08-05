import PYQClient from "@/app/tcs/pyq/PYQClient";
import pyqData from "@/data/pyq_data.json";
import { Section } from "@/app/tcs/pyq/PYQClient";

export const metadata = {
  title: "Infosys Previous Year Questions (PYQ)",
  description: "Browse previous year questions for Infosys placements.",
  alternates: { canonical: "/infosys/pyq" },
};

export default function InfosysPYQPage() {
  const data = pyqData as Section[];
  const filtered = data.filter(item => (item as any).track === "hackwithinfy");
  return <PYQClient data={filtered} />;
}
