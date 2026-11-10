import { useEffect } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useCart, FLIGHT_DURATION_MS } from '../../context/CartContext';
import { evaluateBezierPoint, evaluateFlightScale } from '../../utils/flight';

function BezierOrb({ flight }) {
  const progress = useMotionValue(0);

  useEffect(() => {
    // Single continuous slow-to-fast cubic-bezier progress curve with zero waypoint kinks
    const controls = animate(progress, 1, {
      duration: FLIGHT_DURATION_MS / 1000,
      ease: [0.46, 0.03, 0.9, 0.22],
    });
    return () => controls.stop();
  }, [progress]);

  const x = useTransform(progress, (t) => evaluateBezierPoint(flight.curve, t).x);
  const y = useTransform(progress, (t) => evaluateBezierPoint(flight.curve, t).y);
  const scale = useTransform(progress, (t) => evaluateFlightScale(t));
  const opacity = useTransform(progress, [0, 0.88, 1], [0.95, 1, 0.35]);

  return (
    <div>
      {/* Fast Boiling Chai Cup Ripple & Steam Droplets at Launch Point */}
      <div
        className="tea-burst-origin"
        style={{ transform: `translate3d(${flight.curve.p0.x}px, ${flight.curve.p0.y}px, 0)` }}
      >
        <motion.span
          className="tea-ripple-ring"
          initial={{ scale: 0.3, opacity: 0.95 }}
          animate={{ scale: 1.75, opacity: 0 }}
          transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.span
          className="tea-ripple-ring tea-ripple-ring--inner"
          initial={{ scale: 0.2, opacity: 0.9 }}
          animate={{ scale: 1.35, opacity: 0 }}
          transition={{ duration: 0.32, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.span
          className="tea-steam-drop"
          initial={{ x: -10, y: 0, scale: 0.6, opacity: 0.95 }}
          animate={{ x: -18, y: -38, scale: 1.15, opacity: 0 }}
          transition={{ duration: 0.38, ease: 'easeOut' }}
        />
        <motion.span
          className="tea-steam-drop"
          initial={{ x: 0, y: -4, scale: 0.7, opacity: 1 }}
          animate={{ x: 4, y: -48, scale: 1.25, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
        <motion.span
          className="tea-steam-drop"
          initial={{ x: 10, y: 0, scale: 0.6, opacity: 0.95 }}
          animate={{ x: 20, y: -34, scale: 1.1, opacity: 0 }}
          transition={{ duration: 0.36, ease: 'easeOut' }}
        />
      </div>

      {/* Continuous Bezier Product Orb */}
      <motion.div
        className="fly-particle"
        style={{ x, y, scale, opacity }}
      >
        <img src={flight.image} alt="" />
      </motion.div>
    </div>
  );
}

/**
 * Global viewport overlay rendering silky C2-continuous Bezier fly-to-cart projectiles.
 */
export function FlyToCartLayer() {
  const { flights } = useCart();

  return (
    <div aria-hidden="true">
      {flights.map((flight) => (
        <BezierOrb key={flight.id} flight={flight} />
      ))}
    </div>
  );
}
