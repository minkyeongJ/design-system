import React, { CSSProperties } from 'react';

export interface HighlightProps {
  text: string;
  highlight: string | string[];
  highlightStyle?: CSSProperties;
  caseSensitive?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export function Highlight({
  text,
  highlight,
  highlightStyle = { backgroundColor: '#ffefbf', borderRadius: 3 },
  caseSensitive = false,
  as: Tag = 'span',
}: HighlightProps) {
  const terms = Array.isArray(highlight) ? highlight : [highlight];
  const filtered = terms.filter(Boolean);

  if (filtered.length === 0) return <Tag>{text}</Tag>;

  const flags = caseSensitive ? 'g' : 'gi';
  const pattern = filtered.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`(${pattern})`, flags);
  const parts = text.split(regex);

  return (
    <Tag>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} style={{ ...highlightStyle, padding: '0 1px' }}>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </Tag>
  );
}
