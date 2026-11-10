import { BRAND } from '../data/brand';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PageHeader } from '../components/layout/PageHeader';
import { BrandLogo } from '../components/layout/BrandLogo';
import { ReelsSection } from '../components/sections/ReelsSection';
import { CtaBanner } from '../components/sections/CtaBanner';
import { Badge } from '../components/ui';
import { EditorialReveal, ParallaxMedia } from '../components/motion/MotionPrimitives';
import heroCupsImg from '../assets/images/hero-cups.jpg';
import '../components/sections/sections.css';

export function AboutPage() {
  useDocumentTitle('About CUP2EAT');

  return (
    <>
      <PageHeader
        eyebrow="Our Story & Brand Ethos"
        title="Small Sip. Big Change."
        lead={`${BRAND.ethos}. We started ${BRAND.name} with one simple obsession: why throw away a cup after a five-minute chai when the cup itself can be the best bite?`}
        currentPage="About Us"
      />

      <section className="section">
        <div className="container detail-grid">
          <EditorialReveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <BrandLogo size={68} />
              <div>
                <Badge tone="forest">{BRAND.fssaiLabel}</Badge>
                <div className="script-accent" style={{ fontSize: '2rem', color: 'var(--color-gold-600)', marginTop: '4px' }}>
                  {BRAND.tagline}
                </div>
              </div>
            </div>

            <h2 className="section-heading" style={{ fontSize: 'var(--text-2xl)', marginBottom: 0 }}>
              From Chai Stalls to Birthday Tables Across India
            </h2>

            <p style={{ color: 'var(--color-ink-700)', margin: 0 }}>
              Every day, millions of plastic cups and plastic-lined paper cups end up overflowing dustbins after just a single sip of masala chai or espresso. Clay kulhads break in transit and deplete fertile topsoil.
            </p>
            <p style={{ color: 'var(--color-ink-700)', margin: 0 }}>
              At {BRAND.name}, we bake crisp, grain-rich biscuit cups in four real flavours—<strong>Chocolate, Vanilla, Elaichi, and ₹20 Chocolate Coated</strong>—giving cafés, caterers, and home hosts an unforgettable edible vessel for hot drinks, cold coffee, and brownies.
            </p>

            <div className="orbital-bottom-ledger" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))' }}>
              {BRAND.performanceSpecs.map((spec) => (
                <div key={spec.metric} className="hero-ledger-item">
                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-forest-800)', marginBottom: '4px' }}>
                    {spec.metric}
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-900)', fontWeight: 600 }}>
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </EditorialReveal>

          <ParallaxMedia distance={18}>
            <img
              src={heroCupsImg}
              alt="CUP2EAT baked edible cups paired with chocolate, cardamom, vanilla, and coffee beans"
              className="detail-photo"
            />
          </ParallaxMedia>
        </div>
      </section>

      <ReelsSection />

      <CtaBanner />
    </>
  );
}
