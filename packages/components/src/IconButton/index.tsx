import React, { MouseEventHandler, ReactNode } from 'react';

export interface IconButtonProps {
  icon: ReactNode;
  size?: 'large' | 'medium' | 'small';
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  'aria-label': string;
}

const sizeMap = {
  large: { size: 48, radius: 14 },
  medium: { size: 40, radius: 12 },
  small: { size: 32, radius: 8 },
};

const variantMap: Record<string, React.CSSProperties> = {
  primary: { backgroundColor: '#3182f6', color: '#ffffff' },
  secondary: { backgroundColor: '#f2f4f6', color: '#8b95a1' },
  ghost: { backgroundColor: 'transparent', color: '#8b95a1' },
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 'medium',
  variant = 'ghost',
  disabled = false,
  onClick,
  'aria-label': ariaLabel,
}) => {
  const { size: px, radius } = sizeMap[size];

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: px,
    height: px,
    borderRadius: radius,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    outline: 'none',
    padding: 0,
    transition: 'background-color 0.15s ease',
    ...variantMap[variant],
  };

  return (
    <button style={style} disabled={disabled} onClick={onClick} aria-label={ariaLabel}>
      {icon}
    </button>
  );
};
