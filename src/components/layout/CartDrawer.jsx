import { useState } from 'react';
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
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
              </Alert>
            ) : (
              <Alert tone="success" title="Free Shipping Unlocked">
                Zero waste bonus: you are replacing {summary.totalCups} disposable plastic/paper cups!
              </Alert>
            )}

            <div style={{ marginTop: 'var(--space-5)' }}>
              {items.map((item) => (
                <div key={item.key} className="cart-item-row">
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
                        <span>{item.boxes}</span>
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
                </div>
              ))}
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

