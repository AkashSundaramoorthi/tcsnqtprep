/* Centralized analytics utility
 - Type-safe event names and properties
 - Sends events to server API which writes to Vercel Postgres
 - Silent in development; never throws in production
*/

export type EventMap = {
  // GENERAL
  page_view: { path?: string } | undefined;
  home_hero_cta_clicked: { label?: string } | undefined;
  feature_card_clicked: { feature?: string } | undefined;
  calculator_opened: { calculator?: string } | undefined;
  calculator_used: { calculator?: string; inputHash?: string } | undefined;
  feedback_submitted: { type?: string } | undefined;
  linkedin_clicked: { profile?: string } | undefined;

  // CODING
  coding_page_opened: { } | undefined;
  coding_problem_opened: { problemId?: string; title?: string } | undefined;
  coding_language_changed: { problemId?: string; language?: string } | undefined;
  solution_viewed: { problemId?: string; title?: string } | undefined;
  coding_problem_completed: { problemId?: string; title?: string; language?: string } | undefined;

  // APTITUDE
  aptitude_page_opened: { } | undefined;
  aptitude_topic_opened: { topic?: string } | undefined;
  formula_opened: { formula?: string } | undefined;
  formula_search_used: { query?: string } | undefined;

  // EXAM
  exam_page_opened: { examId?: string } | undefined;
  exam_started: { examId?: string } | undefined;
  exam_question_answered: { examId?: string; questionIndex?: number; correct?: boolean } | undefined;
  exam_question_marked_review: { examId?: string; questionIndex?: number } | undefined;
  exam_question_cleared: { examId?: string; questionIndex?: number } | undefined;
  exam_submitted: { examId?: string; totalQuestions?: number } | undefined;
  exam_completed: { examId?: string; score?: number; percentage?: number; duration?: number; totalQuestions?: number } | undefined;
  result_pdf_generated: { examId?: string; filename?: string } | undefined;

  // PYQ
  pyq_page_opened: { } | undefined;
  pyq_category_selected: { category?: string } | undefined;
  pyq_question_answered: { category?: string; questionIndex?: number } | undefined;
  pyq_answer_revealed: { category?: string; questionIndex?: number } | undefined;
  pyq_bookmark_added: { category?: string; questionIndex?: number } | undefined;
  pyq_bookmark_removed: { category?: string; questionIndex?: number } | undefined;
  pyq_paper_viewed: { paper?: string } | undefined;
  pyq_paper_downloaded: { paper?: string; filename?: string } | undefined;
  pyq_download_all_clicked: { paper?: string } | undefined;
};

export type EventName = keyof EventMap;

// runtime guard: only send events in production
const isProduction = process.env.NODE_ENV === "production";

type ClientContext = {
  fingerprint?: string;
  deviceType?: "mobile" | "tablet" | "desktop";
};

let cachedClientContext: ClientContext | null = null;

function inferDeviceType(userAgent: string): "mobile" | "tablet" | "desktop" {
  const ua = userAgent.toLowerCase();
  if (/ipad|tablet|playbook|silk/.test(ua)) return "tablet";
  if (/mobi|android|iphone|ipod|phone/.test(ua)) return "mobile";
  return "desktop";
}

function getClientContext(): ClientContext {
  if (typeof window === "undefined") return {};
  if (cachedClientContext) return cachedClientContext;

  try {
    const ua = navigator.userAgent || "";
    const platform = navigator.platform || "";
    const language = navigator.language || "";
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const screenSize =
      typeof window.screen !== "undefined"
        ? `${window.screen.width}x${window.screen.height}`
        : "";
    const hardwareConcurrency =
      typeof navigator.hardwareConcurrency === "number"
        ? String(navigator.hardwareConcurrency)
        : "";
    const deviceMemory =
      typeof (navigator as Navigator & { deviceMemory?: number }).deviceMemory === "number"
        ? String((navigator as Navigator & { deviceMemory?: number }).deviceMemory)
        : "";

    cachedClientContext = {
      // Raw website fingerprint as requested
      fingerprint: [ua, platform, language, timezone, screenSize, hardwareConcurrency, deviceMemory]
        .filter(Boolean)
        .join("|"),
      deviceType: inferDeviceType(ua),
    };
    return cachedClientContext;
  } catch {
    cachedClientContext = {};
    return cachedClientContext;
  }
}

// Client-side helper: fire-and-forget; never throws
export function trackEvent<Name extends EventName>(name: Name, properties?: EventMap[Name]): void {
  if (!isProduction) return;
  try {
    if (
      name === "page_view" &&
      typeof (properties as { path?: string } | undefined)?.path === "string" &&
      (properties as { path?: string }).path!.startsWith("/admin")
    ) {
      return;
    }

    const context = getClientContext();
    // fire-and-forget; do not await
    void fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: name,
        properties,
        fingerprint: context.fingerprint,
        deviceType: context.deviceType,
      }),
      keepalive: true,
    }).catch(() => {
      // silent: swallow network errors in production
    });
  } catch (e) {
    // swallow any sync errors
  }
}

export function trackPageView(path?: string) {
  trackEvent('page_view', { path });
}

// Example wrappers for common events (to avoid duplicated naming and payload shapes)
export const analytics = {
  trackEvent,
  trackPageView,
};
