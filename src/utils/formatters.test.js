import { describe, it, expect } from 'vitest';
import { formatINR, formatCount, buildOrderInquiryMessage } from './formatters';

describe('formatters', () => {
  it('formats INR cleanly without trailing .00 on whole numbers', () => {
    expect(formatINR(20)).toContain('20');
    expect(formatINR(1500)).toContain('1,500');
  });

  it('formats count with Indian grouping', () => {
    expect(formatCount(100000)).toBe('1,00,000');
  });

  it('builds structured DM inquiry string for non-empty box', () => {
    const msg = buildOrderInquiryMessage(
      [
        {
          productName: 'Chocolate Coated',
          capacity: '100 ml',
          packLabel: 'Trial Box (12 Cups)',
          boxes: 2,
          packTotal: 240,
        },
      ],
      { totalCups: 24, total: 570 }
    );
    expect(msg).toContain('@cup2eat');
    expect(msg).toContain('Chocolate Coated');
    expect(msg).toContain('Total Cups: 24');
  });
});

