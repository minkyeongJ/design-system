import React, { useState } from 'react';

export interface StepperProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

export const Stepper: React.FC<StepperProps> = ({
  value: controlledValue,
  defaultValue = 0,
  min,
  max,
  step = 1,
  onChange,
  disabled = false,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const clamp = (v: number) => {
    if (min !== undefined && v < min) return min;
    if (max !== undefined && v > max) return max;
    return v;
  };

  const update = (next: number) => {
    const clamped = clamp(next);
    if (!isControlled) setInternalValue(clamped);
    onChange?.(clamped);
  };

  const btnStyle = (extraDisabled: boolean): React.CSSProperties => ({
    width: 32, height: 32, borderRadius: 8,
    backgroundColor: '#f2f4f6',
    border: 'none',
    cursor: (disabled || extraDisabled) ? 'not-allowed' : 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    padding: 0, flexShrink: 0,
    color: '#4e5968',
    opacity: (disabled || extraDisabled) ? 0.4 : 1,
  });

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, opacity: disabled ? 0.4 : 1 }}>
      <button
        type="button"
        style={btnStyle(min !== undefined && value <= min)}
        onClick={() => update(value - step)}
        disabled={disabled || (min !== undefined && value <= min)}
      >
        <svg width="14" height="2" viewBox="0 0 14 2" fill="none">
          <path d="M1 1H13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
      <span style={{ minWidth: 40, textAlign: 'center', fontSize: 17, fontWeight: 500, color: '#191f28' }}>
        {value}
      </span>
      <button
        type="button"
        style={btnStyle(max !== undefined && value >= max)}
        onClick={() => update(value + step)}
        disabled={disabled || (max !== undefined && value >= max)}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};
