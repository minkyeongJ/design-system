import React, { CSSProperties } from 'react';

let skeletonInjected = false;
function injectSkeletonStyle() {
  if (skeletonInjected || typeof document === 'undefined') return;
  const style = document.createElement('style');
  style.textContent = `@keyframes moap-skeleton-shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }`;
  document.head.appendChild(style);
  skeletonInjected = true;
}

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
  variant?: 'rect' | 'circle' | 'text';
  lines?: number;
  animate?: boolean;
}

const getSkeletonStyle = (
  width: number | string | undefined,
  height: number | string | undefined,
  borderRadius: number | string,
  animate: boolean
): CSSProperties => ({
  width: width !== undefined ? (typeof width === 'number' ? width : width) : '100%',
  height: height !== undefined ? (typeof height === 'number' ? height : height) : undefined,
  borderRadius: typeof borderRadius === 'number' ? borderRadius : borderRadius,
  background: 'linear-gradient(90deg, #f2f4f6 25%, #e5e8eb 50%, #f2f4f6 75%)',
  backgroundSize: '200% 100%',
  animation: animate ? 'moap-skeleton-shimmer 1.5s infinite' : undefined,
});

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  borderRadius = 8,
  variant = 'rect',
  lines = 1,
  animate = true,
}) => {
  injectSkeletonStyle();

  if (variant === 'circle') {
    const dim = width ?? height ?? 40;
    const style: CSSProperties = {
      ...getSkeletonStyle(dim, dim, '50%', animate),
    };
    return <div style={style} />;
  }

  if (variant === 'text') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            style={getSkeletonStyle(
              i === lines - 1 && lines > 1 ? '60%' : width ?? '100%',
              height ?? 16,
              borderRadius,
              animate
            )}
          />
        ))}
      </div>
    );
  }

  return <div style={getSkeletonStyle(width, height, borderRadius, animate)} />;
};
