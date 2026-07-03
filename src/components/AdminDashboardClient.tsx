"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { DashboardData } from "@/lib/admin-analytics";

function mask(value: string | null | undefined, head = 8) {
  if (!value) return "(unknown)";
  if (value.length <= head) return value;
  return `${value.slice(0, head)}…`;
}

function CountCard({ title, value, subtitle }: { title: string; value: number; subtitle?: string }) {
  return (
    <article className="card" style={{ padding: 14 }}>
      <p style={{ fontSize: 12, color: "var(--text-2)" }}>{title}</p>
      <h3 style={{ marginTop: 6, fontSize: 28 }}>{value.toLocaleString()}</h3>
      {subtitle ? <p style={{ marginTop: 4, fontSize: 12, color: "var(--text-3)" }}>{subtitle}</p> : null}
    </article>
  );
}

function BreakdownList({ title, rows }: { title: string; rows: Array<{ label: string | null; cnt: number }> }) {
  return (
    <article className="card" style={{ padding: 14 }}>
      <h4 style={{ marginBottom: 10 }}>{title}</h4>
      {rows.length === 0 ? (
        <p style={{ color: "var(--text-3)", fontSize: 13 }}>No data yet</p>
      ) : (
        <ul style={{ paddingLeft: 18, fontSize: 13, lineHeight: 1.8 }}>
          {rows.map((r, idx) => (
            <li key={`${r.label ?? "unknown"}-${idx}`}>
              {r.label ?? "(unknown)"} — {r.cnt}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function AdminDashboardClient({ initialData }: { initialData: DashboardData }) {
  const [data, setData] = useState(initialData);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [sessionLost, setSessionLost] = useState(false);

  const refresh = useCallback(async () => {
    try {
      setRefreshing(true);
      const res = await fetch("/api/admin/analytics/live", { cache: "no-store" });
      if (res.status === 404 || res.status === 401) {
        setSessionLost(true);
        return;
      }
      if (!res.ok) return;
      const next = (await res.json()) as DashboardData;
      setData(next);
      setLastUpdated(new Date());
    } catch {
      // silent
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      void refresh();
    }, 5000);
    return () => window.clearInterval(timer);
  }, [refresh]);

  async function logout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // silent
    } finally {
      window.location.href = "/admin/analytics";
    }
  }

  const topSummary = useMemo(
    () =>
      `Live updates every 5s · Last refresh ${lastUpdated.toLocaleTimeString()}${refreshing ? " · Refreshing…" : ""}`,
    [lastUpdated, refreshing],
  );

  return (
    <div className="container section" style={{ paddingTop: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
        <div>
          <h1>Analytics Control Panel</h1>
          <p style={{ marginTop: 6, color: "var(--text-2)" }}>{topSummary}</p>
          {sessionLost ? (
            <p style={{ marginTop: 6, color: "var(--orange)" }}>
              Live session check failed. Refresh the page if you want to re-authenticate.
            </p>
          ) : null}
          {data.loadError ? (
            <p style={{ marginTop: 6, color: "var(--red)" }}>
              Some sections could not be loaded. Check database connectivity and schema.
            </p>
          ) : null}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button type="button" className="btn btn-ghost" onClick={() => void refresh()}>
            Refresh now
          </button>
          <button type="button" className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 14 }}>
        <CountCard title="Total Events (all-time)" value={data.totalEvents} />
        <CountCard title="Page Views (7d)" value={data.pageViews7d} />
        <CountCard title="Page Views (30d)" value={data.pageViews30d} />
        <CountCard title="Coding Completed" value={data.codingCompletedTotal} subtitle="All-time" />
        <CountCard title="PYQ Papers Taken" value={data.pyqTakenTotal} subtitle="All-time" />
        <CountCard
          title="Average Exam Score"
          value={Math.round(data.averageExamScore)}
          subtitle={`${data.averageExamPercentage.toFixed(1)}% avg percentage`}
        />
        <CountCard title="Unique IPs (7d)" value={data.uniqueIp7d} />
        <CountCard title="Unique IPs (30d)" value={data.uniqueIp30d} />
        <CountCard title="Unique Fingerprints (7d)" value={data.uniqueFingerprint7d} />
        <CountCard title="Unique Fingerprints (30d)" value={data.uniqueFingerprint30d} />
      </section>

      <section className="card" style={{ overflow: "hidden", marginBottom: 14 }}>
        <header style={{ padding: "12px 14px", borderBottom: "1px solid var(--border)" }}>
          <h3>Event Counts (last 30 days)</h3>
        </header>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ padding: "10px 12px", textAlign: "left", color: "var(--text-2)" }}>Event</th>
              <th style={{ padding: "10px 12px", textAlign: "right", color: "var(--text-2)" }}>Count</th>
            </tr>
          </thead>
          <tbody>
            {data.perEventRows.map((r) => (
              <tr key={r.event_name}>
                <td style={{ padding: "10px 12px", borderTop: "1px solid var(--border)", fontFamily: "var(--font-mono)" }}>
                  {r.event_name}
                </td>
                <td style={{ padding: "10px 12px", borderTop: "1px solid var(--border)", textAlign: "right", fontWeight: 600 }}>
                  {r.cnt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card" style={{ overflow: "hidden", marginBottom: 14 }}>
        <header style={{ padding: "12px 14px", borderBottom: "1px solid var(--border)" }}>
          <h3>Recent Events (live feed)</h3>
        </header>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1024 }}>
            <thead>
              <tr>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "var(--text-2)" }}>When</th>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "var(--text-2)" }}>Event</th>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "var(--text-2)" }}>IP</th>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "var(--text-2)" }}>Fingerprint</th>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "var(--text-2)" }}>Device</th>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "var(--text-2)" }}>Properties</th>
              </tr>
            </thead>
            <tbody>
              {data.recentRows.map((r) => (
                <tr key={r.id}>
                  <td style={{ padding: "10px 12px", borderTop: "1px solid var(--border)" }}>{new Date(r.created_at).toLocaleString()}</td>
                  <td style={{ padding: "10px 12px", borderTop: "1px solid var(--border)", fontFamily: "var(--font-mono)" }}>
                    {r.event_name}
                  </td>
                  <td style={{ padding: "10px 12px", borderTop: "1px solid var(--border)" }} title={r.ip_address ?? ""}>
                    {mask(r.ip_address, 24)}
                  </td>
                  <td style={{ padding: "10px 12px", borderTop: "1px solid var(--border)" }} title={r.fingerprint ?? ""}>
                    {mask(r.fingerprint, 36)}
                  </td>
                  <td style={{ padding: "10px 12px", borderTop: "1px solid var(--border)" }}>{r.device_type ?? "(unknown)"}</td>
                  <td style={{ padding: "10px 12px", borderTop: "1px solid var(--border)" }}>
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
