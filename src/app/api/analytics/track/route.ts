import { NextResponse } from 'next/server';
import { createClient } from '@vercel/postgres';

// Basic server-side validation for allowed events (mirror of src/lib/analytics)
const ALLOWED_EVENTS = new Set([
  // GENERAL
  'page_view','home_hero_cta_clicked','feature_card_clicked','calculator_opened','calculator_used','feedback_submitted','linkedin_clicked',
  // CODING
  'coding_page_opened','coding_problem_opened','coding_language_changed','solution_viewed','coding_problem_completed',
  // APTITUDE
  'aptitude_page_opened','aptitude_topic_opened','formula_opened','formula_search_used',
  // EXAM
  'exam_page_opened','exam_started','exam_question_answered','exam_question_marked_review','exam_question_cleared','exam_submitted','exam_completed','result_pdf_generated',
  // PYQ
  'pyq_page_opened','pyq_category_selected','pyq_question_answered','pyq_answer_revealed','pyq_bookmark_added','pyq_bookmark_removed','pyq_paper_viewed','pyq_paper_downloaded','pyq_download_all_clicked',
]);

function safeStringify(obj: any) {
  try {
    return JSON.stringify(obj);
  } catch (e) {
    return '{}';
  }
}

export async function POST(req: Request) {
  // keep silent in non-production
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.json({ ok: true });
  }

  try {
    const body = await req.json();
    const { eventName, properties, fingerprint, deviceType } = body ?? {};
    if (typeof eventName !== 'string' || !ALLOWED_EVENTS.has(eventName)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    if (
      eventName === 'page_view' &&
      typeof properties?.path === 'string' &&
      properties.path.startsWith('/admin')
    ) {
      return NextResponse.json({ ok: true });
    }

    // Prevent explicit identity fields in custom properties
    if (properties && (properties.userId || properties.email)) {
      delete properties.userId;
      delete properties.email;
    }

    const forwardedFor = req.headers.get('x-forwarded-for');
    const ipAddress = forwardedFor?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || null;
    const userAgent = req.headers.get('user-agent') || null;

    const KNOWN_BOT_IPS = new Set([
      '54.183.149.156', '13.57.148.235', '66.249.70.2', '66.249.70.3', '35.177.207.241', '18.130.228.32'
    ]);

    // Drop automated bots and health checks silently
    if (
      !userAgent || 
      /bot|crawler|spider|crawling|slurp|headless|postman|curl|wget|aws|python|ruby|java|go-http|httpclient|vercel/i.test(userAgent) ||
      (ipAddress && KNOWN_BOT_IPS.has(ipAddress))
    ) {
      return NextResponse.json({ ok: true });
    }

    const client = createClient();
    try {
      await client.connect();

      // Ensure table exists (safe to run repeatedly)
      await client.sql`
        CREATE TABLE IF NOT EXISTS events (
          id BIGSERIAL PRIMARY KEY,
          event_name TEXT NOT NULL,
          properties JSONB,
          created_at TIMESTAMPTZ DEFAULT now()
        )
      `;
      await client.sql`ALTER TABLE events ADD COLUMN IF NOT EXISTS ip_address TEXT`;
      await client.sql`ALTER TABLE events ADD COLUMN IF NOT EXISTS fingerprint TEXT`;
      await client.sql`ALTER TABLE events ADD COLUMN IF NOT EXISTS user_agent TEXT`;
      await client.sql`ALTER TABLE events ADD COLUMN IF NOT EXISTS device_type TEXT`;

      const props = safeStringify(properties ?? {});
      const cleanFingerprint = typeof fingerprint === 'string' ? fingerprint.slice(0, 1024) : null;
      const cleanDeviceType = typeof deviceType === 'string' ? deviceType.slice(0, 32) : null;
      const cleanUserAgent = userAgent ? userAgent.slice(0, 1024) : null;

      // Insert row using parameterized template
      await client.sql`
        INSERT INTO events (event_name, properties, ip_address, fingerprint, user_agent, device_type)
        VALUES (${eventName}, ${props}::jsonb, ${ipAddress}, ${cleanFingerprint}, ${cleanUserAgent}, ${cleanDeviceType})
      `;
      return NextResponse.json({ ok: true });
    } finally {
      try {
        await client.end();
      } catch {
        // silent
      }
    }
  } catch (e) {
    // Always return success-ish to avoid breaking client UX
    return NextResponse.json({ ok: true });
  }
}
