import React, { CSSProperties } from 'react';

export interface PostProps {
  title: string;
  content?: string;
  author?: { name: string; avatar?: string };
  date?: string;
  category?: string;
  tags?: string[];
  thumbnail?: string;
  likes?: number;
  comments?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function Post({ title, content, author, date, category, tags, thumbnail, likes, comments, onClick }: PostProps) {
  const cardStyle: CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
    cursor: onClick ? 'pointer' : 'default',
  };

  const clamp2: CSSProperties = {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };

  return (
    <div style={cardStyle} onClick={onClick}>
      {thumbnail && (
        <img src={thumbnail} alt="" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />
      )}
      <div style={{ padding: 16 }}>
        {category && <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 500, color: '#3182f6' }}>{category}</p>}
        <p style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 600, color: '#191f28', ...clamp2 }}>{title}</p>
        {content && (
          <p style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 400, color: '#6b7684', ...clamp2 }}>{content}</p>
        )}
        {tags && tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
            {tags.map(tag => (
              <span key={tag} style={{ fontSize: 12, color: '#8b95a1', backgroundColor: '#f2f4f6', padding: '3px 8px', borderRadius: 20 }}>
                {tag}
              </span>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          {author && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {author.avatar ? (
                <img src={author.avatar} alt={author.name} style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#e5e8eb' }} />
              )}
              <span style={{ fontSize: 13, fontWeight: 500, color: '#4e5968' }}>{author.name}</span>
            </div>
          )}
          <div style={{ display: 'flex', gap: 12 }}>
            {date && <span style={{ fontSize: 12, color: '#b0b8c1' }}>{date}</span>}
            {likes !== undefined && <span style={{ fontSize: 12, color: '#b0b8c1' }}>♥ {likes}</span>}
            {comments !== undefined && <span style={{ fontSize: 12, color: '#b0b8c1' }}>💬 {comments}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
