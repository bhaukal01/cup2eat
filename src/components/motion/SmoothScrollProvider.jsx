import { useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { frame, cancelFrame, useReducedMotion } from 'framer-motion';

/**
 * Synchronized Lenis weighted smooth scroll driven by Framer Motion's shared RAF frame loop.
 * Also observes document body size changes so lazy-loaded routes keep exact scroll boundaries.
 */
export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return undefined;

    function update({ timestamp }) {
      lenisRef.current?.lenis?.raf(timestamp);
    }

    frame.update(update, true);

    const ro = new ResizeObserver(() => {
      lenisRef.current?.lenis?.resize();
    });
    ro.observe(document.body);

    return () => {
      cancelFrame(update);
      ro.disconnect();
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <ReactLenis
      ref={lenisRef}
      root
      autoRaf={false}
      options={{
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.95,
      }}
    >
      {children}
    </ReactLenis>
  );
}
