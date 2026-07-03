"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

// Client component that records a page_view once per pathname change
export default function AnalyticsClient() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      // Only call from client; trackPageView is a no-op in dev
      trackPageView(window.location.pathname + window.location.search);
    } catch (e) {
      // silent
    }
  }, [pathname]);

  return null;
}
