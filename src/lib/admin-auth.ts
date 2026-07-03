import { randomUUID } from "crypto";

export const ADMIN_SESSION_COOKIE = "admin-session";
const ADMIN_SESSION_TTL_MINUTES = 30;

type SessionRow = {
  session_id: string;
};

export async function ensureAdminSessionTable(client: { sql: any }) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS admin_sessions (
      session_id TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      expires_at TIMESTAMPTZ NOT NULL
    )
  `;
  await client.sql`CREATE INDEX IF NOT EXISTS admin_sessions_expires_idx ON admin_sessions (expires_at)`;
}

export async function purgeExpiredAdminSessions(client: { sql: any }) {
  await client.sql`DELETE FROM admin_sessions WHERE expires_at <= now()`;
}

export async function getActiveAdminSession(client: { sql: any }) {
  const result = await client.sql`
    SELECT session_id
    FROM admin_sessions
    WHERE expires_at > now()
    ORDER BY last_seen_at DESC
    LIMIT 1
  `;
  return (result.rows as SessionRow[])[0] ?? null;
}

export async function createAdminSession(client: { sql: any }) {
  const sessionId = randomUUID();
  await client.sql`
    INSERT INTO admin_sessions (session_id, expires_at)
    VALUES (${sessionId}, now() + (${ADMIN_SESSION_TTL_MINUTES}::text || ' minutes')::interval)
  `;
  return sessionId;
}

export async function touchAdminSession(client: { sql: any }, sessionId: string) {
  await client.sql`
    UPDATE admin_sessions
    SET last_seen_at = now(),
        expires_at = now() + (${ADMIN_SESSION_TTL_MINUTES}::text || ' minutes')::interval
    WHERE session_id = ${sessionId}
  `;
}

export async function deleteAdminSession(client: { sql: any }, sessionId: string) {
  await client.sql`DELETE FROM admin_sessions`;
}
