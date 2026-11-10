import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ShieldCheck, ArrowRight, ArrowDown } from 'lucide-react';
import { BRAND } from '../../data/brand';
import heroCupsImg from '../../assets/images/hero-cups.jpg';
import { BrandLogo } from '../layout/BrandLogo';
import { Button } from '../ui';
import { TextReveal, EDITORIAL_EASE } from '../motion/MotionPrimitives';
import './sections.css';

export function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Dramatic visible multi-plane scroll choreography
  const watermarkX = useTransform(scrollYProgress, [0, 1], ['0%', '-24%']);
  const leftWingX = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const rightWingX = useTransform(scrollYProgress, [0, 1], [0, 56]);
  const archScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const archY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const sealRotate = useTransform(scrollYProgress, [0, 1], [0, 72]);
  const chipLeftY = useTransform(scrollYProgress, [0, 1], [0, -76]);
  const chipRightY = useTransform(scrollYProgress, [0, 1], [0, 72]);

  // Tactile 3D pointer tilt on central cup portal
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(rawRotateY, { stiffness: 180, damping: 24 });

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    rawRotateY.set(normX * 12);
    rawRotateX.set(-normY * 12);
  };

  const resetTilt = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <section ref={heroRef} className="orbital-hero">
      <motion.div className="hero-ghost-watermark" style={{ x: watermarkX }} aria-hidden="true">
        {BRAND.name}
      </motion.div>

      <div className="container">
        <motion.div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 'var(--space-3)',
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-forest-800)',
            marginBottom: 'var(--space-5)',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: EDITORIAL_EASE }}
        >
          <ShieldCheck size={16} style={{ color: 'var(--color-forest-900)' }} aria-hidden="true" />
          <span>{BRAND.fssaiLabel}</span>
          <span aria-hidden="true">·</span>
          <span>{BRAND.ethos}</span>
        </motion.div>

        <div className="orbital-stage">
          {/* Left Typographic Wing — diverges smoothly on scroll */}
          <motion.div className="orbital-left-col" style={{ x: leftWingX }}>
            <TextReveal as="h1" className="hero-display-split" delay={0.04}>
              SIP HOT CHAI.
            </TextReveal>
            <motion.span
              className="hero-script-float"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.14, ease: EDITORIAL_EASE }}
            >
              {BRAND.tagline}.
            </motion.span>
            <p
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--color-ink-700)',
                maxWidth: '34ch',
                margin: 'var(--space-3) 0 var(--space-5)',
              }}
            >
              Grain-baked edible cups in Chocolate, Vanilla, Elaichi &amp; ₹20 Chocolate Coated pouches—engineered to hold piping hot drinks cleanly.
            </p>
            <Button to="/products" size="lg" data-cursor="TASTE">
              <span>Explore Edible Cups</span>
              <ArrowRight size={17} aria-hidden="true" />
            </Button>
          </motion.div>

          {/* Center 3D-Tilted & Parallax Arch Window Portal */}
          <div className="orbital-center-portal">
            <motion.div className="hero-seal-orbit" style={{ rotate: sealRotate }} aria-hidden="true">
              <BrandLogo size={72} />
            </motion.div>

            <motion.div className="satellite-chip satellite-chip--top-left" style={{ y: chipLeftY }}>
              ₹20 Coated Sealed Pouch
            </motion.div>

            <motion.div className="satellite-chip satellite-chip--bottom-right" style={{ y: chipRightY }}>
              40m Leak-Proof Hold
            </motion.div>

            <motion.div
              className="arch-cup-frame"
              data-cursor="BITE"
              onMouseMove={handlePointerMove}
              onMouseLeave={resetTilt}
              style={{
                rotateX,
                rotateY,
                scale: archScale,
                y: archY,
              }}
            >
              <img
                src={heroCupsImg}
                alt="Golden baked CUP2EAT edible biscuit cups filled with masala chai and chocolate-rimmed espresso surrounded by spices and vanilla orchid"
              />
              <div className="arch-cup-label">
                <span>Chocolate · Vanilla · Elaichi</span>
                <strong style={{ color: 'var(--color-gold-300)' }}>100 / 150 ml</strong>
              </div>
            </motion.div>
          </div>

          {/* Right Typographic Counterweight */}
          <motion.div className="orbital-right-col" style={{ x: rightWingX }}>
            <TextReveal as="p" className="hero-display-split" delay={0.1}>
              CRUNCH THE CUP.
            </TextReveal>
            <div
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-forest-800)',
                marginTop: 'var(--space-4)',
                marginBottom: 'var(--space-5)',
              }}
            >
              {BRAND.positioningBar.join(' · ')}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', alignItems: 'center' }}>
              <Button to="/catering" variant="outline" size="lg">
                Café &amp; Party Bulk
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Hairline Credential Footer Ledger + Scroll Hint */}
        <div className="orbital-bottom-ledger">
          {BRAND.pillars.map((pillar) => (
            <div key={pillar.id} className="hero-ledger-item">
              <strong style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-forest-950)' }}>
                {pillar.label}
              </strong>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-700)', lineHeight: 1.45, display: 'block' }}>
                {pillar.detail}
              </span>
            </div>
          ))}
        </div>

        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            marginTop: 'var(--space-5)',
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-forest-800)',
          }}
        >
          <span>Scroll Down For Sideways Lookbook &amp; Cup Layers</span>
          <ArrowDown size={15} aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
