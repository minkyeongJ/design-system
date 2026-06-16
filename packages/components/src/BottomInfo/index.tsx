import React from 'react';

export interface BottomInfoProps {
  title?: string;
  items?: string[];
  icon?: React.ReactNode;
  variant?: 'info' | 'warning' | 'error';
}

export const BottomInfo: React.FC<BottomInfoProps> = ({
  title,
  items = [],
  icon,
  variant = 'info',
}) => {
  const bgColor =
    variant === 'info'
      ? '#e8f3ff'
      : variant === 'warning'
      ? '#fff3e0'
      : '#ffeeee';

  const containerStyle: React.CSSProperties = {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 12,
    backgroundColor: bgColor,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 600,
    color: '#333d4b',
    marginBottom: 6,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  };

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    fontSize: 13,
    fontWeight: 400,
    color: '#6b7684',
    marginTop: 2,
  };

  return (
    <div style={containerStyle}>
      {title && (
        <div style={titleStyle}>
          {icon && <span>{icon}</span>}
          <span>{title}</span>
        </div>
      )}
      {items.map((item, index) => (
        <div key={index} style={itemStyle}>
          <span>•</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
};
