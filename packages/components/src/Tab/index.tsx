import React from 'react';

export interface TabProps {
  items: { key: string; label: string; badge?: number | string; disabled?: boolean }[];
  activeKey: string;
  onChange: (key: string) => void;
  variant?: 'line' | 'pill';
  fullWidth?: boolean;
}

export const Tab: React.FC<TabProps> = ({
  items,
  activeKey,
  onChange,
  variant = 'line',
  fullWidth = false,
}) => {
  if (variant === 'pill') {
    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      gap: 8,
      padding: 4,
      backgroundColor: '#f2f4f6',
      borderRadius: 12,
    };

    return (
      <div style={containerStyle}>
        {items.map((item) => {
          const isActive = item.key === activeKey;
          const itemStyle: React.CSSProperties = {
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 8,
            paddingBottom: 8,
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 500,
            color: isActive ? '#191f28' : '#6b7684',
            backgroundColor: isActive ? 'white' : 'transparent',
            boxShadow: isActive ? '0 1px 4px rgba(0,0,0,0.12)' : 'none',
            cursor: item.disabled ? 'not-allowed' : 'pointer',
            opacity: item.disabled ? 0.4 : 1,
            border: 'none',
            outline: 'none',
            transition: '0.15s ease',
          };

          return (
            <button
              key={item.key}
              style={itemStyle}
              onClick={() => !item.disabled && onChange(item.key)}
              disabled={item.disabled}
            >
              {item.label}
              {item.badge !== undefined && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f04452',
                    color: 'white',
                    fontSize: 10,
                    fontWeight: 700,
                    minWidth: 16,
                    height: 16,
                    borderRadius: 8,
                    marginLeft: 4,
                    padding: '0 4px',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // line variant
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #e5e8eb',
  };

  return (
    <div style={containerStyle}>
      {items.map((item) => {
        const isActive = item.key === activeKey;
        const itemStyle: React.CSSProperties = {
          flex: fullWidth ? 1 : undefined,
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 12,
          paddingBottom: isActive ? 10 : 12,
          fontSize: 15,
          fontWeight: 500,
          color: isActive ? '#191f28' : '#8b95a1',
          borderBottom: isActive ? '2px solid #191f28' : 'none',
          marginBottom: isActive ? -1 : 0,
          cursor: item.disabled ? 'not-allowed' : 'pointer',
          opacity: item.disabled ? 0.4 : 1,
          background: 'none',
          border: 'none',
          borderBottomStyle: isActive ? 'solid' : undefined,
          borderBottomWidth: isActive ? 2 : undefined,
          borderBottomColor: isActive ? '#191f28' : undefined,
          outline: 'none',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
        };

        return (
          <button
            key={item.key}
            style={itemStyle}
            onClick={() => !item.disabled && onChange(item.key)}
            disabled={item.disabled}
          >
            {item.label}
            {item.badge !== undefined && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f04452',
                  color: 'white',
                  fontSize: 10,
                  fontWeight: 700,
                  minWidth: 16,
                  height: 16,
                  borderRadius: 8,
                  marginLeft: 4,
                  padding: '0 4px',
                }}
              >
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
