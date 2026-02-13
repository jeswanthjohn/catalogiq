/**
 * calculateAnalytics
 * ------------------
 * Aggregates business metrics from product dataset.
 * Designed to be pure and reusable.
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

  const totalRevenue = products.reduce((sum, p) => {
    const price = Number(p?.price) || 0;

    // Support both sold and unitsSold defensively
    const units =
      Number(p?.unitsSold ?? p?.sold) || 0;

    return sum + price * units;
  }, 0);

  const totalRatings = products.reduce((sum, p) => {
    return sum + (Number(p?.rating) || 0);
  }, 0);

  const averageRating =
    totalProducts > 0
      ? Number((totalRatings / totalProducts).toFixed(2))
      : 0;

  return {
    totalProducts,
    totalRevenue,
    averageRating,
  };
}
