import { cookies } from 'next/headers';
import { createClient } from '@vercel/postgres';
import AdminLogin from '@/components/AdminLogin';

const verifyAdmin = () => {
  const c = cookies().get('admin-auth')?.value;
  if (!c || !process.env.ADMIN_DASHBOARD_SECRET) return false;
  // recreate token server-side
  const crypto = require('crypto');
  const token = crypto.createHmac('sha256', process.env.ADMIN_DASHBOARD_SECRET).update(process.env.ADMIN_DASHBOARD_SECRET).digest('hex');
  return c === token;
};

export default async function Page() {
  const isAuth = verifyAdmin();
  if (!isAuth) {
    return (
      <div style={{padding:24}}>
        <h2>Admin Analytics Login</h2>
        <p>This dashboard is protected. Enter the admin secret to continue.</p>
        <AdminLogin />
      </div>
    );
  }

  // fetch analytics data from Postgres
  const client = createClient();
  await client.connect();

  // total events
  const totalRes = await client.sql`SELECT COUNT(*)::int AS total FROM events`;
  const total = totalRes?.rows?.[0]?.total ?? 0;

  // page views last 7 days
  const pv7 = await client.sql`SELECT COUNT(*)::int AS cnt FROM events WHERE event_name='page_view' AND created_at > now() - interval '7 days'`;
  const pageViews7 = pv7?.rows?.[0]?.cnt ?? 0;

  // counts per event name (last 30 days)
  const perEvent = await client.sql`
    SELECT event_name, COUNT(*)::int AS cnt FROM events
    WHERE created_at > now() - interval '30 days'
    GROUP BY event_name ORDER BY cnt DESC LIMIT 100
  `;

  // recent events
  const recent = await client.sql`SELECT id, event_name, properties, created_at FROM events ORDER BY created_at DESC LIMIT 50`;

  // breakdowns
  const langBreakdown = await client.sql`SELECT properties->>'language' AS language, COUNT(*)::int AS cnt FROM events WHERE event_name='coding_language_changed' GROUP BY 1 ORDER BY cnt DESC`;
  const pyqCategory = await client.sql`SELECT properties->>'category' AS category, COUNT(*)::int AS cnt FROM events WHERE event_name='pyq_category_selected' GROUP BY 1 ORDER BY cnt DESC`;
  const examScores = await client.sql`SELECT (properties->>'score') AS score, COUNT(*)::int AS cnt FROM events WHERE event_name='exam_completed' GROUP BY 1 ORDER BY score::int DESC`;

  await client.end();

  return (
    <div style={{padding:24}}>
      <h1>Analytics (Private)</h1>
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
            {perEvent.rows.map((r: any) => (
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
            {recent.rows.map((r: any) => (
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
              {langBreakdown.rows.map((r: any, i:number) => (
                <li key={i}>{r.language ?? '(unknown)'} — {r.cnt}</li>
              ))}
            </ul>
          </div>
          <div style={{flex:1}}>
            <h4>PYQ categories</h4>
            <ul>
              {pyqCategory.rows.map((r:any,i:number)=>(<li key={i}>{r.category ?? '(unknown)'} — {r.cnt}</li>))}
            </ul>
          </div>
          <div style={{flex:1}}>
            <h4>Exam scores (exam_completed)</h4>
            <ul>
              {examScores.rows.map((r:any,i:number)=>(<li key={i}>{r.score ?? '(unknown)'} — {r.cnt}</li>))}
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
