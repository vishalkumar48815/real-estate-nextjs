
'use client';

import React, { useEffect } from 'react';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Error caught by error.tsx:', error);
  }, [error]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', color: '#ff4d4f' }}>Something went wrong</h1>
      <p style={{ margin: '20px 0', fontSize: '1.2rem' }}>{error.message}</p>
      <button
        style={{
          padding: '12px 24px',
          backgroundColor: '#1677ff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
