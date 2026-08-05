import React from 'react';

export default function InfosysLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', flexDirection: 'column' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>Coming Soon</h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
        We are working hard to bring you the best Infosys preparation content. Stay tuned!
      </p>
    </div>
  );
}
