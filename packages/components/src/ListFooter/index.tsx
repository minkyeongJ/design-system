import React from 'react';

export interface ListFooterProps {
  children?: React.ReactNode;
  paddingHorizontal?: number;
  paddingVertical?: number;
}

export const ListFooter: React.FC<ListFooterProps> = ({
  children,
  paddingHorizontal = 20,
  paddingVertical = 12,
}) => {
  const containerStyle: React.CSSProperties = {
    paddingLeft: paddingHorizontal,
    paddingRight: paddingHorizontal,
    paddingTop: paddingVertical,
    paddingBottom: paddingVertical,
  };

  const childrenStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 400,
    color: '#b0b8c1',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <div style={childrenStyle}>{children}</div>
    </div>
  );
};
