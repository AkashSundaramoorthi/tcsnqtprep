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
    const { eventName, properties } = body ?? {};
    if (typeof eventName !== 'string' || !ALLOWED_EVENTS.has(eventName)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // Prevent PII keys - rudimentary guard
    if (properties && (properties.userId || properties.email || properties.ip)) {
      // drop sensitive keys
      delete properties.userId;
      delete properties.email;
      delete properties.ip;
    }

    const client = createClient();
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

    const props = safeStringify(properties ?? {});

    // Insert row using parameterized template
    await client.sql`
      INSERT INTO events (event_name, properties) VALUES (${eventName}, ${props}::jsonb)
    `;

    await client.end();
    return NextResponse.json({ ok: true });
  } catch (e) {
    // Always return success-ish to avoid breaking client UX; log only outside production
    try { await (globalThis as any).console?.error?.(e); } catch {} // best-effort but do not rethrow
    return NextResponse.json({ ok: true });
  }
}
