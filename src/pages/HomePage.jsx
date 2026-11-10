import { CAPACITY_SPECS } from '../data/products';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { HeroSection } from '../components/sections/HeroSection';
import { HorizontalLookbookSection } from '../components/sections/HorizontalLookbookSection';
import { CupAnatomySection } from '../components/sections/CupAnatomySection';
import { ServeRitualsSection } from '../components/sections/ServeRitualsSection';
import { ReelsSection } from '../components/sections/ReelsSection';
import { ImpactCalculator } from '../components/sections/ImpactCalculator';
import { CtaBanner } from '../components/sections/CtaBanner';
import { Table } from '../components/ui';
import { ScrollPerspectiveSection, VelocityMarquee } from '../components/motion/MotionPrimitives';
import '../components/sections/sections.css';

const CAPACITY_COLUMNS = [
  { key: 'size', header: 'Cup Capacity', render: (r) => <strong>{r.size}</strong> },
  { key: 'idealFor', header: 'Best Pairings' },
  { key: 'hotHold', header: 'Crisp & Leak Hold' },
  { key: 'availableFlavours', header: 'Flavours' },
];

export function HomePage() {
  useDocumentTitle('Eat Your Drink — 100% Edible Biscuit Cups');

  return (
    <>
      <HeroSection />

      {/* Calm Velocity-Synced Counter-Scrolling Ribbons */}
      <VelocityMarquee
        items={[
          '100% EDIBLE',
          'FSSAI LICENSED',
          'CHOCOLATE COATED ₹20',
          'PURE VEG',
          'VEGAN FRIENDLY',
          'ZERO PLASTIC',
        ]}
        baseVelocity={3.2}
      />
      <VelocityMarquee
        items={[
          'MASALA CHAI',
          'ESPRESSO',
          'WARM BROWNIES',
          'COLD COFFEE',
          'ELAICHI',
          'VANILLA',
        ]}
        baseVelocity={2.6}
        reverse
        accent
      />

      {/* Scroll-Pinned Horizontal Lookbook Runway */}
      <HorizontalLookbookSection />

      {/* Scroll-Exploded Cup Wall Engineering Diagram */}
      <ScrollPerspectiveSection>
        <CupAnatomySection />
      </ScrollPerspectiveSection>

      {/* Sticky Scrollytelling Rituals */}
      <ScrollPerspectiveSection>
        <ServeRitualsSection />
      </ScrollPerspectiveSection>

      {/* Deep Forest Curved Cinema Reels with Opposing Parallax */}
      <ReelsSection />

      {/* Capacity Spec Ledger & Live Impact Estimator */}
      <section className="section">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          <ScrollPerspectiveSection>
            <span className="eyebrow">Sized For Every Menu</span>
            <h2 className="section-heading">100 ml Hot &amp; 150 ml Cold Series</h2>
            <p className="section-lead">
              Engineered for piping hot masala chai, barista espresso shots, cold coffee, and warm brownie service.
            </p>
            <Table columns={CAPACITY_COLUMNS} rows={CAPACITY_SPECS} caption="CUP2EAT Cup Size Specifications" />
          </ScrollPerspectiveSection>

          <ScrollPerspectiveSection>
            <ImpactCalculator />
          </ScrollPerspectiveSection>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
