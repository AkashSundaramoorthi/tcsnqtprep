import { cookies } from "next/headers";
import { createClient } from "@vercel/postgres";
import { createHmac } from "crypto";
import AdminLogin from "@/components/AdminLogin";

type CountRow = { cnt: number };
type EventRow = { event_name: string; cnt: number };
type RecentRow = {
  id: number;
  event_name: string;
  properties: unknown;
  ip_address: string | null;
  fingerprint: string | null;
  device_type: string | null;
  created_at: string;
};
type LabelCountRow = { label: string | null; cnt: number };

type DashboardData = {
  totalEvents: number;
  pageViews7d: number;
  pageViews30d: number;
  uniqueIp7d: number;
  uniqueIp30d: number;
  uniqueFingerprint7d: number;
  uniqueFingerprint30d: number;
  perEventRows: EventRow[];
  recentRows: RecentRow[];
  deviceRows: LabelCountRow[];
  langRows: LabelCountRow[];
  pyqRows: LabelCountRow[];
  examRows: LabelCountRow[];
  topIpRows: LabelCountRow[];
  topFingerprintRows: LabelCountRow[];
  loadError: boolean;
};

const tableCellStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  fontSize: 13,
};

async function verifyAdmin() {
  const cookieStore = await cookies();
  const tokenInCookie = cookieStore.get("admin-auth")?.value;
  if (!tokenInCookie || !process.env.ADMIN_DASHBOARD_SECRET) return false;

  const expectedToken = createHmac("sha256", process.env.ADMIN_DASHBOARD_SECRET)
    .update(process.env.ADMIN_DASHBOARD_SECRET)
    .digest("hex");
  return tokenInCookie === expectedToken;
}

function mask(value: string | null | undefined, head = 8) {
  if (!value) return "(unknown)";
  if (value.length <= head) return value;
  return `${value.slice(0, head)}…`;
}

async function loadDashboardData(): Promise<DashboardData> {
  const data: DashboardData = {
    totalEvents: 0,
    pageViews7d: 0,
    pageViews30d: 0,
    uniqueIp7d: 0,
    uniqueIp30d: 0,
    uniqueFingerprint7d: 0,
    uniqueFingerprint30d: 0,
    perEventRows: [],
    recentRows: [],
    deviceRows: [],
    langRows: [],
    pyqRows: [],
    examRows: [],
    topIpRows: [],
    topFingerprintRows: [],
    loadError: false,
  };

  const client = createClient();
  try {
    await client.connect();

    const totalRes = await client.sql`SELECT COUNT(*)::int AS cnt FROM events`;
    data.totalEvents = (totalRes.rows as CountRow[])[0]?.cnt ?? 0;

    const pv7Res = await client.sql`SELECT COUNT(*)::int AS cnt FROM events WHERE event_name = 'page_view' AND created_at > now() - interval '7 days'`;
    data.pageViews7d = (pv7Res.rows as CountRow[])[0]?.cnt ?? 0;

    const pv30Res = await client.sql`SELECT COUNT(*)::int AS cnt FROM events WHERE event_name = 'page_view' AND created_at > now() - interval '30 days'`;
    data.pageViews30d = (pv30Res.rows as CountRow[])[0]?.cnt ?? 0;

    const uniqueIp7dRes = await client.sql`SELECT COUNT(DISTINCT ip_address)::int AS cnt FROM events WHERE ip_address IS NOT NULL AND created_at > now() - interval '7 days'`;
    data.uniqueIp7d = (uniqueIp7dRes.rows as CountRow[])[0]?.cnt ?? 0;

    const uniqueIp30dRes = await client.sql`SELECT COUNT(DISTINCT ip_address)::int AS cnt FROM events WHERE ip_address IS NOT NULL AND created_at > now() - interval '30 days'`;
    data.uniqueIp30d = (uniqueIp30dRes.rows as CountRow[])[0]?.cnt ?? 0;

    const uniqueFp7dRes = await client.sql`SELECT COUNT(DISTINCT fingerprint)::int AS cnt FROM events WHERE fingerprint IS NOT NULL AND created_at > now() - interval '7 days'`;
    data.uniqueFingerprint7d = (uniqueFp7dRes.rows as CountRow[])[0]?.cnt ?? 0;

    const uniqueFp30dRes = await client.sql`SELECT COUNT(DISTINCT fingerprint)::int AS cnt FROM events WHERE fingerprint IS NOT NULL AND created_at > now() - interval '30 days'`;
    data.uniqueFingerprint30d = (uniqueFp30dRes.rows as CountRow[])[0]?.cnt ?? 0;

    const perEventRes = await client.sql`
      SELECT event_name, COUNT(*)::int AS cnt
      FROM events
      WHERE created_at > now() - interval '30 days'
      GROUP BY event_name
      ORDER BY cnt DESC, event_name ASC
      LIMIT 100
    `;
    data.perEventRows = perEventRes.rows as EventRow[];

    const recentRes = await client.sql`
      SELECT id, event_name, properties, ip_address, fingerprint, device_type, created_at
      FROM events
      ORDER BY created_at DESC
      LIMIT 50
    `;
    data.recentRows = recentRes.rows as RecentRow[];

    const deviceRes = await client.sql`
      SELECT COALESCE(device_type, '(unknown)') AS label, COUNT(*)::int AS cnt
      FROM events
      WHERE created_at > now() - interval '30 days'
      GROUP BY 1
      ORDER BY cnt DESC
      LIMIT 10
    `;
    data.deviceRows = deviceRes.rows as LabelCountRow[];

    const langRes = await client.sql`
      SELECT COALESCE(properties->>'language', '(unknown)') AS label, COUNT(*)::int AS cnt
      FROM events
      WHERE event_name = 'coding_language_changed'
      GROUP BY 1
      ORDER BY cnt DESC
      LIMIT 10
    `;
    data.langRows = langRes.rows as LabelCountRow[];

    const pyqRes = await client.sql`
      SELECT COALESCE(properties->>'category', '(unknown)') AS label, COUNT(*)::int AS cnt
      FROM events
      WHERE event_name = 'pyq_category_selected'
      GROUP BY 1
      ORDER BY cnt DESC
      LIMIT 10
    `;
    data.pyqRows = pyqRes.rows as LabelCountRow[];

    const examRes = await client.sql`
      SELECT COALESCE(properties->>'score', '(unknown)') AS label, COUNT(*)::int AS cnt
      FROM events
      WHERE event_name = 'exam_completed'
      GROUP BY 1
      ORDER BY cnt DESC
      LIMIT 10
    `;
    data.examRows = examRes.rows as LabelCountRow[];

    const topIpRes = await client.sql`
      SELECT ip_address AS label, COUNT(*)::int AS cnt
      FROM events
      WHERE ip_address IS NOT NULL AND created_at > now() - interval '30 days'
      GROUP BY ip_address
      ORDER BY cnt DESC
      LIMIT 10
    `;
    data.topIpRows = topIpRes.rows as LabelCountRow[];

    const topFpRes = await client.sql`
      SELECT fingerprint AS label, COUNT(*)::int AS cnt
      FROM events
      WHERE fingerprint IS NOT NULL AND created_at > now() - interval '30 days'
      GROUP BY fingerprint
      ORDER BY cnt DESC
      LIMIT 10
    `;
    data.topFingerprintRows = topFpRes.rows as LabelCountRow[];
  } catch {
    data.loadError = true;
  } finally {
    try {
      await client.end();
    } catch {
      // no-op
    }
  }

  return data;
}

function CountCard({ title, value, subtitle }: { title: string; value: number; subtitle?: string }) {
  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 12,
        padding: 14,
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.8 }}>{title}</div>
      <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.2, marginTop: 6 }}>{value.toLocaleString()}</div>
      {subtitle ? <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>{subtitle}</div> : null}
    </div>
  );
}

function BreakdownList({ title, rows }: { title: string; rows: LabelCountRow[] }) {
  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 12,
        padding: 14,
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <h4 style={{ margin: 0, marginBottom: 10 }}>{title}</h4>
      {rows.length === 0 ? (
        <p style={{ margin: 0, opacity: 0.7, fontSize: 13 }}>No data yet</p>
      ) : (
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.8 }}>
          {rows.map((r, idx) => (
            <li key={`${r.label ?? "unknown"}-${idx}`}>
              {r.label ?? "(unknown)"} — {r.cnt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default async function Page() {
  const isAuth = await verifyAdmin();
  if (!isAuth) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Admin Analytics Login</h2>
        <p>This dashboard is protected. Enter the admin secret to continue.</p>
        <AdminLogin />
      </div>
    );
  }

  const data = await loadDashboardData();

  return (
    <div style={{ padding: 24, display: "grid", gap: 18 }}>
      <div>
        <h1 style={{ margin: 0 }}>Analytics (Private)</h1>
        <p style={{ marginTop: 6, opacity: 0.85 }}>
          Events + visitor insights (IP + browser fingerprint) for your production traffic.
        </p>
        {data.loadError ? (
          <p style={{ color: "#fca5a5", marginTop: 8 }}>
            Some dashboard data could not be loaded. Verify database connectivity and table schema.
          </p>
        ) : null}
      </div>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        <CountCard title="Total Events (all-time)" value={data.totalEvents} />
        <CountCard title="Page Views (7d)" value={data.pageViews7d} />
        <CountCard title="Page Views (30d)" value={data.pageViews30d} />
        <CountCard title="Unique IPs (7d)" value={data.uniqueIp7d} />
        <CountCard title="Unique IPs (30d)" value={data.uniqueIp30d} />
        <CountCard title="Unique Fingerprints (7d)" value={data.uniqueFingerprint7d} />
        <CountCard title="Unique Fingerprints (30d)" value={data.uniqueFingerprint30d} />
      </section>

      <section
        style={{
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 12,
          overflow: "hidden",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <h3 style={{ margin: 0 }}>Event Counts (last 30 days)</h3>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...tableCellStyle, textAlign: "left", opacity: 0.75 }}>Event</th>
              <th style={{ ...tableCellStyle, textAlign: "right", opacity: 0.75 }}>Count</th>
            </tr>
          </thead>
          <tbody>
            {data.perEventRows.map((r) => (
              <tr key={r.event_name}>
                <td style={{ ...tableCellStyle, fontFamily: "var(--font-mono)" }}>{r.event_name}</td>
                <td style={{ ...tableCellStyle, textAlign: "right", fontWeight: 600 }}>{r.cnt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section
        style={{
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 12,
          overflow: "hidden",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <h3 style={{ margin: 0 }}>Recent Events (last 50)</h3>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 960 }}>
            <thead>
              <tr>
                <th style={{ ...tableCellStyle, textAlign: "left", opacity: 0.75 }}>When</th>
                <th style={{ ...tableCellStyle, textAlign: "left", opacity: 0.75 }}>Event</th>
                <th style={{ ...tableCellStyle, textAlign: "left", opacity: 0.75 }}>IP</th>
                <th style={{ ...tableCellStyle, textAlign: "left", opacity: 0.75 }}>Fingerprint</th>
                <th style={{ ...tableCellStyle, textAlign: "left", opacity: 0.75 }}>Device</th>
                <th style={{ ...tableCellStyle, textAlign: "left", opacity: 0.75 }}>Properties</th>
              </tr>
            </thead>
            <tbody>
              {data.recentRows.map((r) => (
                <tr key={r.id}>
                  <td style={tableCellStyle}>{new Date(r.created_at).toLocaleString()}</td>
                  <td style={{ ...tableCellStyle, fontFamily: "var(--font-mono)" }}>{r.event_name}</td>
                  <td style={tableCellStyle} title={r.ip_address ?? ""}>
                    {mask(r.ip_address, 24)}
                  </td>
                  <td style={tableCellStyle} title={r.fingerprint ?? ""}>
                    {mask(r.fingerprint, 36)}
                  </td>
                  <td style={tableCellStyle}>{r.device_type ?? "(unknown)"}</td>
                  <td style={{ ...tableCellStyle, maxWidth: 360 }}>
                    <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: 12 }}>
                      {JSON.stringify(r.properties)}
                    </pre>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        <BreakdownList title="Device Type Mix (30d)" rows={data.deviceRows} />
        <BreakdownList title="Top Coding Languages" rows={data.langRows} />
        <BreakdownList title="Top PYQ Categories" rows={data.pyqRows} />
        <BreakdownList title="Exam Score Distribution" rows={data.examRows} />
        <BreakdownList title="Top IPs (30d)" rows={data.topIpRows} />
        <BreakdownList title="Top Fingerprints (30d)" rows={data.topFingerprintRows} />
      </section>
    </div>
  );
}
