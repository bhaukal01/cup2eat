export const FREE_SHIPPING_THRESHOLD = 999;
export const STANDARD_SHIPPING_FEE = 90;

// Conservative average disposable paper+PE-lined cup weight in grams (~8.5g per 100-150ml cup)
const GRAMS_PER_DISPOSABLE_CUP = 8.5;

/**
 * Calculate the line item subtotal cleanly.
 */
export function calculateLineTotal(packPrice, boxes) {
  const price = Math.max(0, Number(packPrice) || 0);
  const count = Math.max(0, Math.floor(Number(boxes) || 0));
  return price * count;
}

/**
 * Calculate cart totals, total individual cups, shipping, and zero-waste cups diverted.
 */
export function calculateOrderSummary(items = []) {
  const validItems = Array.isArray(items) ? items : [];
  const subtotal = validItems.reduce(
    (sum, item) => sum + calculateLineTotal(item.packTotal, item.boxes),
    0
  );
  const totalBoxes = validItems.reduce(
    (sum, item) => sum + Math.max(0, Math.floor(Number(item.boxes) || 0)),
    0
  );
  const totalCups = validItems.reduce(
    (sum, item) =>
      sum + Math.max(0, Math.floor(Number(item.cupsPerBox) || 0)) * Math.max(0, Math.floor(Number(item.boxes) || 0)),
    0
  );

  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;

  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
    totalBoxes,
    totalCups,
    freeShippingRemaining: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
  };
}

/**
 * Compute environmental savings from switching daily disposable cups to CUP2EAT edible cups.
 */
export function calculateImpactMetrics(dailyCups, daysPerYear = 365) {
  const safeDaily = Math.max(0, Math.floor(Number(dailyCups) || 0));
  const safeDays = Math.max(1, Math.min(366, Math.floor(Number(daysPerYear) || 365)));
  const cupsReplacedAnnually = safeDaily * safeDays;
  const wasteKgAvoided = Number(
    ((cupsReplacedAnnually * GRAMS_PER_DISPOSABLE_CUP) / 1000).toFixed(1)
  );
  // Standard disposable trash bag holds ~250 crushed cups
  const binBagsSaved = Math.round(cupsReplacedAnnually / 250);

  return {
    cupsReplacedAnnually,
    wasteKgAvoided,
    binBagsSaved,
  };
}

