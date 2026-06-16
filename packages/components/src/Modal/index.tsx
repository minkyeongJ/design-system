import React, { useEffect, useRef, CSSProperties, ReactNode } from 'react';
import ReactDOM from 'react-dom';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
  footer?: ReactNode;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  width?: number | string;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  closeOnBackdrop = true,
  closeOnEsc = true,
  width = 320,
}) => {
  const [visible, setVisible] = React.useState(open);
  const [animating, setAnimating] = React.useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      requestAnimationFrame(() => setAnimating(true));
    } else {
      setAnimating(false);
      const timer = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (!closeOnEsc) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeOnEsc, open, onClose]);

  if (!visible) return null;

  const backdropStyle: CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: animating ? 1 : 0,
    transition: 'opacity 0.2s ease',
  };

  const boxStyle: CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: typeof width === 'number' ? width : width,
    maxHeight: '80vh',
    overflowY: 'auto',
    opacity: animating ? 1 : 0,
    transform: animating ? 'scale(1)' : 'scale(0.95)',
    transition: 'opacity 0.2s ease, transform 0.2s ease',
  };

  const titleStyle: CSSProperties = {
    fontSize: 18,
    fontWeight: 600,
    color: '#191f28',
    marginBottom: 16,
  };

  const footerStyle: CSSProperties = {
    marginTop: 20,
    display: 'flex',
    gap: 8,
    justifyContent: 'flex-end',
  };

  return ReactDOM.createPortal(
    <div
      style={backdropStyle}
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div style={boxStyle} onClick={(e) => e.stopPropagation()}>
        <div style={titleStyle}>{title}</div>
        <div>{children}</div>
        {footer && <div style={footerStyle}>{footer}</div>}
      </div>
    </div>,
    document.body
  );
};
