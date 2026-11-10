import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Lightweight fine-pointer cursor ring + interactive badge.
 * Uses delegated mouseover/mouseout instead of heavy DOM closest() polling on every pixel moved.
 */
export function TactileCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-120);
  const mouseY = useMotionValue(-120);
  const smoothX = useSpring(mouseX, { damping: 32, stiffness: 420 });
  const smoothY = useSpring(mouseY, { damping: 32, stiffness: 420 });

  useEffect(() => {
    if (shouldReduceMotion) return undefined;
    const finePointer = window.matchMedia('(pointer: fine)');
    if (!finePointer.matches) return undefined;
    setEnabled(true);

    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(e.clientX > 12 && e.clientY > 12);
    };

    const onOver = (e) => {
      const target = e.target?.closest?.('[data-cursor]');
      setCursorLabel(target ? target.getAttribute('data-cursor') || '' : '');
    };

    const onLeave = () => {
      setVisible(false);
      setCursorLabel('');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [mouseX, mouseY, shouldReduceMotion]);

  if (!enabled || !visible) return null;

  const hasLabel = Boolean(cursorLabel);

  return (
    <motion.div
      aria-hidden="true"
      className={`tactile-cursor ${hasLabel ? 'tactile-cursor--labeled' : ''}`.trim()}
      style={{ x: smoothX, y: smoothY }}
      animate={{ scale: hasLabel ? 1 : 0.9 }}
      transition={{ duration: 0.14 }}
    >
      {hasLabel && <span>{cursorLabel}</span>}
    </motion.div>
  );
}
