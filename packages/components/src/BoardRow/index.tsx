import React from 'react';

export interface BoardRowProps {
  title?: string;
  content?: string;
  author?: string;
  date?: string;
  views?: number;
  commentCount?: number;
  thumbnail?: string;
  badge?: string;
  onClick?: React.MouseEventHandler;
  divider?: boolean;
}

export const BoardRow: React.FC<BoardRowProps> = ({
  title,
  content,
  author,
  date,
  views,
  commentCount,
  thumbnail,
  badge,
  onClick,
  divider = true,
}) => {
  const containerStyle: React.CSSProperties = {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: 'white',
    cursor: onClick ? 'pointer' : 'default',
    borderBottom: divider ? '1px solid #f2f4f6' : 'none',
    overflow: 'hidden',
  };

  const lineClamp2: React.CSSProperties = {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };

  const metaItems: string[] = [];
  if (author) metaItems.push(author);
  if (date) metaItems.push(date);
  if (views !== undefined) metaItems.push(`조회 ${views}`);
  if (commentCount !== undefined) metaItems.push(`댓글 ${commentCount}`);

  return (
    <div style={containerStyle} onClick={onClick}>
      {thumbnail && (
        <img
          src={thumbnail}
          alt=""
          style={{
            width: 72,
            height: 72,
            borderRadius: 8,
            float: 'right',
            marginLeft: 12,
            objectFit: 'cover',
          }}
        />
      )}
      {badge && (
        <div
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: '#3182f6',
            marginBottom: 6,
          }}
        >
          {badge}
        </div>
      )}
      {title && (
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: '#191f28',
            marginBottom: 4,
            ...lineClamp2,
          }}
        >
          {title}
        </div>
      )}
      {content && (
        <div
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: '#6b7684',
            marginBottom: 8,
            ...lineClamp2,
          }}
        >
          {content}
        </div>
      )}
      {metaItems.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 8,
            fontSize: 12,
            fontWeight: 400,
            color: '#b0b8c1',
          }}
        >
          {metaItems.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      )}
    </div>
  );
};
