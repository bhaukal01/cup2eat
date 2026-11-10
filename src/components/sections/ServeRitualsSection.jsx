import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import coatedPouchImg from '../../assets/images/chocolate-coated-pouch.jpg';
import elaichiCupImg from '../../assets/images/elaichi-chai-cup.jpg';
import brownieCupImg from '../../assets/images/brownie-cup.jpg';
import { EDITORIAL_EASE } from '../motion/MotionPrimitives';
import './sections.css';

const RITUALS = [
  {
    id: 'chai',
    numeral: '01',
    tag: 'Chai & Street Cafés · 100 ml',
    title: 'Better Than Plastic or Fragile Clay Kulhads',
    copy: 'Serve steaming masala chai or filter kaapi inside a golden crisp Elaichi or Vanilla cup. It stays crunch-firm for up to 40 minutes with zero microplastic liners or broken clay shards piling around the stall.',
    image: elaichiCupImg,
    alt: 'Masala chai served in crisp Elaichi edible cup with green cardamom pods',
  },
  {
    id: 'espresso',
    numeral: '02',
    tag: '₹20 Chocolate Coated Single Pouch',
    title: 'Individually Sealed Hygiene for High-Footfall Counters',
    copy: 'Shown in our @cup2eat reels: every chocolate-rimmed waffle cup ships in a crystal-clear protective pouch. Unwrap at point-of-serve, pour hot espresso or mocha, sip clean, and bite the dark chocolate rim.',
    image: coatedPouchImg,
    alt: 'Chocolate Coated waffle cup in individual clear hygienic pouch next to espresso',
  },
  {
    id: 'brownies',
    numeral: '03',
    tag: 'Birthdays, Weddings & Celebrations',
    title: 'Serve Warm Brownies & Sundaes with Zero Dirty Bowls',
    copy: 'Turn birthday tables and event counters into a talking point. Serve warm walnut brownies or vanilla ice cream right inside our crisp waffle cups—guests devour both dessert and cup with zero trash left behind.',
    image: brownieCupImg,
    alt: 'Warm fudge brownie topped with melted chocolate in an edible waffle cup',
  },
];

export function ServeRitualsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = RITUALS[activeIndex];

  return (
    <section className="section">
      <div className="container">
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <span className="eyebrow">Beyond Disposable Cups</span>
          <h2 className="section-heading">Sticky Rituals for Every Pour & Table</h2>
        </div>

        <div className="sticky-ritual-grid">
          <div className="sticky-media-column">
            <div className="sticky-photo-canvas">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id}
                  src={current.image}
                  alt={current.alt}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.36, ease: EDITORIAL_EASE }}
                />
              </AnimatePresence>
            </div>
            <div style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold-600)' }}>
              {current.numeral} — {current.tag}
            </div>
          </div>

          <div className="ritual-chapters">
            {RITUALS.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <motion.article
                  key={item.id}
                  className={`ritual-chapter ${isActive ? 'ritual-chapter--active' : 'ritual-chapter--dim'}`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                  onViewportEnter={() => setActiveIndex(idx)}
                  viewport={{ amount: 0.6 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                    <span className="editorial-index" style={{ fontSize: 'var(--text-xl)' }}>
                      {item.numeral}
                    </span>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-forest-800)' }}>
                      {item.tag}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)', marginBottom: 'var(--space-3)' }}>
                    {item.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: 'var(--text-base)', color: 'var(--color-ink-700)' }}>
                    {item.copy}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
