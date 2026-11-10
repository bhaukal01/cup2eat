import { useState, useMemo } from 'react';
import { Search, Coffee } from 'lucide-react';
import { FLAVOURS, CAPACITY_SPECS } from '../data/products';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PageHeader } from '../components/layout/PageHeader';
import { ProductCard } from '../components/sections/ProductCard';
import { CtaBanner } from '../components/sections/CtaBanner';
import { Tabs, Input, Select, EmptyState, Button, Skeleton, Table } from '../components/ui';
import { EditorialReveal } from '../components/motion/MotionPrimitives';
import '../components/sections/sections.css';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Cups & Boxes' },
  { id: 'coated', label: 'Chocolate Coated (₹20)' },
  { id: 'spiced', label: 'Elaichi Chai' },
  { id: 'classic', label: 'Chocolate & Vanilla' },
  { id: 'bundles', label: 'Party & Taster Boxes' },
];

const CAPACITY_FILTERS = [
  { value: 'all', label: 'All Capacities (100 ml & 150 ml)' },
  { value: '100 ml', label: '100 ml (Chai / Espresso / Brownies)' },
  { value: '150 ml', label: '150 ml (Cold Coffee / Shakes)' },
];

const SPEC_COLUMNS = [
  { key: 'size', header: 'Capacity', render: (r) => <strong>{r.size}</strong> },
  { key: 'idealFor', header: 'Ideal Serves' },
  { key: 'hotHold', header: 'Hold Performance' },
  { key: 'packaging', header: 'Packaging Style' },
];

export function ProductsPage() {
  useDocumentTitle('Edible Cups & Packs');
  const [category, setCategory] = useState('all');
  const [capacity, setCapacity] = useState('all');
  const [query, setQuery] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);

  const handleCategoryChange = (nextId) => {
    setIsFiltering(true);
    setCategory(nextId);
    window.setTimeout(() => setIsFiltering(false), 160);
  };

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FLAVOURS.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category;
      const matchesCapacity =
        capacity === 'all' || item.capacityOptions.includes(capacity);
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.tagline.toLowerCase().includes(q) ||
        item.pairings.some((p) => p.toLowerCase().includes(q));
      return matchesCategory && matchesCapacity && matchesQuery;
    });
  }, [category, capacity, query]);

  const resetFilters = () => {
    setCategory('all');
    setCapacity('all');
    setQuery('');
  };

  const useAsymmetric =
    category === 'all' && capacity === 'all' && !query.trim() && filteredProducts.length > 2;

  return (
    <>
      <PageHeader
        eyebrow="FSSAI Licensed Edible Tableware"
        title="Edible Cups & Tasting Packs"
        lead="Choose individually sealed Chocolate Coated ₹20 pouches, aromatic Elaichi chai cups, Chocolate or Vanilla café wafers, or birthday dessert boxes."
        currentPage="Edible Cups"
      />

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', marginBottom: 'var(--space-10)' }}>
            <Tabs
              items={CATEGORY_TABS}
              activeId={category}
              onChange={handleCategoryChange}
              ariaLabel="Filter edible cups by flavour category"
            />

            <div style={{ display: 'grid', gap: 'var(--space-4)', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
              <Input
                id="product-search"
                label="Search flavour or beverage pairing"
                placeholder="Try 'chai', 'brownie', 'elaichi', or '150 ml'..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Select
                id="capacity-filter"
                label="Cup Size"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                options={CAPACITY_FILTERS}
              />
            </div>
          </div>

          {isFiltering ? (
            <div className="products-grid" aria-busy="true" aria-label="Updating filtered products">
              {[1, 2, 3].map((n) => (
                <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <Skeleton height="220px" />
                  <Skeleton height="24px" width="70%" />
                  <Skeleton height="16px" width="90%" />
                  <Skeleton height="36px" width="100%" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <EmptyState
              icon={query ? Search : Coffee}
              title="No matching cups found"
              description="Try clearing your search keyword or switching back to all capacities to view our complete range."
              action={<Button onClick={resetFilters}>Reset All Filters</Button>}
            />
          ) : useAsymmetric ? (
            <div className="asymmetric-catalogue-grid">
              {filteredProducts.map((product, idx) => {
                if (idx === 0) {
                  return <ProductCard key={product.id} product={product} variant="hero" index={idx} />;
                }
                const slotClass =
                  idx % 2 === 1 ? 'asymmetric-slot--wide' : 'asymmetric-slot--narrow';
                return (
                  <EditorialReveal key={product.id} className={slotClass} delay={0.05 * (idx % 3)}>
                    <ProductCard product={product} index={idx} />
                  </EditorialReveal>
                );
              })}
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product, idx) => (
                <EditorialReveal key={product.id}>
                  <ProductCard product={product} index={idx} />
                </EditorialReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section--surface">
        <EditorialReveal className="container">
          <span className="eyebrow">Size Guide</span>
          <h2 className="section-heading">100 ml vs 150 ml Cup Guide</h2>
          <p className="section-lead">Compare capacity specs before launching packs into your Order Box.</p>
          <Table columns={SPEC_COLUMNS} rows={CAPACITY_SPECS} caption="Size and packaging specification table" />
        </EditorialReveal>
      </section>

      <CtaBanner />
    </>
  );
}
