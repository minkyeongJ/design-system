import React, { useState } from 'react';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'large' | 'small';
}

const sizeConfig = {
  large: { trackW: 51, trackH: 31, thumbSize: 27, thumbOffset: 2 },
  small: { trackW: 41, trackH: 25, thumbSize: 21, thumbOffset: 2 },
};

export const Switch: React.FC<SwitchProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  size = 'large',
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const { trackW, trackH, thumbSize, thumbOffset } = sizeConfig[size];

  const handleClick = () => {
    if (disabled) return;
    const next = !checked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  const trackStyle: React.CSSProperties = {
    width: trackW,
    height: trackH,
    borderRadius: trackH / 2,
    backgroundColor: checked ? '#3182f6' : '#e5e8eb',
    position: 'relative',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'background-color 0.2s ease',
    flexShrink: 0,
    display: 'inline-block',
  };

  const thumbStyle: React.CSSProperties = {
    position: 'absolute',
    top: thumbOffset,
    left: checked ? trackW - thumbSize - thumbOffset : thumbOffset,
    width: thumbSize,
    height: thumbSize,
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
    transition: 'left 0.2s ease',
  };

  return (
    <span role="switch" aria-checked={checked} style={trackStyle} onClick={handleClick}>
      <span style={thumbStyle} />
    </span>
  );
};
