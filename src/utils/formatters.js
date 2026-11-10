/**
 * Format a numeric value as Indian Rupees without decimal clutter when whole.
 */
export function formatINR(amount) {
  const safe = Number.isFinite(Number(amount)) ? Number(amount) : 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: safe % 1 === 0 ? 0 : 2,
  }).format(safe);
}

/**
 * Format whole integer counts with Indian grouping commas (e.g., 1,09,500).
 */
export function formatCount(value) {
  const safe = Math.max(0, Math.round(Number(value) || 0));
  return new Intl.NumberFormat('en-IN').format(safe);
}

/**
 * Build a structured plain-text summary for Instagram DM / WhatsApp inquiries.
 */
export function buildOrderInquiryMessage(items, summary) {
  if (!items.length) return '';
  const lines = items.map(
    (item) =>
      `- ${item.productName} (${item.capacity}, ${item.packLabel}) x ${item.boxes} = ${formatINR(
        item.packTotal * item.boxes
      )}`
  );
  lines.push(`Total Cups: ${summary.totalCups}`);
  lines.push(`Estimated Order Total: ${formatINR(summary.total)}`);
  lines.push(`Disposable Cups Saved: ${summary.totalCups}`);
  return `Hi @cup2eat! I'd like to place an order:\n${lines.join('\n')}`;
}

