import React, { CSSProperties } from 'react';

export interface AgreementItem {
  id: string;
  label: string;
  required: boolean;
  href?: string;
  children?: React.ReactNode;
}

export interface AgreementProps {
  items: AgreementItem[];
  values: string[];
  onChange: (values: string[]) => void;
  allLabel?: string;
}

function CircleCheck({ checked, size = 22 }: { checked: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" style={{ flexShrink: 0 }}>
      <circle cx="11" cy="11" r="11" fill={checked ? '#3182f6' : '#e5e8eb'} />
      <path d="M6 11l3.5 3.5 6.5-7" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Agreement({ items, values, onChange, allLabel = '전체 동의' }: AgreementProps) {
  const allChecked = items.every(item => values.includes(item.id));

  const toggleAll = () => {
    onChange(allChecked ? [] : items.map(i => i.id));
  };

  const toggleItem = (id: string) => {
    onChange(values.includes(id) ? values.filter(v => v !== id) : [...values, id]);
  };

  const rowStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: '12px 0',
  };

  return (
    <div>
      <div
        style={{ ...rowStyle, paddingTop: 16, paddingBottom: 16, borderBottom: '1px solid #f2f4f6', cursor: 'pointer' }}
        onClick={toggleAll}
      >
        <CircleCheck checked={allChecked} />
        <span style={{ fontSize: 16, fontWeight: 600, color: '#191f28', flex: 1 }}>{allLabel}</span>
      </div>
      {items.map(item => {
        const checked = values.includes(item.id);
        return (
          <div key={item.id} style={rowStyle}>
            <div style={{ cursor: 'pointer' }} onClick={() => toggleItem(item.id)}>
              <CircleCheck checked={checked} size={20} />
            </div>
            <span style={{ fontSize: 15, fontWeight: 400, color: '#333d4b', flex: 1 }}>
              <span style={{ color: item.required ? '#3182f6' : '#b0b8c1', marginRight: 4, fontSize: 13, fontWeight: 500 }}>
                {item.required ? '(필수)' : '(선택)'}
              </span>
              {item.label}
            </span>
            {item.href && (
              <a href={item.href} style={{ color: '#b0b8c1', textDecoration: 'none', fontSize: 13 }}>
                {'›'}
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}
