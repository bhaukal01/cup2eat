/**
 * Pure parabolic Bezier-style waypoint calculation for fly-to-cart projectile animation.
 */
export function computeFlightTrajectory(startRect, endRect, particleSize = 56) {
  if (!startRect || !endRect) return null;

  const half = particleSize / 2;
  const startX = startRect.left + startRect.width / 2 - half;
  const startY = startRect.top + startRect.height / 2 - half;
  const endX = endRect.left + endRect.width / 2 - half;
  const endY = endRect.top + endRect.height / 2 - half;

  const midX = (startX + endX) / 2;
  // Lift above the higher endpoint for a graceful parabolic arc
  const highestY = Math.min(startY, endY);
  const arcOffset = Math.min(140, Math.max(55, Math.abs(startY - endY) * 0.28 + 45));
  const apexY = Math.max(12, highestY - arcOffset);

  return {
    x: [startX, midX, endX],
    y: [startY, apexY, endY],
    scale: [1, 0.82, 0.28],
    opacity: [1, 1, 0.2],
    rotate: [0, -12, 10],
  };
}

