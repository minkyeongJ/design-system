import React from 'react';

export interface SegmentedControlProps {
  items: { key: string; label: string }[];
  value: string;
  onChange: (key: string) => void;
  disabled?: boolean;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  items,
  value,
  onChange,
  disabled = false,
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f2f4f6',
    borderRadius: 10,
    padding: 3,
    opacity: disabled ? 0.4 : 1,
  };

  return (
    <div style={containerStyle}>
      {items.map((item) => {
        const isSelected = item.key === value;
        const segmentStyle: React.CSSProperties = {
          flex: 1,
          paddingTop: 7,
          paddingBottom: 7,
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 500,
          color: isSelected ? '#191f28' : '#6b7684',
          backgroundColor: isSelected ? 'white' : 'transparent',
          borderRadius: isSelected ? 8 : undefined,
          boxShadow: isSelected ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          border: 'none',
          outline: 'none',
          transition: '0.15s ease',
        };

        return (
          <button
            key={item.key}
            style={segmentStyle}
            onClick={() => !disabled && onChange(item.key)}
            disabled={disabled}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};
