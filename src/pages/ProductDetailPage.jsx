import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowLeft, ShoppingBag, CheckCircle2, Flame, Snowflake } from 'lucide-react';
import { FLAVOURS } from '../data/products';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/formatters';
import { Badge, Button, RadioGroup, EmptyState } from '../components/ui';
import { ProductCard } from '../components/sections/ProductCard';
import { BrandLogo } from '../components/layout/BrandLogo';
import { EditorialReveal } from '../components/motion/MotionPrimitives';
import '../components/sections/sections.css';

export function ProductDetailPage() {
  const { productId } = useParams();
  const product = FLAVOURS.find((p) => p.id === productId);
  const { addItem } = useCart();
  const photoRef = useRef(null);

  const [selectedCapacity, setSelectedCapacity] = useState(product?.defaultCapacity || '100 ml');
  const [selectedPackId, setSelectedPackId] = useState(product?.packs[0]?.id || '');

  const rawRotX = useMotionValue(0);
  const rawRotY = useMotionValue(0);
  const rotateX = useSpring(rawRotX, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(rawRotY, { stiffness: 180, damping: 24 });

  useEffect(() => {
    if (product) {
      setSelectedCapacity(product.defaultCapacity);
      setSelectedPackId(product.packs[0].id);
    }
  }, [product]);

  useDocumentTitle(product ? product.name : 'Cup Not Found');

  if (!product) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState
            title="Product flavour not found"
            description="The cup variant you requested isn't in our current catalogue."
            action={<Button to="/products">Back to All Edible Cups</Button>}
          />
        </div>
      </section>
    );
  }

  const activePack =
    product.packs.find((p) => p.id === selectedPackId) || product.packs[0];
  const packTotal = activePack.qty * activePack.unitPrice;
  const related = FLAVOURS.filter((p) => p.id !== product.id).slice(0, 3);

  const onTiltMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawRotY.set(((e.clientX - rect.left) / rect.width - 0.5) * 12);
    rawRotX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 12);
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <Link
              to="/products"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--color-forest-900)',
              }}
            >
              <ArrowLeft size={16} /> Back to Edible Cups
            </Link>
          </div>

          <div className="detail-grid">
            <div className="detail-photo-sticky" style={{ perspective: '900px' }}>
              <motion.div
                style={{ rotateX, rotateY, position: 'relative' }}
                onMouseMove={onTiltMove}
                onMouseLeave={() => {
                  rawRotX.set(0);
                  rawRotY.set(0);
                }}
              >
                <div style={{ position: 'absolute', top: '-16px', right: '-10px', zIndex: 5 }}>
                  <BrandLogo size={64} />
                </div>
                <img ref={photoRef} src={product.image} alt={product.alt} className="detail-photo" data-cursor="BITE" />
              </motion.div>

              <div className="orbital-bottom-ledger" style={{ marginTop: 'var(--space-6)', gridTemplateColumns: '1fr 1fr' }}>
                <div className="hero-ledger-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontWeight: 700, fontSize: 'var(--text-sm)', marginBottom: '2px' }}>
                    <Flame size={15} style={{ color: 'var(--color-warning-fg)' }} /> Hot Hold Time
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-700)' }}>{product.holdTimeHot}</div>
                </div>
                <div className="hero-ledger-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontWeight: 700, fontSize: 'var(--text-sm)', marginBottom: '2px' }}>
                    <Snowflake size={15} style={{ color: 'var(--color-info-fg)' }} /> Cold / Dessert Hold
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-700)' }}>{product.holdTimeCold}</div>
                </div>
              </div>
            </div>

            <EditorialReveal delay={0.08}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                <Badge tone="forest">{product.badge}</Badge>
                {product.dietary.map((d) => (
                  <Badge key={d} tone="gold">
                    {d}
                  </Badge>
                ))}
              </div>

              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.95rem, 3.6vw, 2.9rem)', marginBottom: 'var(--space-2)' }}>
                {product.name}
              </h1>
              <p style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-forest-900)', marginBottom: 'var(--space-4)' }}>
                {formatINR(activePack.unitPrice)} / cup · Box Total {formatINR(packTotal)}
              </p>

              <p style={{ color: 'var(--color-ink-700)', marginBottom: 'var(--space-6)' }}>
                {product.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', marginBottom: 'var(--space-6)' }}>
                <RadioGroup
                  name="cup-capacity"
                  label="Select Capacity"
                  value={selectedCapacity}
                  onChange={setSelectedCapacity}
                  options={product.capacityOptions.map((c) => ({ label: c, value: c }))}
                />

                <RadioGroup
                  name="pack-size"
                  label="Choose Pack Size"
                  value={activePack.id}
                  onChange={setSelectedPackId}
                  options={product.packs.map((p) => ({
                    label: `${p.label} — ${formatINR(p.qty * p.unitPrice)}`,
                    value: p.id,
                  }))}
                />
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
                <Button
                  size="lg"
                  onClick={() =>
                    addItem(product, activePack, selectedCapacity, 1, photoRef.current)
                  }
                >
                  <ShoppingBag size={17} /> Add {activePack.label} to Order Box
                </Button>
                <Button to="/catering" variant="outline" size="lg">
                  Need 500+ Bulk Cartons?
                </Button>
              </div>

              <hr className="hairline-rule" />

              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>
                  Best Beverage &amp; Dessert Pairings
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                  {product.pairings.map((pairing) => (
                    <div key={pairing} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                      <CheckCircle2 size={15} style={{ color: 'var(--color-success-fg)' }} />
                      <span>{pairing}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-500)', paddingTop: 'var(--space-2)' }}>
                  <strong>Ingredients:</strong> {product.ingredients}
                </div>
              </div>
            </EditorialReveal>
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <h2 className="section-heading">Explore Other CUP2EAT Flavours</h2>
          <div className="products-grid" style={{ marginTop: 'var(--space-6)' }}>
            {related.map((item, idx) => (
              <ProductCard key={item.id} product={item} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
