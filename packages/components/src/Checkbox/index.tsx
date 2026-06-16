import React, { useState, ReactNode } from 'react';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  label?: ReactNode;
  id?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  indeterminate = false,
  label,
  id,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleChange = () => {
    if (disabled) return;
    const next = !checked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  const boxStyle: React.CSSProperties = {
    width: 20,
    height: 20,
    borderRadius: 5,
    border: checked || indeterminate ? 'none' : '2px solid #c9cdd2',
    backgroundColor: checked || indeterminate ? '#3182f6' : 'transparent',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    cursor: disabled ? 'not-allowed' : 'pointer',
    boxSizing: 'border-box',
  };

  const wrapperStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    opacity: disabled ? 0.4 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '15px',
    fontWeight: 400,
    color: '#191f28',
  };

  return (
    <label htmlFor={id} style={wrapperStyle}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      <span style={boxStyle} onClick={handleChange}>
        {indeterminate ? (
          <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
            <rect width="10" height="2" rx="1" fill="white" />
          </svg>
        ) : checked ? (
          <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
            <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </span>
      {label && <span style={labelStyle}>{label}</span>}
    </label>
  );
};
