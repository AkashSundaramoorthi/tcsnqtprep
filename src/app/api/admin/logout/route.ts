import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@vercel/postgres';
import {
  ADMIN_SESSION_COOKIE,
  deleteAdminSession,
  ensureAdminSessionTable,
  purgeExpiredAdminSessions,
} from '@/lib/admin-auth';

export async function POST() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (sessionId) {
    const client = createClient();
    try {
      await client.connect();
      await ensureAdminSessionTable(client);
      await purgeExpiredAdminSessions(client);
      await deleteAdminSession(client, sessionId);
    } catch {
      // silent
    } finally {
      try {
        await client.end();
      } catch {
        // silent
      }
    }
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, '', { httpOnly: true, path: '/admin', maxAge: 0 });
  res.cookies.set('admin-auth', '', { httpOnly: true, path: '/admin', maxAge: 0 });
  return res;
}
