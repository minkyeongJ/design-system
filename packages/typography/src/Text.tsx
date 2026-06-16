import React, { CSSProperties } from 'react';
import { typographyTokens, fontWeightMap, TypographyToken, FontWeight } from './tokens';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  token: TypographyToken;
  weight?: FontWeight;
  color?: string;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}

export function Text({
  token,
  weight = 'Regular',
  color,
  as: Tag = 'span',
  style,
  children,
  ...rest
}: TextProps) {
  const { fontSize, lineHeight } = typographyTokens[token];

  const textStyle: CSSProperties = {
    fontSize,
    lineHeight: `${lineHeight}px`,
    fontWeight: fontWeightMap[weight],
    color,
    margin: 0,
    ...style,
  };

  return (
    <Tag style={textStyle} {...rest}>
      {children}
    </Tag>
  );
}
