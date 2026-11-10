import { describe, it, expect } from 'vitest';
import {
  calculateLineTotal,
  calculateOrderSummary,
  calculateImpactMetrics,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_FEE,
} from './calculations';

describe('calculations', () => {
  it('computes line total and ignores invalid or negative values', () => {
    expect(calculateLineTotal(240, 2)).toBe(480);
    expect(calculateLineTotal(-50, 3)).toBe(0);
    expect(calculateLineTotal('abc', 2)).toBe(0);
  });

  it('computes order summary below free shipping threshold', () => {
    const summary = calculateOrderSummary([
      { packTotal: 240, boxes: 2, cupsPerBox: 12 },
    ]);
    expect(summary.subtotal).toBe(480);
    expect(summary.shipping).toBe(STANDARD_SHIPPING_FEE);
    expect(summary.total).toBe(480 + STANDARD_SHIPPING_FEE);
    expect(summary.totalBoxes).toBe(2);
    expect(summary.totalCups).toBe(24);
    expect(summary.freeShippingRemaining).toBe(FREE_SHIPPING_THRESHOLD - 480);
  });

  it('unlocks free shipping when reaching threshold and handles empty box', () => {
    const empty = calculateOrderSummary([]);
    expect(empty.shipping).toBe(0);
    expect(empty.total).toBe(0);

    const free = calculateOrderSummary([{ packTotal: 1500, boxes: 1, cupsPerBox: 100 }]);
    expect(free.shipping).toBe(0);
    expect(free.freeShippingRemaining).toBe(0);
    expect(free.total).toBe(1500);
  });

  it('calculates annual environmental cup & waste metrics accurately', () => {
    const impact = calculateImpactMetrics(100, 300);
    expect(impact.cupsReplacedAnnually).toBe(30000);
    expect(impact.wasteKgAvoided).toBe(255);
    expect(impact.binBagsSaved).toBe(120);

    expect(calculateImpactMetrics(-10, 365).cupsReplacedAnnually).toBe(0);
  });
});

