import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { createClient } from "@vercel/postgres";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboardClient from "@/components/AdminDashboardClient";
import { loadDashboardData } from "@/lib/admin-analytics";
import {
  ADMIN_SESSION_COOKIE,
  ensureAdminSessionTable,
  getActiveAdminSession,
  purgeExpiredAdminSessions,
  touchAdminSession,
} from "@/lib/admin-auth";

export default async function Page() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  const client = createClient();
  try {
    await client.connect();
    await ensureAdminSessionTable(client);
    await purgeExpiredAdminSessions(client);
    const activeSession = await getActiveAdminSession(client);

    // If no active admin session, show login.
    if (!activeSession) {
      return <AdminLogin />;
    }

    // Another admin is active (or a ghost session exists). Show login so they can override it.
    if (!sessionId || activeSession.session_id !== sessionId) {
      return <AdminLogin />;
    }

    await touchAdminSession(client, sessionId);
    const data = await loadDashboardData(client);
    return <AdminDashboardClient initialData={data} />;
  } catch {
    // On unexpected errors, avoid exposing route internals.
    notFound();
  } finally {
    try {
      await client.end();
    } catch {
      // silent
    }
  }
}

