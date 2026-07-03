"use client";
import { useState } from "react";

export default function AdminLogin({ onSuccess }:{ onSuccess?: ()=>void }){
  const [secret, setSecret] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: any) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/login', { method: 'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ secret }) });
      if (res.ok) {
        onSuccess?.();
        // reload to let server render protected dashboard
        window.location.reload();
      } else {
        setError('Invalid secret');
      }
    } catch (e) {
      setError('Network error');
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={submit} style={{maxWidth:420, margin:'0 auto'}}>
      <label style={{display:'block', marginBottom:8}}>Enter admin secret</label>
      <input value={secret} onChange={(e)=>setSecret(e.target.value)} type="password" style={{width:'100%', padding:8, marginBottom:8}} />
      <button type="submit" disabled={loading} style={{padding:'8px 12px'}}>Enter</button>
      {error && <div style={{color:'red', marginTop:8}}>{error}</div>}
    </form>
  );
}
