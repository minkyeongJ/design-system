import React from 'react';

export interface BottomCTAProps {
  primary?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
  };
  secondary?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
  safeArea?: boolean;
  divider?: boolean;
  children?: React.ReactNode;
}

export const BottomCTA: React.FC<BottomCTAProps> = ({
  primary,
  secondary,
  safeArea = true,
  divider = true,
  children,
}) => {
  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: safeArea ? 'calc(20px + env(safe-area-inset-bottom))' : '20px',
    borderTop: divider ? '1px solid #f2f4f6' : 'none',
  };

  const primaryButtonStyle: React.CSSProperties = {
    flex: secondary ? 2 : undefined,
    width: secondary ? undefined : '100%',
    height: 52,
    backgroundColor: '#3182f6',
    color: 'white',
    borderRadius: 12,
    fontSize: 17,
    fontWeight: 600,
    border: 'none',
    cursor: primary?.disabled || primary?.loading ? 'not-allowed' : 'pointer',
    opacity: primary?.disabled || primary?.loading ? 0.4 : 1,
    fontFamily: 'inherit',
  };

  const secondaryButtonStyle: React.CSSProperties = {
    flex: 1,
    height: 52,
    backgroundColor: '#f2f4f6',
    color: '#191f28',
    borderRadius: 12,
    fontSize: 17,
    fontWeight: 600,
    border: 'none',
    cursor: secondary?.disabled ? 'not-allowed' : 'pointer',
    opacity: secondary?.disabled ? 0.4 : 1,
    fontFamily: 'inherit',
  };

  const buttonRowStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  };

  if (children) {
    return <div style={containerStyle}>{children}</div>;
  }

  return (
    <div style={containerStyle}>
      {secondary ? (
        <div style={buttonRowStyle}>
          {secondary && (
            <button
              style={secondaryButtonStyle}
              onClick={secondary.onClick}
              disabled={secondary.disabled}
            >
              {secondary.label}
            </button>
          )}
          {primary && (
            <button
              style={primaryButtonStyle}
              onClick={primary.onClick}
              disabled={primary.disabled || primary.loading}
            >
              {primary.loading ? '...' : primary.label}
            </button>
          )}
        </div>
      ) : (
        primary && (
          <button
            style={primaryButtonStyle}
            onClick={primary.onClick}
            disabled={primary.disabled || primary.loading}
          >
            {primary.loading ? '...' : primary.label}
          </button>
        )
      )}
    </div>
  );
};
