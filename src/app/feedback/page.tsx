import { Metadata } from "next";
import FeedbackClient from "./FeedbackClient";

export const metadata: Metadata = {
  title: "Feedback — TCS NQT Prep Hub",
  description:
    "Share your feedback, report bugs, or suggest features for the TCS NQT Prep Hub platform.",
  alternates: {
    canonical: "/feedback",
  },
  openGraph: {
    title: "Feedback — TCS NQT Prep Hub",
    description: "Share your feedback, report bugs, or suggest features for the TCS NQT Prep Hub platform.",
    url: "/feedback",
  },
};

export default function FeedbackPage() {
  return <FeedbackClient />;
}
