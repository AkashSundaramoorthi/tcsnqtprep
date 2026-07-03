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

export type DashboardData = {
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

export async function loadDashboardData(client: { sql: any }): Promise<DashboardData> {
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

  try {
    const totalRes = await client.sql`SELECT COUNT(*)::int AS cnt FROM events WHERE NOT (event_name = 'page_view' AND COALESCE(properties->>'path', '') LIKE '/admin%')`;
    data.totalEvents = (totalRes.rows as CountRow[])[0]?.cnt ?? 0;

    const pv7Res = await client.sql`SELECT COUNT(*)::int AS cnt FROM events WHERE event_name = 'page_view' AND COALESCE(properties->>'path', '') NOT LIKE '/admin%' AND created_at > now() - interval '7 days'`;
    data.pageViews7d = (pv7Res.rows as CountRow[])[0]?.cnt ?? 0;

    const pv30Res = await client.sql`SELECT COUNT(*)::int AS cnt FROM events WHERE event_name = 'page_view' AND COALESCE(properties->>'path', '') NOT LIKE '/admin%' AND created_at > now() - interval '30 days'`;
    data.pageViews30d = (pv30Res.rows as CountRow[])[0]?.cnt ?? 0;

    const uniqueIp7dRes = await client.sql`SELECT COUNT(DISTINCT ip_address)::int AS cnt FROM events WHERE ip_address IS NOT NULL AND NOT (event_name = 'page_view' AND COALESCE(properties->>'path', '') LIKE '/admin%') AND created_at > now() - interval '7 days'`;
    data.uniqueIp7d = (uniqueIp7dRes.rows as CountRow[])[0]?.cnt ?? 0;

    const uniqueIp30dRes = await client.sql`SELECT COUNT(DISTINCT ip_address)::int AS cnt FROM events WHERE ip_address IS NOT NULL AND NOT (event_name = 'page_view' AND COALESCE(properties->>'path', '') LIKE '/admin%') AND created_at > now() - interval '30 days'`;
    data.uniqueIp30d = (uniqueIp30dRes.rows as CountRow[])[0]?.cnt ?? 0;

    const uniqueFp7dRes = await client.sql`SELECT COUNT(DISTINCT fingerprint)::int AS cnt FROM events WHERE fingerprint IS NOT NULL AND NOT (event_name = 'page_view' AND COALESCE(properties->>'path', '') LIKE '/admin%') AND created_at > now() - interval '7 days'`;
    data.uniqueFingerprint7d = (uniqueFp7dRes.rows as CountRow[])[0]?.cnt ?? 0;

    const uniqueFp30dRes = await client.sql`SELECT COUNT(DISTINCT fingerprint)::int AS cnt FROM events WHERE fingerprint IS NOT NULL AND NOT (event_name = 'page_view' AND COALESCE(properties->>'path', '') LIKE '/admin%') AND created_at > now() - interval '30 days'`;
    data.uniqueFingerprint30d = (uniqueFp30dRes.rows as CountRow[])[0]?.cnt ?? 0;

    const perEventRes = await client.sql`
      SELECT event_name, COUNT(*)::int AS cnt
      FROM events
      WHERE NOT (event_name = 'page_view' AND COALESCE(properties->>'path', '') LIKE '/admin%')
        AND created_at > now() - interval '30 days'
      GROUP BY event_name
      ORDER BY cnt DESC, event_name ASC
      LIMIT 100
    `;
    data.perEventRows = perEventRes.rows as EventRow[];

    const recentRes = await client.sql`
      SELECT id, event_name, properties, ip_address, fingerprint, device_type, created_at
      FROM events
      WHERE NOT (event_name = 'page_view' AND COALESCE(properties->>'path', '') LIKE '/admin%')
      ORDER BY created_at DESC
      LIMIT 50
    `;
    data.recentRows = recentRes.rows as RecentRow[];

    const deviceRes = await client.sql`
      SELECT COALESCE(device_type, '(unknown)') AS label, COUNT(*)::int AS cnt
      FROM events
      WHERE NOT (event_name = 'page_view' AND COALESCE(properties->>'path', '') LIKE '/admin%')
        AND created_at > now() - interval '30 days'
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
      WHERE ip_address IS NOT NULL
        AND NOT (event_name = 'page_view' AND COALESCE(properties->>'path', '') LIKE '/admin%')
        AND created_at > now() - interval '30 days'
      GROUP BY ip_address
      ORDER BY cnt DESC
      LIMIT 10
    `;
    data.topIpRows = topIpRes.rows as LabelCountRow[];

    const topFpRes = await client.sql`
      SELECT fingerprint AS label, COUNT(*)::int AS cnt
      FROM events
      WHERE fingerprint IS NOT NULL
        AND NOT (event_name = 'page_view' AND COALESCE(properties->>'path', '') LIKE '/admin%')
        AND created_at > now() - interval '30 days'
      GROUP BY fingerprint
      ORDER BY cnt DESC
      LIMIT 10
    `;
    data.topFingerprintRows = topFpRes.rows as LabelCountRow[];
  } catch {
    data.loadError = true;
  }

  return data;
}
