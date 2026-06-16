import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  CSSProperties,
  ReactNode,
  ReactElement,
  cloneElement,
} from 'react';
import ReactDOM from 'react-dom';

export interface TooltipProps {
  content: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click';
  delay?: number;
  children: ReactElement;
  disabled?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = 'top',
  trigger = 'hover',
  delay = 0,
  children,
  disabled = false,
}) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const delayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    if (disabled) return;
    if (delayTimer.current) clearTimeout(delayTimer.current);
    delayTimer.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const gap = 8;
        let top = 0;
        let left = 0;
        switch (placement) {
          case 'top':
            top = rect.top - gap;
            left = rect.left + rect.width / 2;
            break;
          case 'bottom':
            top = rect.bottom + gap;
            left = rect.left + rect.width / 2;
            break;
          case 'left':
            top = rect.top + rect.height / 2;
            left = rect.left - gap;
            break;
          case 'right':
            top = rect.top + rect.height / 2;
            left = rect.right + gap;
            break;
        }
        setCoords({ top, left });
      }
      setVisible(true);
    }, delay);
  }, [disabled, placement, delay]);

  const hide = useCallback(() => {
    if (delayTimer.current) clearTimeout(delayTimer.current);
    setVisible(false);
  }, []);

  const toggle = useCallback(() => {
    if (visible) hide();
    else show();
  }, [visible, show, hide]);

  useEffect(() => {
    return () => {
      if (delayTimer.current) clearTimeout(delayTimer.current);
    };
  }, []);

  const eventProps =
    trigger === 'hover'
      ? { onMouseEnter: show, onMouseLeave: hide }
      : { onClick: toggle };

  const child = cloneElement(children, {
    ref: triggerRef,
    ...eventProps,
  });

  const getTooltipTransform = () => {
    switch (placement) {
      case 'top':
        return 'translateX(-50%) translateY(-100%)';
      case 'bottom':
        return 'translateX(-50%)';
      case 'left':
        return 'translateX(-100%) translateY(-50%)';
      case 'right':
        return 'translateY(-50%)';
    }
  };

  const tooltipStyle: CSSProperties = {
    position: 'fixed',
    top: coords.top,
    left: coords.left,
    transform: getTooltipTransform(),
    backgroundColor: '#191f28',
    color: '#ffffff',
    borderRadius: 8,
    padding: '6px 10px',
    fontSize: 13,
    fontWeight: 400,
    zIndex: 2000,
    pointerEvents: 'none',
    opacity: visible ? 1 : 0,
    transition: 'opacity 0.15s ease',
    whiteSpace: 'nowrap',
  };

  const getArrowStyle = (): CSSProperties => {
    const base: CSSProperties = {
      position: 'absolute',
      width: 0,
      height: 0,
    };
    switch (placement) {
      case 'top':
        return {
          ...base,
          bottom: -6,
          left: '50%',
          transform: 'translateX(-50%)',
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: '6px solid #191f28',
        };
      case 'bottom':
        return {
          ...base,
          top: -6,
          left: '50%',
          transform: 'translateX(-50%)',
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderBottom: '6px solid #191f28',
        };
      case 'left':
        return {
          ...base,
          right: -6,
          top: '50%',
          transform: 'translateY(-50%)',
          borderTop: '6px solid transparent',
          borderBottom: '6px solid transparent',
          borderLeft: '6px solid #191f28',
        };
      case 'right':
        return {
          ...base,
          left: -6,
          top: '50%',
          transform: 'translateY(-50%)',
          borderTop: '6px solid transparent',
          borderBottom: '6px solid transparent',
          borderRight: '6px solid #191f28',
        };
    }
  };

  return (
    <>
      {child}
      {ReactDOM.createPortal(
        <div style={tooltipStyle}>
          {content}
          <span style={getArrowStyle()} />
        </div>,
        document.body
      )}
    </>
  );
};
