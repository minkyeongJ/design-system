import React from 'react';

export interface GridListProps {
  items?: React.ReactNode[];
  columns?: number;
  gap?: number;
  padding?: number;
}

export const GridList: React.FC<GridListProps> = ({
  items = [],
  columns = 2,
  gap = 12,
  padding = 20,
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: gap,
    padding: padding,
  };

  return (
    <div style={containerStyle}>
      {items.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
};
