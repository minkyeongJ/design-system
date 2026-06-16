import React, { CSSProperties } from 'react';

export interface ResultProps {
  status?: 'success' | 'error' | 'warning' | 'info' | 'empty';
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  extra?: React.ReactNode;
  imageUrl?: string;
}

const defaultIcons: Record<string, React.ReactNode> = {
  success: (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="32" fill="#03b26c" />
      <path d="M18 32l10 10 18-18" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  error: (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="32" fill="#f04452" />
      <path d="M22 22l20 20M42 22L22 42" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <path d="M32 4L60 56H4L32 4z" fill="#fe9800" />
      <rect x="30" y="24" width="4" height="16" rx="2" fill="white" />
      <rect x="30" y="44" width="4" height="4" rx="2" fill="white" />
    </svg>
  ),
  info: (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="32" fill="#3182f6" />
      <rect x="30" y="28" width="4" height="18" rx="2" fill="white" />
      <rect x="30" y="18" width="4" height="4" rx="2" fill="white" />
    </svg>
  ),
  empty: (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <rect x="8" y="8" width="48" height="48" rx="8" fill="#e5e8eb" />
      <path d="M20 32h24M20 24h16M20 40h20" stroke="#8b95a1" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
};

export function Result({ status = 'info', title, description, icon, extra, imageUrl }: ResultProps) {
  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '60px 40px',
  };

  return (
    <div style={containerStyle}>
      {imageUrl ? (
        <img src={imageUrl} alt="" style={{ width: 120, marginBottom: 24 }} />
      ) : (
        <div style={{ marginBottom: 24 }}>{icon ?? defaultIcons[status]}</div>
      )}
      {title && <p style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 700, color: '#191f28' }}>{title}</p>}
      {description && (
        <p style={{ margin: 0, fontSize: 15, fontWeight: 400, color: '#8b95a1', lineHeight: '1.6' }}>{description}</p>
      )}
      {extra && <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>{extra}</div>}
    </div>
  );
}
