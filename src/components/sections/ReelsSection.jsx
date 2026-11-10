import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { REELS } from '../../data/reels';
import { BRAND } from '../../data/brand';
import { Button } from '../ui';
import { CurvedWaveDivider } from '../motion/MotionPrimitives';
import './sections.css';

export function ReelsSection() {
  const sectionRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 960 : true
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 960px)');
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Opposing vertical drift on side-by-side desktop columns only
  const reelLeftY = useTransform(scrollYProgress, [0, 1], [24, -26]);
  const reelRightY = useTransform(scrollYProgress, [0, 1], [-24, 26]);

  return (
    <>
      <CurvedWaveDivider fill="#183629" />
      <section ref={sectionRef} className="section section--dark">
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-10)' }}>
            <div>
              <span className="eyebrow">Straight From {BRAND.handle}</span>
              <h2 className="section-heading" style={{ marginBottom: 'var(--space-2)' }}>
                Real Pour Moments on Camera
              </h2>
              <p className="section-lead" style={{ marginBottom: 0 }}>
                Watch our actual product reels—featuring the ₹20 individually sealed Chocolate Coated cup and birthday brownies.
              </p>
            </div>
            <Button href={BRAND.instagramUrl} target="_blank" rel="noreferrer" variant="outline-light" size="sm">
              <Instagram size={15} />
              <span>Follow {BRAND.handle}</span>
              <ArrowUpRight size={14} />
            </Button>
          </div>

          <div className="reels-cinema-grid">
            {REELS.map((reel, idx) => (
              <motion.article
                key={reel.id}
                className="reel-cinema-item"
                style={isDesktop ? { y: idx % 2 === 0 ? reelLeftY : reelRightY } : undefined}
              >
                <div className="reel-video-shell" data-cursor="WATCH">
                  <video
                    src={reel.videoSrc}
                    controls
                    preload="metadata"
                    playsInline
                    aria-label={reel.title}
                  />
                </div>
                <div>
                  <div style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold-300)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                    Reel 0{idx + 1} · {reel.tag}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: 'var(--color-cream-50)', marginBottom: 'var(--space-3)' }}>
                    {reel.title}
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-cream-200)', marginBottom: 'var(--space-4)' }}>
                    {reel.summary}
                  </p>
                  <ul className="reel-bullets" style={{ marginBottom: 'var(--space-5)' }}>
                    {reel.highlights.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <Button to="/catering" variant="secondary" size="sm">
                    Book This Setup for Events
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <CurvedWaveDivider fill="#183629" flip />
    </>
  );
}
