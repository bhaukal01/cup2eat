import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from 'framer-motion';

export const EDITORIAL_EASE = [0.22, 1, 0.36, 1];

/**
 * Hairline scroll-depth indicator pinned smoothly at viewport top.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  return <motion.div className="scroll-progress-bar" style={{ scaleX }} aria-hidden="true" />;
}

/**
 * Masked upward typography reveal mimicking editorial print unveilings.
 * Supports `immediate` for above-the-fold hero headings so they never pause waiting for intersection.
 */
export function TextReveal({
  children,
  delay = 0,
  immediate = false,
  className = '',
  as = 'div',
  style = {},
}) {
  const Component = motion[as] || motion.div;
  return (
    <div style={{ overflow: 'hidden' }}>
      <Component
        className={className}
        style={style}
        initial={{ y: '100%', opacity: 0 }}
        animate={immediate ? { y: '0%', opacity: 1 } : undefined}
        whileInView={immediate ? undefined : { y: '0%', opacity: 1 }}
        viewport={immediate ? undefined : { once: true, amount: 'some' }}
        transition={{ duration: 0.62, delay, ease: EDITORIAL_EASE }}
      >
        {children}
      </Component>
    </div>
  );
}

/**
 * Scroll-scrubbed 3D perspective reveal: visibly tilts & scales upright as the section scrolls into view.
 */
export function ScrollPerspectiveSection({ children, className = '', style = {} }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 96%', 'start 36%'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 160, damping: 28 });
  const scale = useTransform(smoothProgress, [0, 1], [0.94, 1]);
  const rotateX = useTransform(smoothProgress, [0, 1], [5, 0]);
  const y = useTransform(smoothProgress, [0, 1], [34, 0]);
  const opacity = useTransform(smoothProgress, [0, 0.35], [0.45, 1]);

  return (
    <div ref={ref} style={{ perspective: '1200px' }}>
      <motion.div
        className={className}
        style={{ scale, rotateX, y, opacity, transformOrigin: 'center top', ...style }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Purposeful section reveal with restrained slide and opacity.
 */
export function EditorialReveal({ children, delay = 0, y = 26, className = '', style = {} }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{ duration: 0.56, delay, ease: EDITORIAL_EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Container & child items for rhythmic editorial staggers.
 */
export function StaggerEditorial({ children, className = '', style = {} }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 'some' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '', style = {} }) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: 22 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.48, ease: EDITORIAL_EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scroll-linked vertical depth shift for photography & parallax layers.
 */
export function ParallaxMedia({ children, distance = 42, className = '', style = {} }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className} style={{ position: 'relative', ...style }}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/**
 * Calm, smoothly paced velocity-reactive horizontal ticker.
 */
export function VelocityMarquee({ items = [], baseVelocity = 3.2, reverse = false, accent = false }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 320 });
  const velocityFactor = useTransform(smoothVelocity, [-1500, 0, 1500], [1.4, 0, 1.4], {
    clamp: true,
  });

  const dirMultiplier = reverse ? 1 : -1;

  useAnimationFrame((_, delta) => {
    const dt = Math.min(delta, 40) / 1000;
    const moveBy = dirMultiplier * Math.abs(baseVelocity) * dt;
    const boost = dirMultiplier * Math.abs(velocityFactor.get()) * 1.8 * dt;
    let next = baseX.get() + moveBy + boost;
    if (next <= -50) next += 50;
    if (next >= 0) next -= 50;
    baseX.set(next);
  });

  const x = useTransform(baseX, (v) => `${v}%`);
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className={`velocity-track ${accent ? 'velocity-track--accent' : ''}`.trim()}>
      <motion.div className="velocity-belt" style={{ x }}>
        {repeated.map((label, idx) => (
          <span key={`${label}-${idx}`} className="velocity-item">
            <span>{label}</span>
            <span className="velocity-sep" aria-hidden="true">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * Organic botanical curve echoing CUP2EAT's standee banner edge.
 */
export function CurvedWaveDivider({ fill = '#183629', flip = false }) {
  return (
    <div
      aria-hidden="true"
      style={{
        lineHeight: 0,
        overflow: 'hidden',
        transform: flip ? 'rotate(180deg)' : undefined,
        marginBottom: '-1px',
      }}
    >
      <svg
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        style={{ width: '100%', height: 'clamp(30px, 4.4vw, 62px)', display: 'block' }}
      >
        <path
          d="M0,48 C360,4 1080,82 1440,24 L1440,72 L0,72 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
