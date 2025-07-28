'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <h1 style={{ fontSize: '5rem', marginBottom: '20px', color: '#ff4d4f' }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Page Not Found</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/">
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
        >
          Go to Home
        </button>
      </Link>
    </div>
  );
}
