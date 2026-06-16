import React, { ChangeEventHandler, useState, useRef } from 'react';

export interface SearchFieldProps {
  value?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="8" cy="8" r="5.5" stroke="#8b95a1" strokeWidth="1.5" />
    <path d="M12.5 12.5L16 16" stroke="#8b95a1" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const SearchField: React.FC<SearchFieldProps> = ({
  value: controlledValue,
  defaultValue,
  onChange,
  onSearch,
  onClear,
  placeholder = '검색',
  disabled = false,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const [focused, setFocused] = useState(false);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch?.(value);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue('');
    onClear?.();
    inputRef.current?.focus();
  };

  const wrapperStyle: React.CSSProperties = {
    height: 44,
    backgroundColor: '#f2f4f6',
    borderRadius: 12,
    paddingLeft: 14,
    paddingRight: 14,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    boxSizing: 'border-box',
    border: focused ? '1.5px solid #3182f6' : '1.5px solid transparent',
    transition: 'border-color 0.15s ease',
    opacity: disabled ? 0.4 : 1,
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    fontSize: 15,
    fontWeight: 400,
    color: '#191f28',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    padding: 0,
    minWidth: 0,
  };

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      <div style={wrapperStyle}>
        <SearchIcon />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          style={inputStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            style={{
              width: 18, height: 18, borderRadius: '50%', border: 'none',
              backgroundColor: '#b0b8c1', color: '#ffffff', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              padding: 0, flexShrink: 0,
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M1 1L7 7M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
