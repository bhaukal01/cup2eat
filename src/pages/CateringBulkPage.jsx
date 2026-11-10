import { useState, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { CheckCircle2, Copy, Instagram } from 'lucide-react';
import { BRAND } from '../data/brand';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useToast } from '../context/ToastContext';
import { validateBulkQuoteForm } from '../utils/validators';
import { PageHeader } from '../components/layout/PageHeader';
import { Card, Badge, Table, Input, Select, Textarea, Checkbox, Button, Alert } from '../components/ui';
import { StaggerEditorial, StaggerItem, EditorialReveal } from '../components/motion/MotionPrimitives';
import '../components/sections/sections.css';

const USE_SEGMENTS = [
  {
    numeral: '01',
    title: 'Specialty Cafés & Chai Tapris',
    copy: 'Serve masala chai, espresso, or cold coffee in crisp edible cups. Eliminate takeaway cup waste at high-footfall counters.',
  },
  {
    numeral: '02',
    title: 'Birthdays & House Celebrations',
    copy: 'Featured on @cup2eat reels: serve warm fudge brownies or gelato in ₹20 Chocolate Coated cups for zero dirty bowls.',
  },
  {
    numeral: '03',
    title: 'Weddings & Event Catering',
    copy: 'Stand out at live chai bars, dessert stations, and welcome drink counters with FSSAI-licensed edible tableware.',
  },
  {
    numeral: '04',
    title: 'Corporate Offices & Pop-Ups',
    copy: 'Switch pantry coffee breaks and sustainability-week events from PE-lined paper cups to 100% edible cups.',
  },
];

const ONBOARDING_STEPS = [
  { step: '01', title: 'Generate Brief & Pick Flavour Mix', detail: 'Choose 100 ml chai/brownie cups, 150 ml cold bar cups, or ₹20 single-serve Chocolate Coated pouches.' },
  { step: '02', title: 'Tasting Box & Counter Stress Test', detail: 'Verify crunchiness and 40-min hot chai leak resistance with your own baristas before placing pallet volume.' },
  { step: '03', title: 'Pan-India Moisture-Sealed Dispatch', detail: 'Cartons ship cushioned with humidity liners directly to your café, venue, or corporate pantry.' },
];

const WHOLESALE_TIERS = [
  { tier: 'Party / Trial Carton', qty: '50 – 200 cups', rate: '₹14 – ₹17 / cup', dispatch: '24–48 hrs', packaging: 'Individually pouched or café boxes' },
  { tier: 'Café Monthly Supply', qty: '250 – 999 cups', rate: '₹12 – ₹15 / cup', dispatch: '2–3 days', packaging: 'Moisture-barrier sleeved cartons' },
  { tier: 'Distributor / Event Bulk', qty: '1,000+ cups', rate: 'Custom Quote', dispatch: 'Scheduled', packaging: 'Pallet / Mixed 4-Flavour Cartons' },
];

const TIER_COLUMNS = [
  { key: 'tier', header: 'Volume Tier', render: (r) => <strong>{r.tier}</strong> },
  { key: 'qty', header: 'Order Volume' },
  { key: 'rate', header: 'Indicative Rate' },
  { key: 'dispatch', header: 'Dispatch Time' },
  { key: 'packaging', header: 'Packaging' },
];

const INITIAL_FORM = {
  name: '',
  businessName: '',
  eventType: 'cafe',
  flavourMix: 'assorted',
  quantity: '250',
  city: '',
  phone: '',
  email: '',
  notes: '',
  agreeTerms: true,
};

function ScrollOnboardingSpine() {
  const spineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: spineRef,
    offset: ['start 78%', 'end 45%'],
  });

  return (
    <div ref={spineRef} className="timeline-scroll-wrap" style={{ marginBottom: 'var(--space-12)' }}>
      <svg width="36" height="280" viewBox="0 0 36 280" aria-hidden="true">
        <line x1="18" y1="12" x2="18" y2="268" stroke="#DFD4C2" strokeWidth="2.5" strokeDasharray="4 4" />
        <motion.line
          x1="18"
          y1="12"
          x2="18"
          y2="268"
          stroke="#183629"
          strokeWidth="3"
          style={{ pathLength: scrollYProgress }}
        />
        <circle cx="18" cy="18" r="6" fill="#C69C53" />
        <circle cx="18" cy="140" r="6" fill="#C69C53" />
        <circle cx="18" cy="260" r="6" fill="#183629" />
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {ONBOARDING_STEPS.map((s) => (
          <div key={s.step}>
            <span className="editorial-index" style={{ fontSize: 'var(--text-sm)' }}>STEP {s.step}</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', margin: '2px 0 4px' }}>{s.title}</h3>
            <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-ink-700)', maxWidth: '52ch' }}>{s.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CateringBulkPage() {
  useDocumentTitle('Catering & Bulk Wholesale');
  const { showToast } = useToast();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState(null);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateBulkQuoteForm(form);
    if (!form.agreeTerms) {
      nextErrors.agreeTerms = 'Please confirm order inquiry consent.';
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      showToast('Please check the highlighted fields before submitting.', 'error');
      return;
    }

    setSubmitting(true);
    window.setTimeout(() => {
      const refCode = `C2E-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedQuote({ ...form, refCode });
      setSubmitting(false);
      showToast('Wholesale quote brief prepared!');
    }, 350);
  };

  const handleCopyBrief = async () => {
    if (!submittedQuote) return;
    const summary = `CUP2EAT Bulk Quote (${submittedQuote.refCode})\nName: ${submittedQuote.name} (${submittedQuote.businessName})\nType: ${submittedQuote.eventType} | Qty: ${submittedQuote.quantity} cups\nFlavours: ${submittedQuote.flavourMix}\nCity: ${submittedQuote.city}\nPhone: ${submittedQuote.phone} | Email: ${submittedQuote.email}\nNotes: ${submittedQuote.notes || 'None'}`;
    try {
      await navigator.clipboard.writeText(summary);
      showToast('Quote brief copied! Send directly on @cup2eat DM.');
    } catch {
      showToast('Clipboard permission unavailable.', 'error');
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Cafés, Events & Parties"
        title="Catering & Bulk Wholesale Orders"
        lead="Whether you serve 150 masala chais a day at a café counter or brownies at a birthday party, switch to FSSAI-licensed zero-waste edible cups."
        currentPage="Catering & Bulk"
      />

      <section className="section">
        <div className="container">
          <StaggerEditorial className="editorial-chapter-grid" style={{ marginBottom: 'var(--space-12)' }}>
            {USE_SEGMENTS.map((seg) => (
              <StaggerItem key={seg.numeral}>
                <article className="editorial-chapter-row">
                  <span className="editorial-index" style={{ fontSize: 'var(--text-lg)', display: 'block', marginBottom: 'var(--space-2)' }}>
                    {seg.numeral}
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
                    {seg.title}
                  </h2>
                  <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-ink-700)' }}>
                    {seg.copy}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </StaggerEditorial>

          <EditorialReveal>
            <span className="eyebrow">How Wholesale Works</span>
            <h2 className="section-heading">From First Tasting Box to Regular Dispatch</h2>
          </EditorialReveal>
          <ScrollOnboardingSpine />

          <EditorialReveal>
            <span className="eyebrow">Wholesale Pricing Slabs</span>
            <h2 className="section-heading">Transparent Bulk Pricing</h2>
            <p className="section-lead">Volume discounts scale cleanly from 50-cup party packs to regular café pallet deliveries.</p>
            <Table columns={TIER_COLUMNS} rows={WHOLESALE_TIERS} caption="Bulk wholesale rate tiers" />
          </EditorialReveal>
        </div>
      </section>

      <section className="section section--surface" id="quote-form">
        <div className="container two-col-grid">
          <Card padded>
            <span className="eyebrow">Fast Wholesale Brief</span>
            <h2 className="section-heading" style={{ fontSize: 'var(--text-2xl)' }}>
              Request Custom Café or Event Pricing
            </h2>
            <p style={{ color: 'var(--color-ink-700)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)' }}>
              Fill out your volume &amp; flavour preferences. We validate everything client-side and generate an instant structured quote ready for dispatch confirmation via {BRAND.handle}.
            </p>

            {submittedQuote && (
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <Alert tone="success" title={`Quote Brief Ready · Ref #${submittedQuote.refCode}`}>
                  Prepared for <strong>{submittedQuote.businessName}</strong> ({submittedQuote.quantity} cups · {submittedQuote.flavourMix}).
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
                    <Button size="sm" variant="outline" onClick={handleCopyBrief}>
                      <Copy size={14} /> Copy Quote Text
                    </Button>
                    <Button size="sm" href={BRAND.instagramUrl} target="_blank" rel="noreferrer">
                      <Instagram size={14} /> Send on @cup2eat DM
                    </Button>
                  </div>
                </Alert>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'grid', gap: 'var(--space-4)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))' }}>
                <Input
                  id="bulk-name"
                  label="Your Full Name"
                  required
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  error={errors.name}
                  placeholder="Aarav Sharma"
                />
                <Input
                  id="bulk-business"
                  label="Café / Company / Event Name"
                  required
                  value={form.businessName}
                  onChange={(e) => handleChange('businessName', e.target.value)}
                  error={errors.businessName}
                  placeholder="Brew & Bite Café / Birthday Party"
                />
              </div>

              <div style={{ display: 'grid', gap: 'var(--space-4)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))' }}>
                <Input
                  id="bulk-email"
                  type="email"
                  label="Email Address"
                  required
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  error={errors.email}
                  placeholder="orders@example.com"
                />
                <Input
                  id="bulk-phone"
                  type="tel"
                  label="Phone / WhatsApp Number"
                  required
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  error={errors.phone}
                  placeholder="9876543210"
                />
              </div>

              <div style={{ display: 'grid', gap: 'var(--space-4)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))' }}>
                <Select
                  id="bulk-type"
                  label="Use Case"
                  value={form.eventType}
                  onChange={(e) => handleChange('eventType', e.target.value)}
                  options={[
                    { value: 'cafe', label: 'Café / Chai Counter' },
                    { value: 'birthday', label: 'Birthday / Brownie Dessert Bar' },
                    { value: 'wedding', label: 'Wedding / Catering Event' },
                    { value: 'corporate', label: 'Corporate Pantry / Gift' },
                  ]}
                />
                <Select
                  id="bulk-flavour"
                  label="Preferred Flavour Mix"
                  value={form.flavourMix}
                  onChange={(e) => handleChange('flavourMix', e.target.value)}
                  options={[
                    { value: 'assorted', label: 'Assorted (All 4 Flavours)' },
                    { value: 'chocolate-coated', label: 'Chocolate Coated (Pouches)' },
                    { value: 'elaichi', label: 'Elaichi Chai Cups' },
                    { value: 'chocolate', label: 'Chocolate Biscuit' },
                    { value: 'vanilla', label: 'Vanilla Classic' },
                  ]}
                />
                <Input
                  id="bulk-qty"
                  type="number"
                  min="50"
                  step="50"
                  label="Estimated Cups"
                  required
                  value={form.quantity}
                  onChange={(e) => handleChange('quantity', e.target.value)}
                  error={errors.quantity}
                />
              </div>

              <Input
                id="bulk-city"
                label="Delivery City & Pincode"
                required
                value={form.city}
                onChange={(e) => handleChange('city', e.target.value)}
                error={errors.city}
                placeholder="New Delhi — 110001"
              />

              <Textarea
                id="bulk-notes"
                label="Additional Serving Details (Optional)"
                value={form.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Tell us if you need 100 ml chai cups, 150 ml cold coffee cups, or individual hygiene pouches..."
              />

              <Checkbox
                id="bulk-consent"
                checked={form.agreeTerms}
                onChange={(e) => handleChange('agreeTerms', e.target.checked)}
                error={errors.agreeTerms}
                label="I confirm this wholesale quote request is for a genuine retail, café, or event requirement."
              />

              <Button type="submit" size="lg" loading={submitting}>
                Generate Bulk Quote Brief
              </Button>
            </form>
          </Card>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div className="editorial-chapter-row">
              <Badge tone="forest">Pan-India Fulfillment</Badge>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', margin: 'var(--space-3) 0' }}>
                Why Partners Choose CUP2EAT
              </h3>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-ink-700)' }}>
                <li><strong>Individually Sealed Hygiene:</strong> Ideal for walk-in kiosks and ₹20 single-serve counter sales.</li>
                <li><strong>No Sogginess or Leaking:</strong> Up to 40 mins hold time for hot chai/espresso pours.</li>
                <li><strong>Organic Social Buzz:</strong> Customers film and share the &ldquo;Eat Your Drink&rdquo; moment automatically.</li>
                <li><strong>Zero Crockery Breakage:</strong> Unlike clay kulhads, cushioned cartons ship cleanly across India.</li>
              </ul>
            </div>

            <div className="editorial-chapter-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--color-success-fg)' }} /> Instant Ordering Shortcut
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-700)', marginBottom: 'var(--space-4)' }}>
                Want same-day clarification on custom batch pricing or sample packs? Message our Instagram team directly.
              </p>
              <Button href={BRAND.instagramUrl} target="_blank" rel="noreferrer" variant="outline" fullWidth>
                <Instagram size={16} /> Message {BRAND.handle} on Instagram
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
