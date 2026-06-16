import React, { CSSProperties, useMemo, useState } from 'react';

export interface KeypadProps {
  onPress: (key: string) => void;
  showDecimal?: boolean;
  shuffle?: boolean;
  disabled?: boolean;
  customKeys?: {
    'bottom-left'?: React.ReactNode;
    'bottom-right'?: React.ReactNode;
  };
}

const BASE_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function Keypad({ onPress, showDecimal = false, shuffle = false, disabled = false, customKeys }: KeypadProps) {
  const [active, setActive] = useState<string | null>(null);

  const topKeys = useMemo(() => (shuffle ? shuffleArray(BASE_KEYS) : BASE_KEYS), [shuffle]);

  const keys: (string | null)[] = [
    ...topKeys,
    showDecimal ? '.' : null,
    '0',
    'backspace',
  ];

  const cellStyle = (key: string | null): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 64,
    backgroundColor: key === null ? '#f2f4f6' : active === key ? '#f2f4f6' : '#ffffff',
    fontSize: key === 'backspace' ? 20 : 22,
    fontWeight: 400,
    color: '#191f28',
    cursor: disabled || key === null ? 'default' : 'pointer',
    userSelect: 'none',
    opacity: disabled ? 0.4 : 1,
    transition: 'background-color 0.1s',
  });

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 1,
    backgroundColor: '#e5e8eb',
  };

  const handlePress = (key: string) => {
    if (disabled) return;
    setActive(key);
    onPress(key);
    setTimeout(() => setActive(null), 100);
  };

  return (
    <div style={gridStyle}>
      {keys.map((key, i) => {
        if (key === 'backspace') {
          return (
            <div key="backspace" style={cellStyle('backspace')} onClick={() => handlePress('backspace')}>
              ←
            </div>
          );
        }
        if (key === null) {
          return <div key={`empty-${i}`} style={cellStyle(null)} />;
        }
        return (
          <div key={key} style={cellStyle(key)} onClick={() => handlePress(key)}>
            {key}
          </div>
        );
      })}
    </div>
  );
}
