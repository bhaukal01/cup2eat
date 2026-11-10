import { describe, it, expect } from 'vitest';
import { computeFlightTrajectory } from './flight';

describe('computeFlightTrajectory', () => {
  it('returns null when source or target bounding rect is missing', () => {
    expect(computeFlightTrajectory(null, { left: 100, top: 20, width: 40, height: 30 })).toBeNull();
    expect(computeFlightTrajectory({ left: 100, top: 400, width: 200, height: 150 }, null)).toBeNull();
  });

  it('computes parabolic arc keyframes starting at source center and ending at cart target', () => {
    const start = { left: 100, top: 500, width: 200, height: 100 };
    const end = { left: 1000, top: 20, width: 100, height: 40 };

    const result = computeFlightTrajectory(start, end, 56);
    expect(result).not.toBeNull();
    // startX = 100 + 100 - 28 = 172, endX = 1000 + 50 - 28 = 1022
    expect(result.x[0]).toBe(172);
    expect(result.x[2]).toBe(1022);
    expect(result.x[1]).toBe((172 + 1022) / 2);

    // Highest point (minimum Y) at midpoint apex must be above endY (or clamped >= 12)
    expect(result.y[0]).toBe(522);
    expect(result.y[2]).toBe(12);
    expect(result.y[1]).toBeGreaterThanOrEqual(12);

    expect(result.scale).toEqual([1, 0.82, 0.28]);
  });
});

