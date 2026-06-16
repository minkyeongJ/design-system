import React, { ChangeEventHandler, HTMLInputTypeAttribute, ReactNode, useState, useRef } from 'react';

export interface TextFieldProps {
  value?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  label?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  type?: HTMLInputTypeAttribute;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  clearable?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder,
  label,
  helperText,
  errorText,
  disabled = false,
  readOnly = false,
  maxLength,
  type = 'text',
  leftIcon,
  rightIcon,
  clearable = false,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const [focused, setFocused] = useState(false);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const inputRef = useRef<HTMLInputElement>(null);

  const hasError = !!errorText;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue('');
    const nativeInput = inputRef.current;
    if (nativeInput && onChange) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
      nativeInputValueSetter?.call(nativeInput, '');
      nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
    inputRef.current?.focus();
  };

  const wrapperStyle: React.CSSProperties = {
    height: 52,
    border: `1.5px solid ${hasError ? '#f04452' : focused ? '#3182f6' : '#e5e8eb'}`,
    borderRadius: 12,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: disabled ? '#f9fafb' : '#ffffff',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    boxSizing: 'border-box',
    transition: 'border-color 0.15s ease',
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    fontSize: 16,
    fontWeight: 400,
    color: disabled ? '#b0b8c1' : '#191f28',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    padding: 0,
    minWidth: 0,
  };

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      {label && (
        <div style={{ fontSize: 14, fontWeight: 500, color: '#6b7684', marginBottom: 6 }}>{label}</div>
      )}
      <div style={wrapperStyle}>
        {leftIcon && <span style={{ display: 'inline-flex', color: '#b0b8c1' }}>{leftIcon}</span>}
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          style={inputStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {clearable && value && !disabled && !readOnly && (
          <button
            type="button"
            onClick={handleClear}
            style={{
              width: 20, height: 20, borderRadius: '50%', border: 'none',
              backgroundColor: '#b0b8c1', color: '#ffffff', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              padding: 0, flexShrink: 0,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
        {rightIcon && !clearable && <span style={{ display: 'inline-flex', color: '#b0b8c1' }}>{rightIcon}</span>}
      </div>
      {(helperText || errorText) && (
        <div style={{ fontSize: 13, fontWeight: 400, color: hasError ? '#f04452' : '#8b95a1', marginTop: 4 }}>
          {errorText || helperText}
        </div>
      )}
    </div>
  );
};
