import { NextResponse } from 'next/server';
import { createClient } from '@vercel/postgres';

export async function GET(req: Request) {
  // Simple check so only you can run this by passing ?secret=clean
  const url = new URL(req.url);
  if (url.searchParams.get('secret') !== 'clean') {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const client = createClient();
  try {
    await client.connect();
    const res = await client.sql`
      DELETE FROM events 
      WHERE user_agent ILIKE '%bot%' 
         OR user_agent ILIKE '%crawler%' 
         OR user_agent ILIKE '%aws%'
         OR user_agent IS NULL 
         OR ip_address IN ('54.183.149.156', '13.57.148.235', '66.249.70.2', '66.249.70.3', '35.177.207.241', '18.130.228.32');
    `;
    return NextResponse.json({ ok: true, deleted: res.rowCount });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  } finally {
    try {
      await client.end();
    } catch {}
  }
}
