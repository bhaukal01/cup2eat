import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './sections.css';

const ANATOMY_LAYERS = [
  {
    num: '01',
    title: 'Dark Chocolate Rim Dip & Flavour Crust',
    detail: 'Dipped dark cocoa rim (on our ₹20 signature edition) or infused cardamom & vanilla aromatics directly along the sip edge.',
  },
  {
    num: '02',
    title: 'High-Density Grain & Oat Biscuit Wall',
    detail: 'Baked from wheat flour, rolled oats, and pure plant fat—100% Vegetarian and Vegan Friendly across core flavours.',
  },
  {
    num: '03',
    title: '40-Minute Heat & Leak Lock Interior',
    detail: 'Engineered baking density resists boiling masala chai, filter kaapi, and espresso for up to 40 mins without dripping.',
  },
  {
    num: '04',
    title: 'Zero-Plastic Hygienic Crunch Finish',
    detail: 'Ships in sealed single pouches or moisture-barrier sleeves. Finish your beverage, bite the cup, leave 0g landfill trash.',
  },
];

/**
 * Interactive scroll-driven exploded cutaway of a CUP2EAT edible biscuit cup.
 * Adapts spread range gently on narrow viewports so layers stay crisp without clipping adjacent text.
 */
export function CupAnatomySection() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const rimY = useTransform(scrollYProgress, [0.15, 0.78], isMobile ? [10, -34] : [16, -64]);
  const wallY = useTransform(scrollYProgress, [0.15, 0.78], isMobile ? [4, -10] : [6, -20]);
  const barrierY = useTransform(scrollYProgress, [0.15, 0.78], isMobile ? [-2, 12] : [-4, 22]);
  const baseY = useTransform(scrollYProgress, [0.15, 0.78], isMobile ? [-8, 36] : [-12, 66]);

  return (
    <section ref={sectionRef} className="section section--surface">
      <div className="container">
        <span className="eyebrow">Engineered To Hold &amp; Crunch</span>
        <h2 className="section-heading">Inside the 4-Layer Edible Wall</h2>
        <p className="section-lead">
          Scroll to separate our architectural biscuit anatomy—why piping hot chai stays sealed inside while staying crispy on the final bite.
        </p>

        <div className="anatomy-grid">
          <div className="anatomy-diagram-stage" aria-label="Exploded layered biscuit cup illustration">
            <svg
              viewBox="0 0 320 335"
              style={{ width: '100%', maxWidth: '320px', height: 'auto', overflow: 'visible' }}
            >
              {/* Layer 4: Zero-Waste Crunch Base */}
              <motion.g style={{ y: baseY }}>
                <ellipse cx="160" cy="252" rx="70" ry="20" fill="#183629" stroke="#C69C53" strokeWidth="2.5" />
                <text x="160" y="257" textAnchor="middle" fill="#FAF6EE" fontSize="12.5" fontWeight="700">
                  04 · ZERO PLASTIC BASE
                </text>
              </motion.g>

              {/* Layer 3: Heat-Lock Barrier */}
              <motion.g style={{ y: barrierY }}>
                <path
                  d="M84,158 L236,158 L218,230 C216,239 189,246 160,246 C131,246 104,239 102,230 Z"
                  fill="#C5844E"
                  stroke="#3D2116"
                  strokeWidth="2"
                />
                <text x="160" y="206" textAnchor="middle" fill="#FAF6EE" fontSize="12.5" fontWeight="700">
                  03 · 40-MIN LEAK SHIELD
                </text>
              </motion.g>

              {/* Layer 2: Baked Wheat & Oat Wafer Wall */}
              <motion.g style={{ y: wallY }}>
                <path
                  d="M66,102 L254,102 L236,164 C232,174 199,180 160,180 C121,180 88,174 84,164 Z"
                  fill="#D69F66"
                  stroke="#936B28"
                  strokeWidth="2.5"
                />
                <text x="160" y="143" textAnchor="middle" fill="#161411" fontSize="12.5" fontWeight="700">
                  02 · WHEAT &amp; OAT WAFER WALL
                </text>
              </motion.g>

              {/* Layer 1: Dark Chocolate Coated Rim */}
              <motion.g style={{ y: rimY }}>
                <ellipse cx="160" cy="84" rx="98" ry="24" fill="#3D2116" stroke="#C69C53" strokeWidth="3" />
                <ellipse cx="160" cy="84" rx="80" ry="15" fill="#936B28" opacity="0.88" />
                <text x="160" y="89" textAnchor="middle" fill="#FAF6EE" fontSize="12" fontWeight="700">
                  01 · CHOCOLATE / SPICE RIM
                </text>
              </motion.g>
            </svg>
          </div>

          <div>
            {ANATOMY_LAYERS.map((layer) => (
              <div key={layer.num} className="anatomy-layer-row">
                <span className="editorial-index" style={{ fontSize: 'var(--text-xl)' }}>
                  {layer.num}
                </span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', marginBottom: '4px' }}>
                    {layer.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-ink-700)' }}>
                    {layer.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
