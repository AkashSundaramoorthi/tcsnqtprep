import { cookies } from 'next/headers';
import { createClient } from '@vercel/postgres';
import { createHmac } from 'crypto';
import AdminLogin from '@/components/AdminLogin';

const verifyAdmin = async () => {
  const cookieStore = await cookies();
  const c = cookieStore.get('admin-auth')?.value;
  if (!c || !process.env.ADMIN_DASHBOARD_SECRET) return false;
  const token = createHmac('sha256', process.env.ADMIN_DASHBOARD_SECRET)
    .update(process.env.ADMIN_DASHBOARD_SECRET)
    .digest('hex');
  return c === token;
};

export default async function Page() {
  const isAuth = await verifyAdmin();
  if (!isAuth) {
    return (
      <div style={{padding:24}}>
        <h2>Admin Analytics Login</h2>
        <p>This dashboard is protected. Enter the admin secret to continue.</p>
        <AdminLogin />
      </div>
    );
  }

  let total = 0;
  let pageViews7 = 0;
  let perEventRows: Array<{ event_name: string; cnt: number }> = [];
  let recentRows: Array<{ id: number; event_name: string; properties: unknown; created_at: string }> = [];
  let langRows: Array<{ language: string | null; cnt: number }> = [];
  let pyqRows: Array<{ category: string | null; cnt: number }> = [];
  let examRows: Array<{ score: string | null; cnt: number }> = [];
  let loadError = false;

  const client = createClient();
  try {
    await client.connect();
    const totalRes = await client.sql`SELECT COUNT(*)::int AS total FROM events`;
    total = totalRes?.rows?.[0]?.total ?? 0;

    const pv7 = await client.sql`SELECT COUNT(*)::int AS cnt FROM events WHERE event_name='page_view' AND created_at > now() - interval '7 days'`;
    pageViews7 = pv7?.rows?.[0]?.cnt ?? 0;

    const perEvent = await client.sql`
      SELECT event_name, COUNT(*)::int AS cnt FROM events
      WHERE created_at > now() - interval '30 days'
      GROUP BY event_name ORDER BY cnt DESC LIMIT 100
    `;
    perEventRows = perEvent.rows as Array<{ event_name: string; cnt: number }>;

    const recent = await client.sql`SELECT id, event_name, properties, created_at FROM events ORDER BY created_at DESC LIMIT 50`;
    recentRows = recent.rows as Array<{ id: number; event_name: string; properties: unknown; created_at: string }>;
    try {
      const langBreakdown = await client.sql`SELECT properties->>'language' AS language, COUNT(*)::int AS cnt FROM events WHERE event_name='coding_language_changed' GROUP BY 1 ORDER BY cnt DESC`;
      langRows = langBreakdown.rows as Array<{ language: string | null; cnt: number }>;
    } catch {
      langRows = [];
    }

    try {
      const pyqCategory = await client.sql`SELECT properties->>'category' AS category, COUNT(*)::int AS cnt FROM events WHERE event_name='pyq_category_selected' GROUP BY 1 ORDER BY cnt DESC`;
      pyqRows = pyqCategory.rows as Array<{ category: string | null; cnt: number }>;
    } catch {
      pyqRows = [];
    }

    try {
      const examScores = await client.sql`SELECT COALESCE(properties->>'score', '(unknown)') AS score, COUNT(*)::int AS cnt FROM events WHERE event_name='exam_completed' GROUP BY 1 ORDER BY cnt DESC`;
      examRows = examScores.rows as Array<{ score: string | null; cnt: number }>;
    } catch {
      examRows = [];
    }
  } catch {
    loadError = true;
  } finally {
    try {
      await client.end();
    } catch {
      // no-op
    }
  }

  return (
    <div style={{padding:24}}>
      <h1>Analytics (Private)</h1>
      {loadError && <p>Unable to load analytics data. Check Postgres environment variables and connectivity.</p>}
      <p>Total events: {total} — Page views (7d): {pageViews7}</p>

      <section style={{marginTop:20}}>
        <h3>Events (last 30 days)</h3>
        <table style={{width:'100%', borderCollapse:'collapse'}}>
          <thead>
            <tr>
              <th style={{textAlign:'left', padding:6}}>Event</th>
              <th style={{textAlign:'right', padding:6}}>Count</th>
            </tr>
          </thead>
          <tbody>
            {perEventRows.map((r) => (
              <tr key={r.event_name}>
                <td style={{padding:6}}>{r.event_name}</td>
                <td style={{padding:6, textAlign:'right'}}>{r.cnt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{marginTop:20}}>
        <h3>Recent events</h3>
        <table style={{width:'100%'}}>
          <thead>
            <tr>
              <th style={{textAlign:'left', padding:6}}>When</th>
              <th style={{textAlign:'left', padding:6}}>Event</th>
              <th style={{textAlign:'left', padding:6}}>Properties</th>
            </tr>
          </thead>
          <tbody>
            {recentRows.map((r) => (
              <tr key={r.id}>
                <td style={{padding:6}}>{new Date(r.created_at).toLocaleString()}</td>
                <td style={{padding:6}}>{r.event_name}</td>
                <td style={{padding:6}}><pre style={{whiteSpace:'pre-wrap', margin:0}}>{JSON.stringify(r.properties)}</pre></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{marginTop:20}}>
        <h3>Breakdowns</h3>
        <div style={{display:'flex', gap:24}}>
          <div style={{flex:1}}>
            <h4>Languages (coding_language_changed)</h4>
            <ul>
              {langRows.map((r, i) => (
                <li key={i}>{r.language ?? '(unknown)'} — {r.cnt}</li>
              ))}
            </ul>
          </div>
          <div style={{flex:1}}>
            <h4>PYQ categories</h4>
            <ul>
              {pyqRows.map((r, i) => (<li key={i}>{r.category ?? '(unknown)'} — {r.cnt}</li>))}
            </ul>
          </div>
          <div style={{flex:1}}>
            <h4>Exam scores (exam_completed)</h4>
            <ul>
              {examRows.map((r, i) => (<li key={i}>{r.score ?? '(unknown)'} — {r.cnt}</li>))}
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
