import { useEffect, useCallback } from 'react';
import { addToast, removeToast, clearToasts, subscribeToasts } from '../Toast';

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export interface ShowToastOptions {
  message: string;
  type?: 'default' | 'success' | 'error' | 'warning';
  duration?: number;
  position?: 'top' | 'bottom';
  action?: { label: string; onClick: () => void };
}

export function useToast() {
  const show = useCallback((options: ShowToastOptions): string => {
    const id = generateId();
    const duration = options.duration ?? 3000;
    addToast({ ...options, id });
    if (duration !== 0) {
      setTimeout(() => removeToast(id), duration);
    }
    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    removeToast(id);
  }, []);

  const dismissAll = useCallback(() => {
    clearToasts();
  }, []);

  return { show, dismiss, dismissAll };
}
