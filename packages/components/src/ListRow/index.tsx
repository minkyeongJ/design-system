import React from 'react';

export interface ListRowProps {
  title?: string;
  description?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  divider?: boolean;
  as?: 'div' | 'button' | 'a';
  href?: string;
  badge?: string | number;
  caption?: string;
}

export const ListRow: React.FC<ListRowProps> = ({
  title,
  description,
  leftContent,
  rightContent,
  onClick,
  disabled = false,
  divider = true,
  as: Tag = 'div',
  href,
  badge,
  caption,
}) => {
  const isClickable = !!onClick || Tag === 'button' || Tag === 'a';

  const [hovered, setHovered] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: active && isClickable && !disabled
      ? '#f2f4f6'
      : hovered && isClickable && !disabled
      ? '#f9fafb'
      : 'white',
    minHeight: 56,
    borderBottom: divider ? '1px solid #f2f4f6' : 'none',
    cursor: disabled ? 'not-allowed' : isClickable ? 'pointer' : 'default',
    opacity: disabled ? 0.4 : 1,
    textDecoration: 'none',
    border: divider ? undefined : 'none',
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'left',
    outline: 'none',
    fontFamily: 'inherit',
  };

  const props: React.HTMLAttributes<HTMLElement> & { href?: string } = {
    style: containerStyle,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => { setHovered(false); setActive(false); },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    ...(href ? { href } : {}),
  };

  const content = (
    <>
      {leftContent && (
        <div style={{ marginRight: 12, flexShrink: 0 }}>
          {leftContent}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: '#191f28',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </span>
            {badge !== undefined && (
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#f04452',
                  color: 'white',
                  fontSize: 10,
                  fontWeight: 700,
                  borderRadius: 8,
                  paddingLeft: 5,
                  paddingRight: 5,
                  height: 16,
                  marginLeft: 6,
                  lineHeight: '16px',
                }}
              >
                {badge}
              </span>
            )}
          </div>
        )}
        {description && (
          <div
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: '#8b95a1',
              marginTop: 2,
            }}
          >
            {description}
          </div>
        )}
        {caption && (
          <div
            style={{
              fontSize: 12,
              fontWeight: 400,
              color: '#b0b8c1',
              marginTop: 2,
            }}
          >
            {caption}
          </div>
        )}
      </div>
      {rightContent && (
        <div style={{ marginLeft: 12, flexShrink: 0 }}>
          {rightContent}
        </div>
      )}
    </>
  );

  if (Tag === 'button') {
    return <button {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>{content}</button>;
  }
  if (Tag === 'a') {
    return <a {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>{content}</a>;
  }
  return <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>{content}</div>;
};
