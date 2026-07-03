"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

// Client component that records a page_view once per pathname change
export default function AnalyticsClient() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      const fullPath = window.location.pathname + window.location.search;
      const lastPath = sessionStorage.getItem("last_page_view_path");
      const lastTime = sessionStorage.getItem("last_page_view_time");
      const now = Date.now();

      // Prevent redundant page views if refreshing the same page within 15 seconds
      if (lastPath === fullPath && lastTime && now - parseInt(lastTime, 10) < 15000) {
        return;
      }

      sessionStorage.setItem("last_page_view_path", fullPath);
      sessionStorage.setItem("last_page_view_time", now.toString());

      trackPageView(fullPath);
    } catch {
      // silent
    }
  }, [pathname]);

  return null;
}
