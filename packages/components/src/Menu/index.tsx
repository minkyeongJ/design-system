import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

export interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  destructive?: boolean;
  disabled?: boolean;
  divider?: boolean;
}

export interface MenuProps {
  items: MenuItem[];
  open?: boolean;
  onClose?: () => void;
  onSelect?: (key: string) => void;
  width?: number;
  trigger?: React.ReactNode;
}

export function Menu({ items, open: openProp, onClose, onSelect, width = 200, trigger }: MenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const isOpen = trigger ? internalOpen : (openProp ?? false);

  useEffect(() => {
    if (trigger && internalOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPos({ x: rect.left, y: rect.bottom + 4 });
    }
  }, [internalOpen, trigger]);

  const close = () => {
    setInternalOpen(false);
    onClose?.();
  };

  const handleSelect = (key: string) => {
    onSelect?.(key);
    close();
  };

  const menuStyle: CSSProperties = {
    position: 'fixed',
    top: pos.y,
    left: pos.x,
    width,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
    overflow: 'hidden',
    zIndex: 1500,
  };

  const menu = isOpen
    ? ReactDOM.createPortal(
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 1499 }} onClick={close} />
          <div style={menuStyle}>
            {items.map((item) => {
              if (item.divider) {
                return <div key={item.key} style={{ height: 1, backgroundColor: '#f2f4f6' }} />;
              }
              return (
                <button
                  key={item.key}
                  disabled={item.disabled}
                  onClick={() => !item.disabled && handleSelect(item.key)}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    padding: '12px 16px',
                    border: 'none',
                    background: 'none',
                    cursor: item.disabled ? 'not-allowed' : 'pointer',
                    fontSize: 15,
                    fontWeight: 400,
                    color: item.destructive ? '#f04452' : item.disabled ? '#b0b8c1' : '#191f28',
                    textAlign: 'left',
                  }}
                >
                  {item.icon && <span style={{ marginRight: 10, display: 'flex', alignItems: 'center' }}>{item.icon}</span>}
                  {item.label}
                </button>
              );
            })}
          </div>
        </>,
        document.body
      )
    : null;

  if (trigger) {
    return (
      <>
        <div ref={triggerRef} onClick={() => setInternalOpen(v => !v)} style={{ display: 'inline-flex' }}>
          {trigger}
        </div>
        {menu}
      </>
    );
  }

  return menu;
}
