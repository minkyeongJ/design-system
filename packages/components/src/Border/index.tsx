import React, { CSSProperties } from 'react';

export interface BorderProps {
  orientation?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: number;
  spacing?: number;
  inset?: number;
}

export function Border({
  orientation = 'horizontal',
  color = '#f2f4f6',
  thickness = 1,
  spacing = 0,
  inset = 0,
}: BorderProps) {
  const style: CSSProperties =
    orientation === 'horizontal'
      ? {
          width: inset > 0 ? `calc(100% - ${inset * 2}px)` : '100%',
          height: thickness,
          backgroundColor: color,
          marginLeft: inset,
          marginRight: inset,
          marginTop: spacing,
          marginBottom: spacing,
          flexShrink: 0,
        }
      : {
          width: thickness,
          height: '100%',
          backgroundColor: color,
          marginLeft: spacing,
          marginRight: spacing,
          flexShrink: 0,
        };

  return <div style={style} />;
}
