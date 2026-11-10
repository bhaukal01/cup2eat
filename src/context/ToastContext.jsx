import { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext(null);

export const TOAST_DURATION_MS = 4000;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({});

  const dismissToast = useCallback((id) => {
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const scheduleDismiss = useCallback(
    (id, delay = TOAST_DURATION_MS) => {
      if (timersRef.current[id]) clearTimeout(timersRef.current[id]);
      timersRef.current[id] = window.setTimeout(() => {
        dismissToast(id);
      }, delay);
    },
    [dismissToast]
  );

  const pauseAll = useCallback(() => {
    Object.keys(timersRef.current).forEach((id) => {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    });
  }, []);

  const resumeAll = useCallback(() => {
    setToasts((current) => {
      current.forEach((t, idx) => {
        // Stagger remaining dismissal from oldest to newest gently
        scheduleDismiss(t.id, 1800 + idx * 500);
      });
      return current;
    });
  }, [scheduleDismiss]);

  const showToast = useCallback(
    (message, variant = 'success') => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev.slice(-3), { id, message, variant }]);
      scheduleDismiss(id, TOAST_DURATION_MS);
    },
    [scheduleDismiss]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast, pauseAll, resumeAll }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
