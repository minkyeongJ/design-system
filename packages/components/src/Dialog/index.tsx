import React, { useEffect, CSSProperties } from 'react';
import ReactDOM from 'react-dom';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmVariant?: 'primary' | 'danger';
  hideCancel?: boolean;
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  confirmVariant = 'primary',
  hideCancel = false,
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

  if (!visible) return null;

  const backdropStyle: CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: animating ? 1 : 0,
    transition: 'opacity 0.2s ease',
  };

  const boxStyle: CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: '24px 24px 20px',
    width: 280,
    textAlign: 'center',
    opacity: animating ? 1 : 0,
    transform: animating ? 'scale(1)' : 'scale(0.95)',
    transition: 'opacity 0.2s ease, transform 0.2s ease',
  };

  const titleStyle: CSSProperties = {
    fontSize: 17,
    fontWeight: 700,
    color: '#191f28',
    marginBottom: 8,
  };

  const descStyle: CSSProperties = {
    fontSize: 14,
    fontWeight: 400,
    color: '#6b7684',
    marginBottom: 20,
    lineHeight: 1.5,
  };

  const buttonsRowStyle: CSSProperties = {
    display: 'flex',
    gap: 8,
    width: '100%',
  };

  const cancelBtnStyle: CSSProperties = {
    flex: 1,
    height: 48,
    backgroundColor: '#f2f4f6',
    color: '#333d4b',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
  };

  const confirmBtnStyle: CSSProperties = {
    flex: 1,
    height: 48,
    backgroundColor: confirmVariant === 'danger' ? '#f04452' : '#3182f6',
    color: '#ffffff',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return ReactDOM.createPortal(
    <div style={backdropStyle}>
      <div style={boxStyle}>
        <div style={titleStyle}>{title}</div>
        {description && <div style={descStyle}>{description}</div>}
        <div style={buttonsRowStyle}>
          {!hideCancel && (
            <button style={cancelBtnStyle} onClick={handleCancel}>
              {cancelText}
            </button>
          )}
          <button style={confirmBtnStyle} onClick={handleConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
