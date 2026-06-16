import React, { useState } from 'react';

export interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  showValue?: boolean;
}

export const Slider: React.FC<SliderProps> = ({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
  showValue = false,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const pct = ((value - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const containerStyle: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    opacity: disabled ? 0.4 : 1,
  };

  const trackContainerStyle: React.CSSProperties = {
    flex: 1,
    position: 'relative',
    height: 20,
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    WebkitAppearance: 'none',
    height: 4,
    borderRadius: 2,
    outline: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    background: `linear-gradient(to right, #3182f6 0%, #3182f6 ${pct}%, #e5e8eb ${pct}%, #e5e8eb 100%)`,
    margin: 0,
  };

  return (
    <div style={containerStyle}>
      <div style={trackContainerStyle}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          style={inputStyle}
        />
      </div>
      {showValue && (
        <span style={{ fontSize: 14, fontWeight: 500, color: '#191f28', minWidth: 32, textAlign: 'right' }}>
          {value}
        </span>
      )}
    </div>
  );
};
