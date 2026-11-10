import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BRAND } from '../data/brand';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PageHeader } from '../components/layout/PageHeader';
import { ImpactCalculator } from '../components/sections/ImpactCalculator';
import { CtaBanner } from '../components/sections/CtaBanner';
import { Table } from '../components/ui';
import { StaggerEditorial, StaggerItem, EditorialReveal, EDITORIAL_EASE } from '../components/motion/MotionPrimitives';
import '../components/sections/sections.css';

const DECAY_TIMELINE = [
  { label: 'Single-Use Plastic Cup', span: '400+ Years in Soil', pct: 96, color: '#A11E18' },
  { label: 'PE-Lined "Paper" Cup', span: '20+ Years + Microplastics', pct: 68, color: '#8C4F0A' },
  { label: 'Unfired Clay Kulhad', span: 'Topsoil Depletion + Kiln Fuel', pct: 42, color: '#665E54' },
  { label: 'CUP2EAT Edible Cup', span: '5 Mins to Crunch · 0g Trash', pct: 8, color: '#183629' },
];

const COMPARISON_ROWS = [
  {
    type: 'CUP2EAT Edible Cup',
    material: '100% Natural Wheat, Oats & Cocoa/Spices',
    wasteLeft: '0g — You eat the cup!',
    safety: 'FSSAI Licensed · Pure Veg · Vegan Friendly',
    hotPour: '40 mins crisp & leak-proof',
  },
  {
    type: 'Paper Disposable Cup',
    material: 'Virgin paper bonded with LDPE plastic liner',
    wasteLeft: 'Remains in landfill for 20+ years (hard to recycle)',
    safety: 'Microplastics leach above 85°C hot pours',
    hotPour: 'Hold okay, releases micro-films',
  },
  {
    type: 'Single-Use Plastic Cup',
    material: 'Polystyrene / Polypropylene polymer',
    wasteLeft: 'Persists 400+ years in soil & waterways',
    safety: 'High chemical leaching with hot chai',
    hotPour: 'Warps / releases toxins',
  },
  {
    type: 'Unfired Clay Kulhad',
    material: 'Topsoil clay + kiln fuel firing',
    wasteLeft: 'Single-use ceramic shard pile / topsoil depletion',
    safety: 'Porous if not kiln-baked evenly',
    hotPour: 'Heavy, fragile in shipping',
  },
];

const COMPARISON_COLUMNS = [
  { key: 'type', header: 'Cup Option', render: (r) => <strong>{r.type}</strong> },
  { key: 'material', header: 'Core Material' },
  { key: 'wasteLeft', header: 'Post-Sip Footprint' },
  { key: 'safety', header: 'Food & Planet Health' },
  { key: 'hotPour', header: 'Hot Pour Behavior' },
];

export function SustainabilityPage() {
  useDocumentTitle('Sustainability & Zero-Waste Impact');

  return (
    <>
      <PageHeader
        eyebrow="Eco-Friendly Food for a Better Tomorrow"
        title="Zero Plastic. Zero Landfill. 100% Delicious."
        lead="Every conventional paper takeaway cup hides an interior plastic film. CUP2EAT replaces trash with nutrition—baked cleanly from natural grains."
        currentPage="Sustainability"
      />

      <section className="section">
        <div className="container">
          <StaggerEditorial className="editorial-chapter-grid" style={{ marginBottom: 'var(--space-12)' }}>
            {BRAND.pillars.map((pillar, idx) => (
              <StaggerItem key={pillar.id}>
                <article className="editorial-chapter-row">
                  <span className="editorial-index" style={{ fontSize: 'var(--text-lg)', display: 'block', marginBottom: 'var(--space-2)' }}>
                    0{idx + 1}
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
                    {pillar.label}
                  </h2>
                  <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-ink-700)' }}>
                    {pillar.detail}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </StaggerEditorial>

          {/* Animated Landfill Lifespan Bars */}
          <EditorialReveal style={{ marginBottom: 'var(--space-12)' }}>
            <span className="eyebrow">Time To Disappear After Your Chai</span>
            <h2 className="section-heading">Landfill Lifespan Visualized</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
              {DECAY_TIMELINE.map((item) => (
                <div key={item.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: '6px' }}>
                    <span>{item.label}</span>
                    <span style={{ color: item.color }}>{item.span}</span>
                  </div>
                  <div className="decay-bar-track">
                    <motion.div
                      className="decay-bar-fill"
                      style={{ backgroundColor: item.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.pct}%` }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.75, ease: EDITORIAL_EASE }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </EditorialReveal>

          <EditorialReveal>
            <span className="eyebrow">Material Comparison</span>
            <h2 className="section-heading">Why Edible Beats &ldquo;Paper&rdquo; &amp; Plastic</h2>
            <p className="section-lead">An honest comparison across hygiene, hot-pour durability, and environmental footprint.</p>
            <Table columns={COMPARISON_COLUMNS} rows={COMPARISON_ROWS} caption="Cup material sustainability comparison" />
          </EditorialReveal>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
          <ImpactCalculator />

          <div className="editorial-chapter-grid">
            <div className="editorial-chapter-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                <ShieldCheck size={20} style={{ color: 'var(--color-forest-900)' }} />
                <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}>
                  {BRAND.fssaiLabel} &amp; Clean Kitchens
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-ink-700)' }}>
                Baked under strict Indian FSSAI hygiene protocols without synthetic waxes or industrial sealants. Single-pouch sealed variants prevent cross-contamination from factory to chai stall.
              </p>
            </div>

            <div className="editorial-chapter-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                <Leaf size={20} style={{ color: 'var(--color-forest-900)' }} />
                <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}>
                  Even Unfinished Cups Leave Zero Harm
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-ink-700)' }}>
                Even if a guest places a half-eaten wafer cup into garden compost or organic waste, it naturally biodegrades within days with zero microplastic residue.
              </p>
              <div style={{ marginTop: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-success-fg)' }}>
                <CheckCircle2 size={14} /> 100% Biodegradable &amp; Edible
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
