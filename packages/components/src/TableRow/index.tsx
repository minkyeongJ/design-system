import React from 'react';

export interface TableRowProps {
  label?: string;
  value?: React.ReactNode;
  labelWidth?: number | string;
  divider?: boolean;
  labelStyle?: React.CSSProperties;
  valueStyle?: React.CSSProperties;
  onClick?: React.MouseEventHandler;
  rightIcon?: React.ReactNode;
}

export const TableRow: React.FC<TableRowProps> = ({
  label,
  value,
  labelWidth = 120,
  divider = true,
  labelStyle,
  valueStyle,
  onClick,
  rightIcon,
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 14,
    paddingBottom: 14,
    minHeight: 48,
    borderBottom: divider ? '1px solid #f2f4f6' : 'none',
    cursor: onClick ? 'pointer' : 'default',
    backgroundColor: 'white',
    boxSizing: 'border-box',
  };

  const labelBaseStyle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 400,
    color: '#8b95a1',
    width: labelWidth,
    flexShrink: 0,
  };

  const valueBaseStyle: React.CSSProperties = {
    flex: 1,
    fontSize: 15,
    fontWeight: 400,
    color: '#191f28',
    textAlign: 'right',
  };

  return (
    <div style={containerStyle} onClick={onClick}>
      {label !== undefined && (
        <div style={{ ...labelBaseStyle, ...labelStyle }}>{label}</div>
      )}
      <div style={{ ...valueBaseStyle, ...valueStyle }}>{value}</div>
      {rightIcon && (
        <div style={{ marginLeft: 8 }}>{rightIcon}</div>
      )}
    </div>
  );
};
