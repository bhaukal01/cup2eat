import { Instagram, ArrowRight } from 'lucide-react';
import { BRAND } from '../../data/brand';
import { Button } from '../ui';
import { EditorialReveal, CurvedWaveDivider } from '../motion/MotionPrimitives';

export function CtaBanner() {
  return (
    <>
      <CurvedWaveDivider fill="#183629" />
      <section className="section section--dark">
        <EditorialReveal>
          <div
            className="container"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--space-8)',
            }}
          >
            <div style={{ maxWidth: '58ch' }}>
              <span className="eyebrow">Switch Your Counter</span>
              <h2 className="section-heading" style={{ marginBottom: 'var(--space-2)' }}>
                <span
                  className="script-accent"
                  style={{ fontSize: 'clamp(2.35rem, 4.4vw, 3.25rem)', color: 'var(--color-gold-300)' }}
                >
                  {BRAND.closingScript}
                </span>
              </h2>
              <p className="section-lead" style={{ marginBottom: 0 }}>
                {BRAND.closingCopy} Order tasting boxes for home & birthdays or request wholesale cartons for your café.
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              <Button to="/catering" variant="secondary" size="lg">
                <span>Request Wholesale Pricing</span>
                <ArrowRight size={17} />
              </Button>
              <Button href={BRAND.instagramUrl} target="_blank" rel="noreferrer" variant="outline-light" size="lg">
                <Instagram size={17} />
                <span>DM {BRAND.handle}</span>
              </Button>
            </div>
          </div>
        </EditorialReveal>
      </section>
    </>
  );
}
