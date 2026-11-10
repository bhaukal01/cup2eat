import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { BrandLogo } from '../layout/BrandLogo';

const ROUTE_CHAPTERS = [
  { match: (p) => p === '/', code: '01', label: 'HOME' },
  { match: (p) => p === '/products', code: '02', label: 'CUPS' },
  { match: (p) => p.startsWith('/products/'), code: '02', label: 'FLAVOUR' },
  { match: (p) => p.startsWith('/catering'), code: '03', label: 'BULK' },
  { match: (p) => p.startsWith('/sustainability'), code: '04', label: 'PLANET' },
  { match: (p) => p.startsWith('/about'), code: '05', label: 'STORY' },
  { match: (p) => p.startsWith('/contact'), code: '06', label: 'CONTACT' },
];

function getChapterMeta(pathname) {
  const found = ROUTE_CHAPTERS.find((c) => c.match(pathname));
  return found || { code: '★', label: 'CUP2EAT' };
}

/**
 * Route-Change Page Transition ONLY (never fires on direct page load).
 * Paced comfortably (~800ms total with 260ms hold window) and displays a single crisp keyword
 * so users easily read the incoming route before the forest-pine curtain sweeps clean.
 */
export function CupCrestTransition({ children }) {
  const location = useLocation();
  const lenis = useLenis();
  const shouldReduceMotion = useReducedMotion();

  const [displayLocation, setDisplayLocation] = useState(location);
  const [phase, setPhase] = useState('idle'); // 'idle' | 'covering' | 'holding' | 'revealing'

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

    const holdTimer = window.setTimeout(() => {
      displayedPathRef.current = locationRef.current.pathname;
      setDisplayLocation(locationRef.current);
      snapTopAndResize();
      setPhase('holding');
    }, 270);

    const revealTimer = window.setTimeout(() => {
      setPhase('revealing');
    }, 530);

    const endTimer = window.setTimeout(() => {
      setPhase('idle');
      lenisRef.current?.resize();
    }, 810);

    const resizeLateTimer = window.setTimeout(() => {
      lenisRef.current?.resize();
    }, 1050);

    timersRef.current = [holdTimer, revealTimer, endTimer, resizeLateTimer];

    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
    };
  }, [location.pathname, shouldReduceMotion]);

  const chapter = getChapterMeta(location.pathname);

  return (
    <>
      <motion.div
        animate={{ opacity: phase === 'covering' || phase === 'holding' ? 0.6 : 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {children(displayLocation)}
      </motion.div>

      {phase !== 'idle' && (
        <div className="route-wave-overlay" aria-hidden="true">
          <motion.div
            key={`wave-${location.pathname}`}
            className="route-wave-curtain"
            initial={{ x: '-108%' }}
            animate={
              phase === 'covering' || phase === 'holding'
                ? { x: '-4%' }
                : { x: '108%' }
            }
            transition={{
              duration: phase === 'revealing' ? 0.28 : 0.27,
              ease: [0.65, 0, 0.35, 1],
            }}
          >
            <div className="crest-transition-center">
              <BrandLogo size={72} />
              <div className="crest-transition-chapter">
                <span>{chapter.code}</span>
                <strong>{chapter.label}</strong>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
