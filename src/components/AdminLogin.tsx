"use client";
import { useState } from "react";
import type { FormEvent } from "react";

export default function AdminLogin({ onSuccess }:{ onSuccess?: ()=>void }){
  const [secret, setSecret] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers:{ "content-type":"application/json" },
        body: JSON.stringify({ secret }),
      });
      if (res.ok) {
        onSuccess?.();
        window.location.reload();
      } else if (res.status === 404) {
        setError("Admin panel is currently occupied by another active session.");
      } else {
        setError("Invalid secret");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container section" style={{ maxWidth: 560, paddingTop: 24 }}>
      <article className="card" style={{ padding: 20 }}>
        <h2>Admin Access</h2>
        <p style={{ marginTop: 8, color: "var(--text-2)" }}>
          Enter your dashboard secret to view private analytics.
        </p>
        <form onSubmit={submit} style={{ marginTop: 16, display: "grid", gap: 10 }}>
          <label htmlFor="admin-secret" style={{ fontSize: 13, color: "var(--text-2)" }}>
            Secret key
          </label>
          <input
            id="admin-secret"
            value={secret}
            onChange={(e)=>setSecret(e.target.value)}
            type="password"
            autoComplete="current-password"
            style={{
              width: "100%",
              padding: "11px 12px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "var(--bg-2)",
              color: "var(--text)",
              outline: "none",
            }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Entering..." : "Enter dashboard"}
            </button>
          </div>
          {error ? (
            <div style={{ color: "var(--red)", fontSize: 13 }}>{error}</div>
          ) : null}
        </form>
      </article>
    </section>
  );
}
