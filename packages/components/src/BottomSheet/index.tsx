import React, { useEffect, CSSProperties, ReactNode } from 'react';
import ReactDOM from 'react-dom';

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  snapPoints?: number[];
  closeOnBackdrop?: boolean;
  showHandle?: boolean;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  open,
  onClose,
  title,
  children,
  snapPoints,
  closeOnBackdrop = true,
  showHandle = true,
}) => {
  const [visible, setVisible] = React.useState(open);
  const [animating, setAnimating] = React.useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      requestAnimationFrame(() => setAnimating(true));
    } else {
      setAnimating(false);
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!visible) return null;

  const sheetHeight = snapPoints && snapPoints.length > 0 ? snapPoints[0] : undefined;

  const backdropStyle: CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 1000,
    opacity: animating ? 1 : 0,
    transition: 'opacity 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
  };

  const sheetStyle: CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: '20px 20px 0 0',
    paddingBottom: 'env(safe-area-inset-bottom)',
    zIndex: 1001,
    transform: animating ? 'translateY(0)' : 'translateY(100%)',
    transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
    ...(sheetHeight ? { height: sheetHeight } : {}),
  };

  const handleStyle: CSSProperties = {
    width: 36,
    height: 4,
    backgroundColor: '#d1d6db',
    borderRadius: 2,
    margin: '12px auto 4px',
  };

  const titleStyle: CSSProperties = {
    fontSize: 17,
    fontWeight: 700,
    color: '#191f28',
    padding: '12px 20px 16px',
  };

  const contentStyle: CSSProperties = {
    padding: '0 20px 20px',
    overflowY: 'auto',
  };

  return ReactDOM.createPortal(
    <>
      <div
        style={backdropStyle}
        onClick={closeOnBackdrop ? onClose : undefined}
      />
      <div style={sheetStyle}>
        {showHandle && <div style={handleStyle} />}
        {title && <div style={titleStyle}>{title}</div>}
        <div style={contentStyle}>{children}</div>
      </div>
    </>,
    document.body
  );
};
