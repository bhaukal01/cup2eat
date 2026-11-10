/**
 * Pure quadratic Bezier curve setup & evaluator for buttery 60fps fly-to-cart motion.
 * Computing exact Bezier points from a single monotonic progress t in [0, 1] avoids
 * multi-keyframe segment kinks and yields continuous slow-to-fast acceleration.
 */
export function createFlightCurve(startRect, endRect, particleSize = 56) {
  if (!startRect || !endRect) return null;

  const half = particleSize / 2;
  const p0 = {
    x: startRect.left + startRect.width / 2 - half,
    y: startRect.top + startRect.height / 2 - half,
  };
  const p2 = {
    x: endRect.left + endRect.width / 2 - half,
    y: endRect.top + endRect.height / 2 - half,
  };

  // Smooth control point angled cleanly toward the cart icon without flying off-screen
  const dx = p2.x - p0.x;
  const dy = p2.y - p0.y;
  const p1 = {
    x: p0.x + dx * 0.26,
    y: Math.max(12, Math.min(p0.y, p2.y) + dy * 0.08 - 54),
  };

  return { p0, p1, p2 };
}

/**
 * Evaluate exact (x, y) coordinate along a quadratic Bezier at progress t in [0, 1].
 */
export function evaluateBezierPoint(curve, t) {
  const clamped = Math.max(0, Math.min(1, Number(t) || 0));
  const inv = 1 - clamped;
  return {
    x: inv * inv * curve.p0.x + 2 * inv * clamped * curve.p1.x + clamped * clamped * curve.p2.x,
    y: inv * inv * curve.p0.y + 2 * inv * clamped * curve.p1.y + clamped * clamped * curve.p2.y,
  };
}

/**
 * Smooth scale curve: softly expands out of the simmering cup ripple early, then tapers cleanly into the bag icon.
 */
export function evaluateFlightScale(t) {
  const clamped = Math.max(0, Math.min(1, Number(t) || 0));
  if (clamped < 0.22) {
    const u = clamped / 0.22;
    return 0.52 + 0.52 * (1 - (1 - u) * (1 - u));
  }
  const u = (clamped - 0.22) / 0.78;
  return 1.04 - 0.78 * (u * u);
}
