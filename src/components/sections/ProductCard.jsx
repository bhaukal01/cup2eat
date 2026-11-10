import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { formatINR } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { Badge, Button } from '../ui';
import './sections.css';

export function ProductCard({ product, variant = 'standard', index }) {
  const { addItem } = useCart();
  const imgRef = useRef(null);
  const [justAdded, setJustAdded] = useState(false);
  const starterPack = product.packs[0];

  const handleAdd = () => {
    addItem(product, starterPack, product.defaultCapacity, 1, imgRef.current);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 900);
  };

  if (variant === 'hero') {
    return (
      <article className="asymmetric-slot--hero">
        <Link
          to={`/products/${product.id}`}
          className="product-card-media product-card-media--wide"
          style={{ display: 'block', marginBottom: 0 }}
          data-cursor="VIEW"
        >
          <img ref={imgRef} src={product.image} alt={product.alt} loading="lazy" />
          <div className="product-hover-glaze">
            Pair with: {product.pairings.join(' · ')}
          </div>
        </Link>

        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
            <Badge tone="forest">{product.badge}</Badge>
            <span className="editorial-index" style={{ fontSize: 'var(--text-base)' }}>
              Spotlight · {product.capacityOptions.join(' / ')}
            </span>
          </div>

          <div className="product-card-meta">
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.4rem)' }}>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </h2>
            <span style={{ fontWeight: 700, fontSize: 'var(--text-xl)', color: 'var(--color-forest-900)', whiteSpace: 'nowrap' }}>
              {formatINR(product.unitPrice)}/cup
            </span>
          </div>
          <p style={{ color: 'var(--color-ink-700)', fontSize: 'var(--text-base)', marginBottom: 'var(--space-5)' }}>
            {product.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            <Button onClick={handleAdd} variant={justAdded ? 'secondary' : 'primary'} size="lg">
              {justAdded ? <Check size={16} aria-hidden="true" /> : <ShoppingBag size={16} aria-hidden="true" />}
              <span>{justAdded ? 'Launched to Box' : `Add ${starterPack.label}`}</span>
            </Button>
            <Button to={`/products/${product.id}`} variant="outline" size="lg">
              <span>View Pack Pricing</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="editorial-product">
      <div>
        <Link
          to={`/products/${product.id}`}
          className="product-card-media"
          style={{ display: 'block' }}
          data-cursor="TASTE"
        >
          <img ref={imgRef} src={product.image} alt={product.alt} loading="lazy" />
          <div className="product-hover-glaze">
            Best with: {product.pairings.slice(0, 3).join(' · ')}
          </div>
        </Link>

        {/* Rendered cleanly below the arched image so zero border-radius curvature ever clips text */}
        <div style={{ marginBottom: 'var(--space-2)' }}>
          <Badge tone="forest">{product.badge}</Badge>
        </div>

        <div className="product-card-meta">
          <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}>
            {typeof index === 'number' && (
              <span className="editorial-index" style={{ fontSize: 'var(--text-sm)', marginRight: '6px' }}>
                0{index + 1}
              </span>
            )}
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </h3>
          <span style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-forest-900)', whiteSpace: 'nowrap' }}>
            {formatINR(product.unitPrice)}/cup
          </span>
        </div>

        <p style={{ margin: '0 0 var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--color-ink-700)' }}>
          {product.tagline}
        </p>

        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-gold-600)', marginBottom: 'var(--space-4)' }}>
          {product.capacityOptions.join(' / ')} · {product.holdTimeHot} hot hold
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--space-2)' }}>
        <Button size="sm" onClick={handleAdd} variant={justAdded ? 'secondary' : 'primary'}>
          {justAdded ? <Check size={15} aria-hidden="true" /> : <ShoppingBag size={15} aria-hidden="true" />}
          <span>{justAdded ? 'Added to Box' : `Add ${starterPack.qty}-Pack`}</span>
        </Button>
        <Button to={`/products/${product.id}`} variant="outline" size="sm" aria-label={`Inspect ${product.name}`}>
          <ArrowRight size={15} />
        </Button>
      </div>
    </article>
  );
}
