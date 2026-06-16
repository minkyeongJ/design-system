import React, { CSSProperties } from 'react';

export interface BubbleProps {
  children: React.ReactNode;
  variant?: 'sent' | 'received';
  maxWidth?: number | string;
  timestamp?: string;
  status?: 'sending' | 'sent' | 'read';
}

export function Bubble({
  children,
  variant = 'received',
  maxWidth = '70%',
  timestamp,
  status,
}: BubbleProps) {
  const isSent = variant === 'sent';

  const bubbleStyle: CSSProperties = {
    maxWidth,
    padding: '10px 14px',
    borderRadius: isSent ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
    backgroundColor: isSent ? '#3182f6' : '#f2f4f6',
    color: isSent ? '#ffffff' : '#191f28',
    fontSize: 15,
    fontWeight: 400,
    lineHeight: '22px',
    wordBreak: 'break-word',
  };

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: isSent ? 'flex-end' : 'flex-start',
    marginLeft: isSent ? 'auto' : undefined,
    marginRight: isSent ? undefined : 'auto',
  };

  const metaStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
    justifyContent: isSent ? 'flex-end' : 'flex-start',
  };

  const statusIcon = status === 'read' ? '✓✓' : status === 'sent' ? '✓' : '…';

  return (
    <div style={containerStyle}>
      <div style={bubbleStyle}>{children}</div>
      {(timestamp || status) && (
        <div style={metaStyle}>
          {isSent && status && (
            <span style={{ fontSize: 11, color: '#8b95a1' }}>{statusIcon}</span>
          )}
          {timestamp && (
            <span style={{ fontSize: 11, color: '#8b95a1' }}>{timestamp}</span>
          )}
        </div>
      )}
    </div>
  );
}
