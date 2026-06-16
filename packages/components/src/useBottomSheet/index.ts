import { useState, useCallback } from 'react';

export interface BottomSheetState {
  title?: string;
  snapPoints?: number[];
  closeOnBackdrop?: boolean;
  showHandle?: boolean;
}

export interface UseBottomSheetReturn {
  isOpen: boolean;
  open: (state?: Partial<BottomSheetState>) => void;
  close: () => void;
  bottomSheetProps: BottomSheetState & { open: boolean; onClose: () => void };
}

const defaultState: BottomSheetState = {
  title: undefined,
  snapPoints: undefined,
  closeOnBackdrop: true,
  showHandle: true,
};

export function useBottomSheet(initialState?: Partial<BottomSheetState>): UseBottomSheetReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<BottomSheetState>({ ...defaultState, ...initialState });

  const open = useCallback((newState?: Partial<BottomSheetState>) => {
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
    bottomSheetProps: {
      ...state,
      open: isOpen,
      onClose: close,
    },
  };
}
