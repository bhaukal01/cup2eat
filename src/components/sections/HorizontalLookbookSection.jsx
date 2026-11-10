import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, ArrowRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { FLAVOURS } from '../../data/products';
import { formatINR } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui';
import './sections.css';

function LookbookSlide({ item, index, addItem }) {
  const imgRef = useRef(null);
  const [added, setAdded] = useState(false);
  const starterPack = item.packs[0];

  const handleLaunch = () => {
    addItem(item, starterPack, item.defaultCapacity, 1, imgRef.current);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 900);
  };

  return (
    <article className="runway-slide">
      <div className="runway-arch-card" data-cursor="TASTE">
        <img ref={imgRef} src={item.image} alt={item.alt} loading="lazy" />
        <span className="runway-numeral-ghost" aria-hidden="true">
          0{index + 1}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-2)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', margin: 0 }}>
            {item.name}
          </h3>
          <strong style={{ color: 'var(--color-forest-900)', fontSize: 'var(--text-base)', whiteSpace: 'nowrap' }}>
            {formatINR(item.unitPrice)}/cup
          </strong>
        </div>

        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-700)', margin: 0, lineHeight: 1.5 }}>
          {item.tagline}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
          <Button size="sm" onClick={handleLaunch} variant={added ? 'secondary' : 'primary'}>
            {added ? <Check size={15} /> : <ShoppingBag size={15} />}
            <span>{added ? 'Launched!' : `Add ${starterPack.qty}-Pack`}</span>
          </Button>
          <Button to={`/products/${item.id}`} variant="outline" size="sm" aria-label={`View details for ${item.name}`}>
            <ArrowRight size={15} />
          </Button>
        </div>
      </div>
    </article>
  );
}

/**
 * Scroll-pinned Horizontal Lookbook Runway:
 * Dynamically measures rail width vs container width via ResizeObserver on desktop (>= 960px)
 * so every card aligns 100% cleanly within 100vh without clipping, while using touch-snap on smaller viewports.
 */
export function HorizontalLookbookSection() {
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const railRef = useRef(null);
  const { addItem } = useCart();

  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 960 : true
  );
  const [maxShift, setMaxShift] = useState(520);

  useEffect(() => {
    const updateMeasurements = () => {
      const desktop = window.innerWidth >= 960;
      setIsDesktop(desktop);
      if (viewportRef.current && railRef.current) {
        const overflow = Math.max(0, railRef.current.scrollWidth - viewportRef.current.clientWidth);
        setMaxShift(overflow);
      }
    };

    updateMeasurements();
    const ro = new ResizeObserver(updateMeasurements);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (railRef.current) ro.observe(railRef.current);
    window.addEventListener('resize', updateMeasurements);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateMeasurements);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxShift]);
  const runwayItems = FLAVOURS.slice(0, 5);

  const nudgeMobileScroll = (dir) => {
    if (!railRef.current) return;
    railRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <section ref={trackRef} className="runway-outer" aria-label="Flavour Lookbook Runway">
      <div className="runway-sticky">
        <div
          className="container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
          }}
        >
          <div>
            <span className="eyebrow">Scroll Sideways Through Taste</span>
            <h2 className="section-heading" style={{ marginBottom: 0 }}>
              The CUP2EAT Flavour Lookbook
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            {!isDesktop && (
              <>
                <Button variant="outline" size="sm" onClick={() => nudgeMobileScroll(-1)} aria-label="Scroll flavours left">
                  <ChevronLeft size={16} />
                </Button>
                <Button variant="outline" size="sm" onClick={() => nudgeMobileScroll(1)} aria-label="Scroll flavours right">
                  <ChevronRight size={16} />
                </Button>
              </>
            )}
            <Button to="/products" variant="outline" size="sm">
              View Full Catalogue
            </Button>
          </div>
        </div>

        <div className="container">
          <div ref={viewportRef} className="runway-viewport">
            <motion.div
              ref={railRef}
              className="runway-rail"
              style={isDesktop ? { x } : undefined}
            >
              {runwayItems.map((item, idx) => (
                <LookbookSlide key={item.id} item={item} index={idx} addItem={addItem} />
              ))}
            </motion.div>
          </div>

          <div className="runway-progress-wrap" aria-hidden="true">
            <motion.div
              className="runway-progress-fill"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
