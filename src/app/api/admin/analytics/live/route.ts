import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@vercel/postgres";
import { loadDashboardData } from "@/lib/admin-analytics";
import {
  ADMIN_SESSION_COOKIE,
  ensureAdminSessionTable,
  getActiveAdminSession,
  purgeExpiredAdminSessions,
  touchAdminSession,
} from "@/lib/admin-auth";

export async function GET() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  const client = createClient();
  try {
    await client.connect();
    await ensureAdminSessionTable(client);
    await purgeExpiredAdminSessions(client);
    const activeSession = await getActiveAdminSession(client);

    if (!activeSession || !sessionId || activeSession.session_id !== sessionId) {
      return NextResponse.json({ ok: false }, { status: 404 });
    }

    await touchAdminSession(client, sessionId);
    const data = await loadDashboardData(client);
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  } finally {
    try {
      await client.end();
    } catch {
      // silent
    }
  }
}

