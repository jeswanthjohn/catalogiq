/**
 * Utility: Safe number parser
 * Ensures only valid finite numbers are used
 */
function toSafeNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

/**
 * calculateAnalytics
 * ------------------
 * Aggregates business metrics from product dataset.
 * Hardened against malformed numeric inputs.
 */
export function calculateAnalytics(products = []) {
  if (!Array.isArray(products) || products.length === 0) {
    return {
      totalProducts: 0,
      totalRevenue: 0,
      averageRating: 0,
    };
  }

  const totalProducts = products.length;

  /* =========================
     TOTAL REVENUE (SAFE)
     ========================= */
  const totalRevenue = products.reduce((sum, p) => {
    const price = toSafeNumber(p?.price);
    const units = toSafeNumber(p?.unitsSold ?? p?.sold);

    return sum + price * units;
  }, 0);

  /* =========================
     TOTAL RATINGS (SAFE)
     ========================= */
  const totalRatings = products.reduce((sum, p) => {
    return sum + toSafeNumber(p?.rating);
  }, 0);

  /* =========================
     AVERAGE RATING (SAFE)
     ========================= */
  let averageRating = 0;

  if (totalProducts > 0) {
    const avg = totalRatings / totalProducts;

    averageRating = Number.isFinite(avg)
      ? Number(avg.toFixed(2))
      : 0;
  }

  return {
    totalProducts,
    totalRevenue: Number.isFinite(totalRevenue)
      ? totalRevenue
      : 0,
    averageRating,
  };
}