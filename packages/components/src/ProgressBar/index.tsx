import React, { CSSProperties } from 'react';

export interface ProgressBarProps {
  value: number;
  color?: string;
  trackColor?: string;
  height?: number;
  borderRadius?: number;
  animated?: boolean;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = '#3182f6',
  trackColor = '#e5e8eb',
  height = 4,
  borderRadius = 2,
  animated = true,
  label,
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const labelStyle: CSSProperties = {
    fontSize: 13,
    fontWeight: 400,
    color: '#6b7684',
    marginBottom: 4,
  };

  const trackStyle: CSSProperties = {
    width: '100%',
    height,
    backgroundColor: trackColor,
    borderRadius,
    overflow: 'hidden',
  };

  const fillStyle: CSSProperties = {
    width: `${clampedValue}%`,
    height: '100%',
    backgroundColor: color,
    borderRadius,
    transition: animated ? 'width 0.3s ease' : undefined,
  };

  return (
    <div>
      {label && <div style={labelStyle}>{label}</div>}
      <div style={trackStyle}>
        <div style={fillStyle} />
      </div>
    </div>
  );
};
