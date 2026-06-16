import React, { MouseEventHandler, ReactNode } from 'react';

export interface TextButtonProps {
  size?: 'large' | 'medium' | 'small';
  color?: 'blue' | 'grey' | 'red';
  underline?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}

const sizeMap: Record<string, React.CSSProperties> = {
  large: { fontSize: '17px', fontWeight: 500 },
  medium: { fontSize: '15px', fontWeight: 500 },
  small: { fontSize: '13px', fontWeight: 500 },
};

const colorMap: Record<string, string> = {
  blue: '#3182f6',
  grey: '#6b7684',
  red: '#f04452',
};

export const TextButton: React.FC<TextButtonProps> = ({
  size = 'medium',
  color = 'blue',
  underline = false,
  disabled = false,
  onClick,
  children,
}) => {
  const style: React.CSSProperties = {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    color: colorMap[color],
    textDecoration: underline ? 'underline' : 'none',
    outline: 'none',
    ...sizeMap[size],
  };

  return (
    <button style={style} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
