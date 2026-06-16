import React, { MouseEventHandler, ReactNode, useEffect } from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'large' | 'medium' | 'small';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}

const SPINNER_STYLE_ID = 'moap-button-spinner-style';

function injectSpinnerStyle() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(SPINNER_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = SPINNER_STYLE_ID;
  style.textContent = `
    @keyframes moap-spin {
      to { transform: rotate(360deg); }
    }
    .moap-spinner {
      animation: moap-spin 0.7s linear infinite;
    }
  `;
  document.head.appendChild(style);
}

const variantStyles: Record<string, React.CSSProperties> = {
  primary: { backgroundColor: '#3182f6', color: '#ffffff' },
  secondary: { backgroundColor: '#f2f4f6', color: '#191f28' },
  tertiary: { backgroundColor: 'transparent', color: '#3182f6' },
};

const sizeStyles: Record<string, React.CSSProperties> = {
  large: { height: '52px', paddingLeft: '20px', paddingRight: '20px', fontSize: '17px', fontWeight: 500, borderRadius: '12px' },
  medium: { height: '44px', paddingLeft: '16px', paddingRight: '16px', fontSize: '15px', fontWeight: 500, borderRadius: '10px' },
  small: { height: '36px', paddingLeft: '12px', paddingRight: '12px', fontSize: '13px', fontWeight: 500, borderRadius: '8px' },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'large',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  onClick,
  children,
}) => {
  useEffect(() => { injectSpinnerStyle(); }, []);

  const isDisabled = disabled || loading;

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    border: 'none',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    outline: 'none',
    opacity: disabled ? 0.4 : 1,
    width: fullWidth ? '100%' : undefined,
    boxSizing: 'border-box',
    userSelect: 'none',
    transition: 'background-color 0.15s ease',
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  const spinnerSize = size === 'large' ? 20 : size === 'medium' ? 16 : 14;
  const spinnerColor = variant === 'primary' ? '#ffffff' : variant === 'tertiary' ? '#3182f6' : '#191f28';

  return (
    <button style={baseStyle} disabled={isDisabled} onClick={onClick}>
      {loading ? (
        <span
          className="moap-spinner"
          style={{
            display: 'inline-block',
            width: spinnerSize,
            height: spinnerSize,
            border: `2px solid transparent`,
            borderTopColor: spinnerColor,
            borderRadius: '50%',
          }}
        />
      ) : (
        <>
          {leftIcon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{leftIcon}</span>}
          {children}
          {rightIcon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
