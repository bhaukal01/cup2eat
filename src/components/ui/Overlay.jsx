import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './Button';
import './ui.css';

const EDITORIAL_DECEL = [0.16, 1, 0.3, 1];

/** Modal dialog with Escape dismissal, backdrop fade, and tactile emerge animation. */
export function Dialog({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="ui-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ui-dialog-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="ui-dialog"
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.3, ease: EDITORIAL_DECEL }}
          >
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Brand-native Boiling Tea Cup Order Drawer:
 * Pours open via expanding radial ripple from the top-right Order Box coordinate (`92% 4%`),
 * topped by a forest-pine rim with rising simmering chai bubbles & aromatic steam wisps.
 */
export function Drawer({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="ui-backdrop ui-backdrop--drawer"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ui-drawer-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.aside
            className="ui-drawer"
            initial={{ clipPath: 'circle(0% at 90% 4%)', opacity: 0.5, scale: 0.94 }}
            animate={{ clipPath: 'circle(165% at 90% 4%)', opacity: 1, scale: 1 }}
            exit={{ clipPath: 'circle(0% at 90% 4%)', opacity: 0.3, scale: 0.96 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top right' }}
          >
            {/* Dark Forest Tea Rim Header with Simmering Bubbles & Steam Wisps */}
            <div className="ui-drawer-header ui-drawer-header--tea">
              <div className="drawer-tea-bubbles" aria-hidden="true">
                <motion.span
                  className="drawer-tea-bubble"
                  style={{ left: '16%', width: '8px', height: '8px' }}
                  animate={{ y: [18, -22], opacity: [0, 0.85, 0], scale: [0.6, 1.2, 0.7] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.span
                  className="drawer-tea-bubble"
                  style={{ left: '42%', width: '11px', height: '11px' }}
                  animate={{ y: [22, -26], opacity: [0, 0.9, 0], scale: [0.5, 1.3, 0.8] }}
                  transition={{ duration: 1.7, delay: 0.25, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.span
                  className="drawer-tea-bubble"
                  style={{ left: '72%', width: '7px', height: '7px' }}
                  animate={{ y: [16, -20], opacity: [0, 0.8, 0], scale: [0.7, 1.15, 0.6] }}
                  transition={{ duration: 1.3, delay: 0.5, repeat: Infinity, ease: 'easeOut' }}
                />
              </div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <span style={{ fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold-300)', fontWeight: 700, display: 'block' }}>
                  Steeping Fresh
                </span>
                <h2
                  id="ui-drawer-title"
                  style={{ margin: 0, fontSize: 'var(--text-xl)', fontFamily: 'var(--font-display)', color: 'var(--color-cream-50)' }}
                >
                  {title}
                </h2>
              </div>

              <button
                type="button"
                className="drawer-tea-close"
                onClick={onClose}
                aria-label="Close drawer"
              >
                <X size={20} />
              </button>

              {/* Liquid Wavy Bottom Lip */}
              <svg className="drawer-tea-wave" viewBox="0 0 440 16" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0,16 L0,6 C110,16 220,-2 330,8 C385,13 420,4 440,6 L440,16 Z" fill="var(--color-cream-50)" />
              </svg>
            </div>

            <div className="ui-drawer-body">{children}</div>
            {footer && (
              <motion.div
                className="ui-drawer-footer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.34, delay: 0.14, ease: EDITORIAL_DECEL }}
              >
                {footer}
              </motion.div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
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
