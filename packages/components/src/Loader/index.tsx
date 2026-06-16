import React, { CSSProperties } from 'react';

let injected = false;
function injectSpinnerStyle() {
  if (injected || typeof document === 'undefined') return;
  const style = document.createElement('style');
  style.textContent = '@keyframes moap-spin { to { transform: rotate(360deg); } }';
  document.head.appendChild(style);
  injected = true;
}

export interface LoaderProps {
  size?: 'large' | 'medium' | 'small';
  color?: string;
  overlay?: boolean;
}

const sizeMap = {
  large: { dimension: 40, border: 3 },
  medium: { dimension: 24, border: 2 },
  small: { dimension: 16, border: 2 },
};

export const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  color = '#3182f6',
  overlay = false,
}) => {
  injectSpinnerStyle();

  const { dimension, border } = sizeMap[size];

  const spinnerStyle: CSSProperties = {
    width: dimension,
    height: dimension,
    borderRadius: '50%',
    border: `${border}px solid ${color}33`,
    borderTopColor: color,
    animation: 'moap-spin 0.8s linear infinite',
    flexShrink: 0,
  };

  if (overlay) {
    const overlayStyle: CSSProperties = {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(255,255,255,0.8)',
      zIndex: 3000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    return (
      <div style={overlayStyle}>
        <div style={spinnerStyle} />
      </div>
    );
  }

  return <div style={spinnerStyle} />;
};
