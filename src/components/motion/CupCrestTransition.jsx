import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { BrandLogo } from '../layout/BrandLogo';

const ROUTE_CHAPTERS = [
  { match: (p) => p === '/', code: '01', label: 'EAT YOUR DRINK' },
  { match: (p) => p === '/products', code: '02', label: 'EDIBLE CUPS CATALOGUE' },
  { match: (p) => p.startsWith('/products/'), code: '02', label: 'FLAVOUR EDITION' },
  { match: (p) => p.startsWith('/catering'), code: '03', label: 'CATERING & WHOLESALE' },
  { match: (p) => p.startsWith('/sustainability'), code: '04', label: 'ZERO PLASTIC IMPACT' },
  { match: (p) => p.startsWith('/about'), code: '05', label: 'OUR STORY & REELS' },
  { match: (p) => p.startsWith('/contact'), code: '06', label: 'FAQ & ORDER CONCIERGE' },
];

function getChapterMeta(pathname) {
  const found = ROUTE_CHAPTERS.find((c) => c.match(pathname));
  return found || { code: '★', label: 'CUP2EAT' };
}

/**
 * Route-Change Page Transition ONLY (never fires on direct page load).
 * Sweeps a crisp deep-forest & brushed-gold horizontal chai curtain left-to-right (~440ms total).
 * Uses stable refs so route state updates never prematurely cancel timers or lock Lenis scroll.
 */
export function CupCrestTransition({ children }) {
  const location = useLocation();
  const lenis = useLenis();
  const shouldReduceMotion = useReducedMotion();

  const [displayLocation, setDisplayLocation] = useState(location);
  const [phase, setPhase] = useState('idle'); // 'idle' | 'covering' | 'revealing'

  const displayedPathRef = useRef(location.pathname);
  const locationRef = useRef(location);
  const lenisRef = useRef(lenis);
  const timersRef = useRef([]);
  const hasMountedRef = useRef(false);

  locationRef.current = location;
  lenisRef.current = lenis;

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    if (location.pathname === displayedPathRef.current) {
      setDisplayLocation(location);
      return;
    }

    const snapTopAndResize = () => {
      const l = lenisRef.current;
      if (l) {
        l.start();
        l.scrollTo(0, { immediate: true });
        l.resize();
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    if (shouldReduceMotion) {
      displayedPathRef.current = location.pathname;
      setDisplayLocation(location);
      snapTopAndResize();
      return;
    }

    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];

    setPhase('covering');

    const swapTimer = window.setTimeout(() => {
      displayedPathRef.current = locationRef.current.pathname;
      setDisplayLocation(locationRef.current);
      snapTopAndResize();
      setPhase('revealing');
    }, 220);

    const endTimer = window.setTimeout(() => {
      setPhase('idle');
      lenisRef.current?.resize();
    }, 470);

    const resizeLateTimer = window.setTimeout(() => {
      lenisRef.current?.resize();
    }, 750);

    timersRef.current = [swapTimer, endTimer, resizeLateTimer];

    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
    };
  }, [location.pathname, shouldReduceMotion]);

  const chapter = getChapterMeta(location.pathname);

  return (
    <>
      <motion.div
        animate={{ opacity: phase === 'covering' ? 0.65 : 1 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {children(displayLocation)}
      </motion.div>

      {phase !== 'idle' && (
        <div className="route-wave-overlay" aria-hidden="true">
          <motion.div
            key={`wave-${location.pathname}`}
            className="route-wave-curtain"
            initial={{ x: '-108%' }}
            animate={phase === 'covering' ? { x: '-4%' } : { x: '108%' }}
            transition={{
              duration: 0.22,
              ease: [0.65, 0, 0.35, 1],
            }}
          >
            <div className="crest-transition-center">
              <BrandLogo size={68} />
              <div className="crest-transition-chapter">
                <span>CHAPTER {chapter.code}</span>
                <strong>{chapter.label}</strong>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
