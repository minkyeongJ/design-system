import React, { useEffect, CSSProperties } from 'react';
import ReactDOM from 'react-dom';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastProps {
  message: string;
  type?: 'default' | 'success' | 'error' | 'warning';
  duration?: number;
  position?: 'top' | 'bottom';
  action?: ToastAction;
  onDismiss?: () => void;
}

interface ToastItem extends ToastProps {
  id: string;
}

// Global store
let toasts: ToastItem[] = [];
const listeners = new Set<(items: ToastItem[]) => void>();

function notifyListeners() {
  const snapshot = [...toasts];
  listeners.forEach((l) => l(snapshot));
}

export function addToast(item: ToastItem) {
  toasts = [...toasts, item];
  notifyListeners();
}

export function removeToast(id: string) {
  toasts = toasts.filter((t) => t.id !== id);
  notifyListeners();
}

export function clearToasts() {
  toasts = [];
  notifyListeners();
}

export function subscribeToasts(listener: (items: ToastItem[]) => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const accentColors: Record<string, string> = {
  success: '#03b26c',
  error: '#f04452',
  warning: '#fe9800',
};

const SingleToast: React.FC<ToastItem & { index: number; position: 'top' | 'bottom' }> = ({
  id,
  message,
  type = 'default',
  position = 'bottom',
  action,
  index,
}) => {
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const positionStyle: CSSProperties =
    position === 'bottom'
      ? { bottom: 80 + index * 64 }
      : { top: 20 + index * 64 };

  const toastStyle: CSSProperties = {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    ...positionStyle,
    backgroundColor: '#191f28',
    color: '#ffffff',
    borderRadius: 12,
    padding: '12px 16px',
    minWidth: 200,
    maxWidth: 'calc(100vw - 40px)',
    fontSize: 14,
    fontWeight: 400,
    display: 'flex',
    alignItems: 'center',
    zIndex: 4000,
    borderLeft: type !== 'default' ? `3px solid ${accentColors[type]}` : undefined,
    opacity: visible ? 1 : 0,
    transition: 'opacity 0.2s ease, transform 0.2s ease',
    whiteSpace: 'nowrap',
  };

  const actionStyle: CSSProperties = {
    marginLeft: 12,
    color: '#90c2ff',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    padding: 0,
  };

  return (
    <div style={toastStyle}>
      <span style={{ flex: 1 }}>{message}</span>
      {action && (
        <button style={actionStyle} onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const [items, setItems] = React.useState<ToastItem[]>([]);

  useEffect(() => {
    setItems([...toasts]);
    const unsub = subscribeToasts(setItems);
    return unsub;
  }, []);

  return ReactDOM.createPortal(
    <>
      {items.map((item, index) => (
        <SingleToast
          key={item.id}
          {...item}
          position={item.position ?? 'bottom'}
          index={index}
        />
      ))}
    </>,
    document.body
  );
};

export const Toast: React.FC<ToastProps> = (props) => {
  // Standalone usage - renders itself
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    if (props.duration !== 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => props.onDismiss?.(), 200);
      }, props.duration ?? 3000);
      return () => clearTimeout(timer);
    }
  }, [props.duration, props.onDismiss]);

  const position = props.position ?? 'bottom';
  const positionStyle: CSSProperties =
    position === 'bottom' ? { bottom: 80 } : { top: 20 };

  const toastStyle: CSSProperties = {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    ...positionStyle,
    backgroundColor: '#191f28',
    color: '#ffffff',
    borderRadius: 12,
    padding: '12px 16px',
    minWidth: 200,
    maxWidth: 'calc(100vw - 40px)',
    fontSize: 14,
    fontWeight: 400,
    display: 'flex',
    alignItems: 'center',
    zIndex: 4000,
    borderLeft:
      props.type && props.type !== 'default'
        ? `3px solid ${accentColors[props.type]}`
        : undefined,
    opacity: visible ? 1 : 0,
    transition: 'opacity 0.2s ease',
  };

  const actionStyle: CSSProperties = {
    marginLeft: 12,
    color: '#90c2ff',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    padding: 0,
  };

  return (
    <div style={toastStyle}>
      <span style={{ flex: 1 }}>{props.message}</span>
      {props.action && (
        <button style={actionStyle} onClick={props.action.onClick}>
          {props.action.label}
        </button>
      )}
    </div>
  );
};
