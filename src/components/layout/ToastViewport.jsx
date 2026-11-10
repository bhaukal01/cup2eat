import { X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import '../ui/ui.css';

export function ToastViewport() {
  const { toasts, dismissToast } = useToast();
  if (!toasts.length) return null;

  return (
    <div className="ui-toast-stack" role="region" aria-live="polite" aria-label="Notifications">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`ui-toast ${toast.variant === 'error' ? 'ui-toast--error' : ''}`.trim()}
        >
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss notification"
            style={{
              border: 'none',
              background: 'transparent',
              color: 'inherit',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

