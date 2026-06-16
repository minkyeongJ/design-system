import React from 'react';

export interface TopProps {
  title?: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode | React.ReactNode[];
  subtitle?: string;
  transparent?: boolean;
  border?: boolean;
  sticky?: boolean;
}

export const Top: React.FC<TopProps> = ({
  title,
  leftAction,
  rightAction,
  subtitle,
  transparent = false,
  border = true,
  sticky = true,
}) => {
  const containerStyle: React.CSSProperties = {
    height: 56,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: transparent ? 'transparent' : 'white',
    borderBottom: border && !transparent ? '1px solid #f2f4f6' : 'none',
    position: sticky ? 'sticky' : 'relative',
    top: sticky ? 0 : undefined,
    zIndex: sticky ? 100 : undefined,
    boxSizing: 'border-box',
  };

  const leftStyle: React.CSSProperties = {
    width: 40,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
  };

  const titleAreaStyle: React.CSSProperties = {
    flex: 1,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 17,
    fontWeight: 600,
    color: '#191f28',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 400,
    color: '#8b95a1',
    marginTop: 1,
  };

  const rightStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  };

  return (
    <div style={containerStyle}>
      <div style={leftStyle}>{leftAction}</div>
      <div style={titleAreaStyle}>
        {title && <div style={titleStyle}>{title}</div>}
        {subtitle && <div style={subtitleStyle}>{subtitle}</div>}
      </div>
      <div style={rightStyle}>
        {Array.isArray(rightAction)
          ? rightAction.map((action, i) => <React.Fragment key={i}>{action}</React.Fragment>)
          : rightAction}
      </div>
    </div>
  );
};
