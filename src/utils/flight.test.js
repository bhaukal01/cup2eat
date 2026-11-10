import { describe, it, expect } from 'vitest';
import {
  createFlightCurve,
  evaluateBezierPoint,
  evaluateFlightScale,
} from './flight';

describe('flight Bezier curve', () => {
  it('returns null when source or target bounding rect is missing', () => {
    expect(createFlightCurve(null, { left: 100, top: 20, width: 40, height: 30 })).toBeNull();
    expect(createFlightCurve({ left: 100, top: 400, width: 200, height: 150 }, null)).toBeNull();
  });

  it('starts at source center (t=0) and lands exactly at cart icon center (t=1)', () => {
    const start = { left: 100, top: 500, width: 200, height: 100 };
    const end = { left: 1000, top: 20, width: 20, height: 20 };

    const curve = createFlightCurve(start, end, 56);
    expect(curve).not.toBeNull();

    const pStart = evaluateBezierPoint(curve, 0);
    const pMid = evaluateBezierPoint(curve, 0.5);
    const pEnd = evaluateBezierPoint(curve, 1);

    // start: 100+100-28=172, 500+50-28=522
    expect(pStart.x).toBeCloseTo(172, 5);
    expect(pStart.y).toBeCloseTo(522, 5);

    // end: 1000+10-28=982, 20+10-28=2
    expect(pEnd.x).toBeCloseTo(982, 5);
    expect(pEnd.y).toBeCloseTo(2, 5);

    // Midpoint stays strictly inside horizontal corridor between start and end
    expect(pMid.x).toBeGreaterThan(pStart.x);
    expect(pMid.x).toBeLessThan(pEnd.x);
  });

  it('smoothly swells at launch and tapers cleanly at destination', () => {
    expect(evaluateFlightScale(0)).toBeCloseTo(0.52, 4);
    expect(evaluateFlightScale(0.22)).toBeCloseTo(1.04, 4);
    expect(evaluateFlightScale(1)).toBeCloseTo(0.26, 4);
  });
});
