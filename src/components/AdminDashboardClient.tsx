"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { DashboardData } from "@/lib/admin-analytics";

function mask(str: string | null, len: number) {
  if (!str) return "(unknown)";
  // Masking temporarily disabled for testing
  return str;
}

function parseFingerprint(fp: string | null | undefined) {
  if (!fp) return { os: "(unknown)", browser: "(unknown)" };
  const ua = fp.split("|")[0]?.toLowerCase() || "";
  
  let os = "(unknown)";
  if (ua.includes("windows")) os = "Windows";
  else if (ua.includes("mac os") || ua.includes("macos")) os = "Mac";
  else if (ua.includes("android")) os = "Android";
  else if (ua.includes("linux")) os = "Linux";
  else if (ua.includes("ios") || ua.includes("iphone") || ua.includes("ipad")) os = "iOS";
  
  let browser = "(unknown)";
  if (ua.includes("edg") || ua.includes("edge")) browser = "Edge";
  else if (ua.includes("opr") || ua.includes("opera")) browser = "Opera";
  else if (ua.includes("chrome") && !ua.includes("edg") && !ua.includes("opr")) browser = "Chrome";
  else if (ua.includes("safari") && !ua.includes("chrome")) browser = "Safari";
  else if (ua.includes("firefox")) browser = "Firefox";
  
  return { os, browser };
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

function Funnel({ title, data }: { title: string, data: { pv: number, started: number, completed: number } }) {
  const c1 = data.pv > 0 ? Math.round((data.started / data.pv) * 100) : 0;
  const c2 = data.started > 0 ? Math.round((data.completed / data.started) * 100) : 0;
  return (
    <article className="card" style={{ padding: 14 }}>
      <h4 style={{ marginBottom: 10 }}>{title} Funnel</h4>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: 13 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Page Views</span>
          <strong style={{ fontFamily: "var(--font-mono)" }}>{data.pv.toLocaleString()}</strong>
        </div>
        <div style={{ fontSize: "11px", color: "var(--text-3)", borderLeft: "2px solid var(--border)", marginLeft: "10px", paddingLeft: "10px", height: "16px", lineHeight: "16px" }}>
          {c1}% conversion
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Started</span>
          <strong style={{ fontFamily: "var(--font-mono)" }}>{data.started.toLocaleString()}</strong>
        </div>
        <div style={{ fontSize: "11px", color: "var(--text-3)", borderLeft: "2px solid var(--border)", marginLeft: "10px", paddingLeft: "10px", height: "16px", lineHeight: "16px" }}>
          {c2}% conversion
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Completed</span>
          <strong style={{ fontFamily: "var(--font-mono)" }}>{data.completed.toLocaleString()}</strong>
        </div>
      </div>
    </article>
  );
}

function DailyPageViews({ data }: { data: { day: string, cnt: number }[] }) {
  if (!data || data.length === 0) {
    return (
      <section className="card" style={{ padding: "12px 14px", marginBottom: 14 }}>
        <h3 style={{ marginBottom: 10 }}>Daily Page Views (Last 30 Days)</h3>
        <p style={{ color: "var(--text-3)", fontSize: 13 }}>No data yet</p>
      </section>
    );
  }
  const max = Math.max(...data.map(d => d.cnt), 1);
  return (
    <section className="card" style={{ padding: "12px 14px", marginBottom: 14 }}>
      <h3 style={{ marginBottom: 10 }}>Daily Page Views (Last 30 Days)</h3>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "120px", marginTop: "20px" }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }} title={`${d.day}: ${d.cnt}`}>
            <div style={{ width: "100%", background: "var(--primary)", height: `${(d.cnt / max) * 100}%`, minHeight: "1px", borderRadius: "2px" }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-3)", marginTop: "8px" }}>
        <span>{data[0].day}</span>
        <span>{data[data.length - 1].day}</span>
      </div>
    </section>
  );
}

function ExamDropoff({ data }: { data: { qIdx: string, correct: number, incorrect: number }[] }) {
  if (data.length === 0) return null;
  return (
    <section className="card" style={{ padding: "12px 14px", marginBottom: 14, overflowX: "auto" }}>
      <h3 style={{ marginBottom: 10 }}>Exam Question Performance</h3>
      <div style={{ display: "flex", gap: "8px", minWidth: "max-content", paddingBottom: "8px" }}>
        {data.map((d, i) => {
          const total = d.correct + d.incorrect;
          const p = total > 0 ? Math.round((d.correct / total) * 100) : 0;
          return (
            <div key={i} style={{ width: "32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }} title={`Q${parseInt(d.qIdx)+1}: ${d.correct} correct, ${d.incorrect} incorrect (${p}%)`}>
              <div style={{ height: "80px", width: "100%", background: "var(--surface-2)", position: "relative", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "var(--green)", height: `${p}%`, minHeight: d.correct > 0 ? "1px" : "0" }} />
              </div>
              <span style={{ fontSize: "10px", color: "var(--text-3)" }}>{parseInt(d.qIdx)+1}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function AdminDashboardClient({ initialData }: { initialData: DashboardData }) {
  const [data, setData] = useState(initialData);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [sessionLost, setSessionLost] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [visibleRecent, setVisibleRecent] = useState(5);

  const filteredRecent = useMemo(() => {
    return data.recentRows.filter((r) => {
      if (!filterText) return true;
      const term = filterText.toLowerCase();
      if (r.event_name.toLowerCase().includes(term)) return true;
      if (r.ip_address && r.ip_address.toLowerCase().includes(term)) return true;
      if (r.device_type && r.device_type.toLowerCase().includes(term)) return true;
      if (r.properties && JSON.stringify(r.properties).toLowerCase().includes(term)) return true;
      return false;
    });
  }, [data.recentRows, filterText]);

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
      if (next.loadError) {
        setData((prev) => ({ ...prev, loadError: true }));
      } else {
        setData(next);
      }
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
        <CountCard title="Unique Devices (7d)" value={data.uniqueFingerprint7d} />
        <CountCard title="Unique Devices (30d)" value={data.uniqueFingerprint30d} />
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 14 }}>
        <Funnel title="Coding" data={data.funnelCoding} />
        <Funnel title="Exam" data={data.funnelExam} />
        <Funnel title="PYQ" data={data.funnelPyq} />
      </section>

      <DailyPageViews data={data.dailyPageViews} />
      <ExamDropoff data={data.examDropoff} />

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
        <header style={{ padding: "12px 14px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <h3 style={{ margin: 0 }}>Recent Events (live feed)</h3>
          <input
            type="text"
            placeholder="Filter events, device, IP..."
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
              setVisibleRecent(5);
            }}
            className="input"
            style={{ padding: "6px 10px", borderRadius: "4px", border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)", fontSize: "13px", minWidth: "200px" }}
          />
        </header>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1024 }}>
            <thead>
              <tr>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "var(--text-2)" }}>When</th>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "var(--text-2)" }}>Event</th>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "var(--text-2)" }}>IP</th>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "var(--text-2)" }}>OS</th>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "var(--text-2)" }}>Browser</th>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "var(--text-2)" }}>Device</th>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "var(--text-2)" }}>Properties</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecent.slice(0, visibleRecent).map((r) => {
                const { os, browser } = parseFingerprint(r.fingerprint);
                return (
                  <tr key={r.id}>
                    <td style={{ padding: "10px 12px", borderTop: "1px solid var(--border)" }}>{new Date(r.created_at).toLocaleString()}</td>
                    <td style={{ padding: "10px 12px", borderTop: "1px solid var(--border)", fontFamily: "var(--font-mono)" }}>
                      {r.event_name}
                    </td>
                    <td style={{ padding: "10px 12px", borderTop: "1px solid var(--border)" }} title={r.ip_address ?? ""}>
                      {mask(r.ip_address, 24)}
                    </td>
                    <td style={{ padding: "10px 12px", borderTop: "1px solid var(--border)" }}>
                      {os}
                    </td>
                    <td style={{ padding: "10px 12px", borderTop: "1px solid var(--border)" }}>
                      {browser}
                    </td>
                    <td style={{ padding: "10px 12px", borderTop: "1px solid var(--border)" }}>{r.device_type ?? "(unknown)"}</td>
                    <td style={{ padding: "10px 12px", borderTop: "1px solid var(--border)" }}>
                      <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: 12 }}>
                        {JSON.stringify(r.properties)}
                      </pre>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {visibleRecent < filteredRecent.length && (
          <div style={{ padding: "12px 14px", borderTop: "1px solid var(--border)", textAlign: "center" }}>
            <button className="btn btn-ghost" onClick={() => setVisibleRecent(v => v + 5)}>
              Load More
            </button>
          </div>
        )}
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        <BreakdownList title="Device Type Mix (30d)" rows={data.deviceRows} />
        <BreakdownList title="Top Coding Languages" rows={data.langRows} />
        <BreakdownList title="Top PYQ Categories" rows={data.pyqRows} />
        <BreakdownList title="Exam Score Distribution" rows={data.examRows} />
        <BreakdownList 
          title="Top IPs (30d)" 
          rows={data.topIpRows.map(r => ({ ...r, label: mask(r.label, 24) }))} 
        />
        <BreakdownList 
          title="Top Active Users (30d)" 
          rows={data.topFingerprintRows.map(r => {
            if (!r.label) return r;
            const { os, browser } = parseFingerprint(r.label);
            // Use a small slice of the raw string to distinguish unique users with the same OS/Browser
            const id = r.label.length > 8 ? r.label.substring(0, 8) : r.label;
            return { ...r, label: `${os} - ${browser} [${id}…]` };
          })} 
        />
      </section>
    </div>
  );
}
