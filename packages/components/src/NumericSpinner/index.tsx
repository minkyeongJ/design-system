import React, { useState } from 'react';

export interface NumericSpinnerProps {
  value?: string;
  onChange?: (value: string) => void;
  min?: number;
  max?: number;
  placeholder?: string;
  disabled?: boolean;
  suffix?: string;
  prefix?: string;
}

export const NumericSpinner: React.FC<NumericSpinnerProps> = ({
  value: controlledValue,
  onChange,
  min,
  max,
  placeholder,
  disabled = false,
  suffix,
  prefix,
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [focused, setFocused] = useState(false);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.-]/g, '');
    if (min !== undefined || max !== undefined) {
      const num = parseFloat(raw);
      if (!isNaN(num)) {
        if (min !== undefined && num < min) return;
        if (max !== undefined && num > max) return;
      }
    }
    if (!isControlled) setInternalValue(raw);
    onChange?.(raw);
  };

  const wrapperStyle: React.CSSProperties = {
    height: 52,
    border: `1.5px solid ${focused ? '#3182f6' : '#e5e8eb'}`,
    borderRadius: 12,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: disabled ? '#f9fafb' : '#ffffff',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    boxSizing: 'border-box',
    opacity: disabled ? 0.4 : 1,
    transition: 'border-color 0.15s ease',
  };

  const auxStyle: React.CSSProperties = {
    fontSize: 16, fontWeight: 400, color: '#8b95a1', flexShrink: 0,
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    fontSize: 16,
    fontWeight: 400,
    color: '#191f28',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    padding: 0,
    textAlign: 'right',
    minWidth: 0,
  };

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      <div style={wrapperStyle}>
        {prefix && <span style={auxStyle}>{prefix}</span>}
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          style={inputStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {suffix && <span style={auxStyle}>{suffix}</span>}
      </div>
    </div>
  );
};
