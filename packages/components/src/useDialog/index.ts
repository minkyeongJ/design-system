import { useState, useCallback } from 'react';

export interface DialogState {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'danger';
  hideCancel?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface UseDialogReturn {
  isOpen: boolean;
  open: (state?: Partial<DialogState>) => void;
  close: () => void;
  dialogProps: DialogState & { open: boolean; onClose: () => void };
}

const defaultState: DialogState = {
  title: '',
  description: undefined,
  confirmText: '확인',
  cancelText: '취소',
  confirmVariant: 'primary',
  hideCancel: false,
  onConfirm: undefined,
  onCancel: undefined,
};

export function useDialog(initialState?: Partial<DialogState>): UseDialogReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<DialogState>({ ...defaultState, ...initialState });

  const open = useCallback((newState?: Partial<DialogState>) => {
    if (newState) {
      setState((prev) => ({ ...prev, ...newState }));
    }
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    open,
    close,
    dialogProps: {
      ...state,
      open: isOpen,
      onClose: close,
    },
  };
}
