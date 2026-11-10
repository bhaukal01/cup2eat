import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

/**
 * Global viewport overlay rendering flying thumbnail projectiles into the Navbar Order Box.
 */
export function FlyToCartLayer() {
  const { flights } = useCart();

  return (
    <div aria-hidden="true">
      <AnimatePresence>
        {flights.map((flight) => (
          <motion.div
            key={flight.id}
            className="fly-particle"
            initial={{
              x: flight.trajectory.x[0],
              y: flight.trajectory.y[0],
              scale: flight.trajectory.scale[0],
              opacity: flight.trajectory.opacity[0],
              rotate: flight.trajectory.rotate[0],
            }}
            animate={{
              x: flight.trajectory.x,
              y: flight.trajectory.y,
              scale: flight.trajectory.scale,
              opacity: flight.trajectory.opacity,
              rotate: flight.trajectory.rotate,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.52,
              times: [0, 0.45, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <img src={flight.image} alt="" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

