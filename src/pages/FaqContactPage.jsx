import { useState, useMemo } from 'react';
import { Instagram, ShieldCheck, Copy, Mail } from 'lucide-react';
import { FAQ_CATEGORIES, FAQS } from '../data/faqs';
import { BRAND } from '../data/brand';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useToast } from '../context/ToastContext';
import { validateContactForm } from '../utils/validators';
import { PageHeader } from '../components/layout/PageHeader';
import { Tabs, Accordion, Card, Input, Select, Textarea, Button, Alert, Badge } from '../components/ui';
import { EditorialReveal } from '../components/motion/MotionPrimitives';
import '../components/sections/sections.css';

const INITIAL_CONTACT = {
  name: '',
  email: '',
  phone: '',
  topic: 'Retail Tasting Box Order',
  message: '',
};

export function FaqContactPage() {
  useDocumentTitle('FAQ & Direct Inquiry');
  const { showToast } = useToast();
  const [faqTab, setFaqTab] = useState('all');
  const [form, setForm] = useState(INITIAL_CONTACT);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [sentBrief, setSentBrief] = useState(null);

  const visibleFaqs = useMemo(() => {
    if (faqTab === 'all') return FAQS;
    return FAQS.filter((item) => item.category === faqTab);
  }, [faqTab]);

  const handleField = (field, val) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateContactForm(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      showToast('Please fix the highlighted fields.', 'error');
      return;
    }

    setSubmitting(true);
    window.setTimeout(() => {
      setSentBrief({ ...form });
      setSubmitting(false);
      showToast('Inquiry brief ready!');
    }, 300);
  };

  const handleCopyMessage = async () => {
    if (!sentBrief) return;
    const text = `Hi @cup2eat! (${sentBrief.topic})\nFrom: ${sentBrief.name} | ${sentBrief.email}${sentBrief.phone ? ` | ${sentBrief.phone}` : ''}\n${sentBrief.message}`;
    try {
      await navigator.clipboard.writeText(text);
      showToast('Message copied—ready to paste on Instagram DM!');
    } catch {
      showToast('Could not copy automatically.', 'error');
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Answers & Ordering Help"
        title="Frequently Asked Questions & Contact"
        lead="Everything you want to know about hold time, ₹20 sealed Chocolate Coated pouches, shelf life, and placing your retail or bulk order."
        currentPage="FAQ & Contact"
      />

      <section className="section">
        <EditorialReveal className="container">
          <span className="eyebrow">Common Questions</span>
          <h2 className="section-heading">How CUP2EAT Performs in Real Life</h2>

          <div style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
            <Tabs
              items={FAQ_CATEGORIES}
              activeId={faqTab}
              onChange={setFaqTab}
              ariaLabel="Filter FAQs by category"
            />
          </div>

          <Accordion items={visibleFaqs} />
        </EditorialReveal>
      </section>

      <section className="section section--surface" id="contact-form">
        <div className="container two-col-grid">
          <Card padded>
            <span className="eyebrow">Direct Message Form</span>
            <h2 className="section-heading" style={{ fontSize: 'var(--text-2xl)' }}>
              Send a Sample or Order Question
            </h2>

            {sentBrief && (
              <div style={{ marginBottom: 'var(--space-5)' }}>
                <Alert tone="success" title="Inquiry Ready for @cup2eat">
                  Your message for <strong>{sentBrief.topic}</strong> passed validation. Copy it directly or open {BRAND.handle} to chat.
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
                    <Button size="sm" variant="outline" onClick={handleCopyMessage}>
                      <Copy size={14} /> Copy Inquiry
                    </Button>
                    <Button size="sm" href={BRAND.instagramUrl} target="_blank" rel="noreferrer">
                      <Instagram size={14} /> Open @cup2eat
                    </Button>
                  </div>
                </Alert>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <Input
                id="contact-name"
                label="Your Name"
                required
                value={form.name}
                onChange={(e) => handleField('name', e.target.value)}
                error={errors.name}
                placeholder="Rohan Verma"
              />
              <div style={{ display: 'grid', gap: 'var(--space-4)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))' }}>
                <Input
                  id="contact-email"
                  type="email"
                  label="Email Address"
                  required
                  value={form.email}
                  onChange={(e) => handleField('email', e.target.value)}
                  error={errors.email}
                  placeholder="rohan@example.com"
                />
                <Input
                  id="contact-phone"
                  type="tel"
                  label="Phone Number (Optional)"
                  value={form.phone}
                  onChange={(e) => handleField('phone', e.target.value)}
                  error={errors.phone}
                  placeholder="10-digit mobile number"
                />
              </div>

              <Select
                id="contact-topic"
                label="Topic"
                value={form.topic}
                onChange={(e) => handleField('topic', e.target.value)}
                options={[
                  { value: 'Retail Tasting Box Order', label: 'Retail Tasting Box Order' },
                  { value: 'Chocolate Coated ₹20 Cups', label: 'Chocolate Coated ₹20 Cups' },
                  { value: 'Birthday / Event Order', label: 'Birthday / Event Order' },
                  { value: 'Café Partnership', label: 'Café Partnership & Pricing' },
                ]}
              />

              <Textarea
                id="contact-msg"
                label="Your Message"
                required
                value={form.message}
                onChange={(e) => handleField('message', e.target.value)}
                error={errors.message}
                placeholder="Ask about flavour mixes, delivery timelines to your city, or custom boxes..."
              />

              <Button type="submit" size="lg" loading={submitting}>
                Prepare & Validate Message
              </Button>
            </form>
          </Card>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div className="editorial-chapter-row">
              <Badge tone="forest" icon={ShieldCheck}>{BRAND.fssaiLabel}</Badge>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', margin: 'var(--space-3) 0 var(--space-2)' }}>
                Official Social & Order Handle
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-700)', marginBottom: 'var(--space-4)' }}>
                CUP2EAT takes direct retail bundles, event packs, and bulk wholesale DMs via our verified Instagram community page.
              </p>
              <Button href={BRAND.instagramUrl} target="_blank" rel="noreferrer" fullWidth>
                <Instagram size={16} /> Visit {BRAND.instagramUrl.replace('https://www.', '')}
              </Button>
            </div>

            <div className="editorial-chapter-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                <Mail size={17} /> Dispatch & Tasting Guidance
              </div>
              <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-ink-700)' }}>
                Not sure which capacity fits your menu? Try our <strong>All-4 Flavour Assorted Tasting Box</strong> in the Order Box drawer before booking wholesale cartons.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
