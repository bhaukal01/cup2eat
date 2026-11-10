import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, Copy, Instagram, Leaf, Minus, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { BRAND } from '../../data/brand';
import { formatINR, buildOrderInquiryMessage } from '../../utils/formatters';
import { FREE_SHIPPING_THRESHOLD } from '../../utils/calculations';
import { Drawer, Dialog, Button, EmptyState, Alert } from '../ui';
import './layout.css';

export function CartDrawer() {
  const {
    items,
    summary,
    drawerOpen,
    setDrawerOpen,
    updateBoxes,
    removeItem,
    clearCart,
  } = useCart();
  const { showToast } = useToast();
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const handleCopyInquiry = async () => {
    const text = buildOrderInquiryMessage(items, summary);
    try {
      await navigator.clipboard.writeText(text);
      showToast('Order summary copied! Paste directly into @cup2eat Instagram DM.');
    } catch {
      showToast('Unable to access clipboard automatically.', 'error');
    }
  };

  const progressPct = Math.min(100, Math.round((summary.subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={`Your Order Box (${summary.totalBoxes})`}
        footer={
          items.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                <span>Subtotal ({summary.totalCups} cups)</span>
                <strong>{formatINR(summary.subtotal)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                <span>Estimated Pan-India Shipping</span>
                <strong>{summary.shipping === 0 ? 'FREE' : formatINR(summary.shipping)}</strong>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 700,
                  paddingTop: 'var(--space-2)',
                  borderTop: '1px solid var(--color-border)',
                }}
              >
                <span>Estimated Total</span>
                <span>{formatINR(summary.total)}</span>
              </div>

              <div className="cart-drawer-actions">
                <Button variant="outline" size="sm" onClick={handleCopyInquiry}>
                  <Copy size={15} /> Copy DM Order
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instagram size={15} /> Order on @cup2eat
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                fullWidth
                onClick={() => setConfirmClearOpen(true)}
              >
                Clear Order Box
              </Button>
            </div>
          ) : null
        }
      >
        {items.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Your Order Box is empty"
            description="Pick any edible cup flavour—Chocolate, Vanilla, Elaichi, or our ₹20 Chocolate Coated cup—to build a trial or party order."
            action={
              <Button to="/products" onClick={() => setDrawerOpen(false)}>
                Browse Edible Cups
              </Button>
            }
          />
        ) : (
          <div>
            {summary.freeShippingRemaining > 0 ? (
              <Alert tone="info" title="Free Shipping Progress">
                Add {formatINR(summary.freeShippingRemaining)} more to unlock free pan-India shipping (above {formatINR(FREE_SHIPPING_THRESHOLD)}).
                <div style={{ height: '5px', background: 'rgba(29,74,58,0.14)', borderRadius: '99px', overflow: 'hidden', marginTop: '8px' }}>
                  <motion.div
                    style={{ height: '100%', background: 'var(--color-forest-900)', borderRadius: '99px' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </Alert>
            ) : (
              <Alert tone="success" title="Free Shipping Unlocked">
                Zero waste bonus: you are replacing {summary.totalCups} disposable plastic/paper cups!
              </Alert>
            )}

            <div style={{ marginTop: 'var(--space-5)' }}>
              <AnimatePresence initial={false}>
                {items.map((item, idx) => (
                  <motion.div
                    key={item.key}
                    layout
                    initial={{ opacity: 0, y: 24, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 28, transition: { duration: 0.2 } }}
                    transition={{ type: 'spring', stiffness: 360, damping: 26, delay: idx * 0.05 }}
                    className="cart-item-row"
                  >
                    <img src={item.image} alt={item.productName} className="cart-item-thumb" />
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-2)' }}>
                        <strong style={{ fontSize: 'var(--text-sm)' }}>{item.productName}</strong>
                        <button
                          type="button"
                          onClick={() => removeItem(item.key)}
                          aria-label={`Remove ${item.productName}`}
                          style={{
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer',
                            color: 'var(--color-ink-500)',
                            padding: '2px',
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-500)', margin: '2px 0 8px' }}>
                        {item.packLabel} · {item.capacity} · {formatINR(item.unitPrice)}/cup
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div className="qty-stepper" aria-label={`Quantity for ${item.productName}`}>
                          <button
                            type="button"
                            aria-label="Decrease boxes"
                            onClick={() => updateBoxes(item.key, item.boxes - 1)}
                          >
                            <Minus size={13} />
                          </button>
                          <motion.span
                            key={item.boxes}
                            initial={{ scale: 1.25 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.18 }}
                          >
                            {item.boxes}
                          </motion.span>
                          <button
                            type="button"
                            aria-label="Increase boxes"
                            onClick={() => updateBoxes(item.key, item.boxes + 1)}
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <strong style={{ fontSize: 'var(--text-sm)' }}>
                          {formatINR(item.packTotal * item.boxes)}
                        </strong>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-3)',
                backgroundColor: 'var(--color-forest-100)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-forest-900)',
                fontWeight: 600,
              }}
            >
              <Leaf size={16} aria-hidden="true" />
              <span>Plastic / paper cups prevented with this box: {summary.totalCups} cups</span>
            </div>
          </div>
        )}
      </Drawer>

      <Dialog
        open={confirmClearOpen}
        onClose={() => setConfirmClearOpen(false)}
        title="Clear Order Box?"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setConfirmClearOpen(false)}>
              Keep Items
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                clearCart();
                setConfirmClearOpen(false);
              }}
            >
              Yes, Clear All Packs
            </Button>
          </>
        }
      >
        <p style={{ margin: 0, color: 'var(--color-ink-700)', fontSize: 'var(--text-sm)' }}>
          This will remove all {summary.totalBoxes} pack(s) ({summary.totalCups} cups) from your Order Box. You can always add packs back from the Edible Cups catalog.
        </p>
      </Dialog>
    </>
  );
}
