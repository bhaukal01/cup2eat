import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useToast, TOAST_DURATION_MS } from '../../context/ToastContext';
import '../ui/ui.css';

/**
 * Stacked Origin-Emerge Notification Deck:
 * - Emerges directly from a single bottom-left focal point (scale 0.14 -> 1) rather than sliding.
 * - Stacks behind the frontmost toast when collapsed, fanning out cleanly when hovered or tapped.
 */
export function ToastViewport() {
  const { toasts, dismissToast, pauseAll, resumeAll } = useToast();
  const [expanded, setExpanded] = useState(false);

  const handleEnter = () => {
    setExpanded(true);
    pauseAll();
  };

  const handleLeave = () => {
    setExpanded(false);
    resumeAll();
  };

  return (
    <div
      className="ui-toast-stack"
      role="region"
      aria-live="polite"
      aria-label="Notifications"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      style={{
        height: toasts.length === 0 ? 0 : expanded ? `${Math.max(1, toasts.length) * 82}px` : '94px',
      }}
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast, idx) => {
          const depth = toasts.length - 1 - idx; // 0 = frontmost newest notification
          const collapsedY = -depth * 11;
          const expandedY = -depth * 80;

          return (
            <motion.div
              key={toast.id}
              onClick={() => {
                if (toasts.length > 1 && !expanded) setExpanded(true);
              }}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 40 - depth,
                transformOrigin: '14px calc(100% - 14px)',
              }}
              initial={{
                opacity: 0,
                scale: 0.14,
                x: -22,
                y: 16,
              }}
              animate={{
                opacity: expanded ? 1 : Math.max(0.45, 1 - depth * 0.2),
                scale: expanded ? 1 : Math.max(0.86, 1 - depth * 0.055),
                x: 0,
                y: expanded ? expandedY : collapsedY,
              }}
              exit={{
                opacity: 0,
                scale: 0.25,
                x: -16,
                y: 10,
                transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
              }}
              transition={{
                type: 'spring',
                stiffness: 420,
                damping: 26,
                mass: 0.82,
              }}
              className={`ui-toast ${toast.variant === 'error' ? 'ui-toast--error' : ''}`.trim()}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span className="ui-toast-origin-dot" aria-hidden="true" />
                <span className="ui-toast-msg">{toast.message}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                {depth === 0 && toasts.length > 1 && !expanded && (
                  <span className="ui-toast-stack-pill">+{toasts.length - 1}</span>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    dismissToast(toast.id);
                  }}
                  aria-label="Dismiss notification"
                  className="ui-toast-close"
                >
                  <X size={16} />
                </button>
              </div>

              {depth === 0 && (
                <motion.span
                  className="ui-toast-progress"
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: expanded ? 1 : 0 }}
                  transition={{ duration: TOAST_DURATION_MS / 1000, ease: 'linear' }}
                  aria-hidden="true"
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
