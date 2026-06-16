import React from 'react';

export interface ListHeaderProps {
  title?: string;
  rightAction?: React.ReactNode;
  description?: string;
  paddingTop?: number;
  paddingHorizontal?: number;
}

export const ListHeader: React.FC<ListHeaderProps> = ({
  title,
  rightAction,
  description,
  paddingTop = 24,
  paddingHorizontal = 20,
}) => {
  const containerStyle: React.CSSProperties = {
    paddingLeft: paddingHorizontal,
    paddingRight: paddingHorizontal,
    paddingTop: paddingTop,
    paddingBottom: 8,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 500,
    color: '#8b95a1',
    textTransform: 'uppercase',
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 400,
    color: '#8b95a1',
    marginTop: 4,
  };

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  return (
    <div style={containerStyle}>
      {rightAction ? (
        <div style={rowStyle}>
          {title && <div style={titleStyle}>{title}</div>}
          <div>{rightAction}</div>
        </div>
      ) : (
        title && <div style={titleStyle}>{title}</div>
      )}
      {description && <div style={descriptionStyle}>{description}</div>}
    </div>
  );
};
