import React, { CSSProperties } from 'react';

export interface BadgeProps {
  count?: number;
  showZero?: boolean;
  max?: number;
  dot?: boolean;
  color?: string;
  textColor?: string;
  children?: React.ReactNode;
  visible?: boolean;
  offset?: [number, number];
}

export function Badge({
  count,
  showZero = false,
  max = 99,
  dot = false,
  color = '#f04452',
  textColor = '#ffffff',
  children,
  visible = true,
  offset = [0, 0],
}: BadgeProps) {
  const shouldShow = visible && (dot || (count !== undefined && (count > 0 || showZero)));

  const badgeStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: `translate(calc(50% + ${offset[0]}px), calc(-50% + ${-offset[1]}px))`,
    backgroundColor: color,
    color: textColor,
    borderRadius: dot ? '50%' : 9,
    minWidth: dot ? 8 : 18,
    height: dot ? 8 : 18,
    padding: dot ? 0 : '0 4px',
    fontSize: 11,
    fontWeight: 700,
    lineHeight: dot ? undefined : '18px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
  };

  const label = count !== undefined && count > max ? `${max}+` : count;

  if (!children) {
    if (!shouldShow) return null;
    return <span style={badgeStyle}>{!dot && label}</span>;
  }

  return (
    <span style={{ position: 'relative', display: 'inline-flex' }}>
      {children}
      {shouldShow && <span style={badgeStyle}>{!dot && label}</span>}
    </span>
  );
}
