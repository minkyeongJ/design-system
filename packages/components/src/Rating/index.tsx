import React, { CSSProperties, useState } from 'react';

export interface RatingProps {
  value?: number;
  max?: number;
  onChange?: (value: number) => void;
  size?: 'large' | 'medium' | 'small';
  color?: string;
  readOnly?: boolean;
}

const sizeMap = { large: 28, medium: 20, small: 16 };

function StarIcon({ fill, size, color }: { fill: 'full' | 'half' | 'empty'; size: number; color: string }) {
  const id = `half-${Math.random().toString(36).slice(2)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block' }}>
      {fill === 'half' && (
        <defs>
          <clipPath id={id}>
            <rect x="0" y="0" width="12" height="24" />
          </clipPath>
        </defs>
      )}
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={fill === 'empty' ? 'none' : color}
        stroke={color}
        strokeWidth="1.5"
        clipPath={fill === 'half' ? `url(#${id})` : undefined}
      />
      {fill === 'half' && (
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
        />
      )}
    </svg>
  );
}

export function Rating({
  value = 0,
  max = 5,
  onChange,
  size = 'medium',
  color = '#ffc342',
  readOnly = false,
}: RatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const starSize = sizeMap[size];
  const display = hovered !== null ? hovered : value;

  const containerStyle: CSSProperties = {
    display: 'inline-flex',
    gap: 4,
    cursor: readOnly || !onChange ? 'default' : 'pointer',
  };

  return (
    <div style={containerStyle}>
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const fill = display >= starValue ? 'full' : display >= starValue - 0.5 ? 'half' : 'empty';
        return (
          <span
            key={i}
            onClick={() => !readOnly && onChange?.(starValue)}
            onMouseEnter={() => !readOnly && onChange && setHovered(starValue)}
            onMouseLeave={() => !readOnly && onChange && setHovered(null)}
          >
            <StarIcon fill={fill} size={starSize} color={color} />
          </span>
        );
      })}
    </div>
  );
}
