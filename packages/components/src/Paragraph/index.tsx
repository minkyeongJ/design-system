import React, { CSSProperties } from 'react';

export interface ParagraphProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  size?: 'large' | 'medium' | 'small';
  color?: string;
  align?: 'left' | 'center' | 'right';
  lineClamp?: number;
  as?: keyof JSX.IntrinsicElements;
}

const sizeMap = {
  large: { fontSize: 17, lineHeight: '26px' },
  medium: { fontSize: 15, lineHeight: '23px' },
  small: { fontSize: 13, lineHeight: '20px' },
};

export function Paragraph({
  children,
  size = 'medium',
  color = '#333d4b',
  align = 'left',
  lineClamp,
  as: Tag = 'p',
  style,
  ...rest
}: ParagraphProps) {
  const clampStyle: CSSProperties = lineClamp
    ? {
        display: '-webkit-box',
        WebkitLineClamp: lineClamp,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }
    : {};

  const paragraphStyle: CSSProperties = {
    margin: 0,
    fontWeight: 400,
    color,
    textAlign: align,
    ...sizeMap[size],
    ...clampStyle,
    ...style,
  };

  return (
    <Tag style={paragraphStyle} {...rest}>
      {children}
    </Tag>
  );
}
