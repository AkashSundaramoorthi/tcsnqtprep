import { Metadata } from "next";
import FeedbackClient from "./FeedbackClient";

export const metadata: Metadata = {
  title: "Feedback — PlacementPrepHub",
  description:
    "Share your feedback, report bugs, or suggest features for the PlacementPrepHub platform.",
  alternates: {
    canonical: "/feedback",
  },
  openGraph: {
    title: "Feedback — PlacementPrepHub",
    description: "Share your feedback, report bugs, or suggest features for the PlacementPrepHub platform.",
    url: "/feedback",
  },
};

export default function FeedbackPage() {
  return <FeedbackClient />;
}
