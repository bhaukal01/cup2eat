import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import './ui.css';

/** Modal dialog with Escape dismissal and accessible labelling. */
export function Dialog({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="ui-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ui-dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="ui-dialog">
        <div className="ui-dialog-header" style={{ marginBottom: 'var(--space-4)' }}>
          <h3 id="ui-dialog-title" style={{ margin: 0, fontFamily: 'var(--font-display)' }}>
            {title}
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </Button>
        </div>
        <div>{children}</div>
        {footer && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 'var(--space-2)',
              marginTop: 'var(--space-6)',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/** Right-side slide-over drawer with Escape support. */
export function Drawer({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="ui-backdrop ui-backdrop--drawer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ui-drawer-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside className="ui-drawer">
        <div className="ui-drawer-header">
          <h2
            id="ui-drawer-title"
            style={{ margin: 0, fontSize: 'var(--text-xl)', fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close drawer">
            <X size={20} />
          </Button>
        </div>
        <div className="ui-drawer-body">{children}</div>
        {footer && <div className="ui-drawer-footer">{footer}</div>}
      </aside>
    </div>
  );
}

/** Lightweight hover/focus tooltip. */
export function Tooltip({ text, children }) {
  return (
    <span className="ui-tooltip-wrap">
      {children}
      <span role="tooltip" className="ui-tooltip-bubble">
        {text}
      </span>
    </span>
  );
}

