import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Initial Cold-Load Unboxing Preloader (fires on direct entry to any URL).
 * Completely distinct from the left-to-right route transition:
 * Dual warm-cream biscuit tin doors part cleanly left & right after a crisp ~720ms fill ritual.
 */
export function PourPreloader({ open, onComplete }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (!open) return undefined;
    setPercent(0);
    const start = performance.now();
    const duration = 720;
    let frameId;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setPercent(Math.round(eased * 100));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => onComplete?.(), 90);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [open, onComplete]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="unbox-preloader"
          role="dialog"
          aria-label="Opening CUP2EAT"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1, transition: { duration: 0.48 } }}
        >
          {/* Left Cream Door */}
          <motion.div
            className="unbox-door unbox-door--left"
            initial={{ x: '0%' }}
            exit={{ x: '-102%', transition: { duration: 0.46, ease: [0.76, 0, 0.24, 1] } }}
          />
          {/* Right Cream Door */}
          <motion.div
            className="unbox-door unbox-door--right"
            initial={{ x: '0%' }}
            exit={{ x: '102%', transition: { duration: 0.46, ease: [0.76, 0, 0.24, 1] } }}
          />

          {/* Center Steeping Cup & Counter */}
          <motion.div
            className="unbox-center"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.22 } }}
          >
            <svg width="96" height="104" viewBox="0 0 112 120" aria-hidden="true">
              <defs>
                <clipPath id="unbox-cup-clip">
                  <path d="M22,38 L90,38 L78,104 C77,108 73,111 68,111 L44,111 C39,111 35,108 34,104 Z" />
                </clipPath>
              </defs>
              <g clipPath="url(#unbox-cup-clip)">
                <rect
                  x="16"
                  y={112 - (percent / 100) * 72}
                  width="80"
                  height="84"
                  fill="#183629"
                />
                <rect
                  x="16"
                  y={109 - (percent / 100) * 72}
                  width="80"
                  height="5"
                  fill="#C69C53"
                />
              </g>
              <path
                d="M22,38 L90,38 L78,104 C77,108 73,111 68,111 L44,111 C39,111 35,108 34,104 Z"
                fill="none"
                stroke="#183629"
                strokeWidth="3.5"
              />
              <path
                d="M19,37 C19,33 23,31 28,31 L84,31 C89,31 93,33 93,37 C93,41 88,43 84,43 L28,43 C24,43 19,41 19,37 Z"
                fill="#3D2116"
                stroke="#C69C53"
                strokeWidth="2.5"
              />
            </svg>

            <div className="preloader-counter">
              {String(percent).padStart(2, '0')}
              <span style={{ fontSize: '1.25rem', color: 'var(--color-gold-600)' }}>%</span>
            </div>

            <div style={{ fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: 'var(--text-xs)', color: 'var(--color-forest-900)' }}>
              CUP2EAT · EAT YOUR DRINK
            </div>

            <button type="button" onClick={onComplete} className="preloader-skip-btn">
              Enter Site
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
