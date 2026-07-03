import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@vercel/postgres';
import {
  ADMIN_SESSION_COOKIE,
  createAdminSession,
  ensureAdminSessionTable,
  getActiveAdminSession,
  purgeExpiredAdminSessions,
} from '@/lib/admin-auth';

export async function POST(req: Request) {
  try {
    const { secret } = await req.json();
    if (!process.env.ADMIN_DASHBOARD_SECRET) {
      return NextResponse.json({ ok: false }, { status: 500 });
    }
    if (secret !== process.env.ADMIN_DASHBOARD_SECRET) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const client = createClient();
    await client.connect();
    await ensureAdminSessionTable(client);
    await purgeExpiredAdminSessions(client);

    const activeSession = await getActiveAdminSession(client);
    if (activeSession) {
      await client.end();
      // Hide route existence when another session is already active.
      return NextResponse.json({ ok: false }, { status: 404 });
    }

    const sessionId = await createAdminSession(client);
    await client.end();

    const token = crypto
      .createHmac('sha256', process.env.ADMIN_DASHBOARD_SECRET)
      .update(process.env.ADMIN_DASHBOARD_SECRET)
      .digest('hex');

    const res = NextResponse.json({ ok: true });
    // Backward-compat auth cookie (kept for existing sessions)
    res.cookies.set('admin-auth', token, {
      httpOnly: true,
      path: '/admin',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 30,
    });
    // Single-session lock cookie
    res.cookies.set(ADMIN_SESSION_COOKIE, sessionId, {
      httpOnly: true,
      path: '/admin',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 30,
    });
    return res;
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
