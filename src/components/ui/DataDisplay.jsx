import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import './ui.css';

/** Horizontal pill tabs with animated Framer Motion indicator and aria-selected state. */
export function Tabs({ items, activeId, onChange, ariaLabel = 'Sections' }) {
  return (
    <div className="ui-tabs" role="tablist" aria-label={ariaLabel}>
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            className={`ui-tab ${active ? 'ui-tab--active' : ''}`.trim()}
            style={{ position: 'relative', background: active ? 'transparent' : undefined, zIndex: 1 }}
            onClick={() => onChange(item.id)}
          >
            {active && (
              <motion.span
                layoutId={`tab-bg-${ariaLabel}`}
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'var(--color-forest-900)',
                  zIndex: -1,
                }}
              />
            )}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/** Keyboard-accessible FAQ / specification accordion with smooth height transition. */
export function Accordion({ items }) {
  const [openId, setOpenId] = useState(items[0]?.id ?? null);

  return (
    <div className="ui-accordion">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="ui-accordion-item">
            <button
              type="button"
              className="ui-accordion-trigger"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : item.id)}
            >
              <span>{item.question}</span>
              <ChevronDown
                size={18}
                aria-hidden="true"
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 200ms ease',
                  flexShrink: 0,
                }}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="ui-accordion-panel">{item.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/** Structured responsive comparison/pricing table. */
export function Table({ columns, rows, caption }) {
  return (
    <div className="ui-table-wrap">
      <table className="ui-table">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.id ?? idx}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const ALERT_ICONS = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
};

/** Semantic feedback alert banner. */
export function Alert({ tone = 'info', title, children }) {
  const Icon = ALERT_ICONS[tone] || Info;
  return (
    <div className={`ui-alert ui-alert--${tone}`} role="status">
      <Icon size={18} style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
      <div>
        {title && <strong style={{ display: 'block', marginBottom: '2px' }}>{title}</strong>}
        <div>{children}</div>
      </div>
    </div>
  );
}

/** Intentional empty state communicating what is empty and next action. */
export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="ui-empty">
      {Icon && (
        <div className="ui-empty-icon">
          <Icon size={24} aria-hidden="true" />
        </div>
      )}
      <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>
        {title}
      </h3>
      <p style={{ color: 'var(--color-ink-500)', maxWidth: '42ch', margin: '0 auto var(--space-5)' }}>
        {description}
      </p>
      {action}
    </div>
  );
}

/** Loading placeholder skeleton. */
export function Skeleton({ height = '1rem', width = '100%', style = {} }) {
  return <div className="ui-skeleton" style={{ height, width, ...style }} aria-hidden="true" />;
}
