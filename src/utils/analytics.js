export function calculateAnalytics(products = []) {
  if (!Array.isArray(products) || products.length === 0) {
    return {
      totalProducts: 0,
      totalRevenue: 0,
      averageRating: "0.0",
    };
  }

  const totalProducts = products.length;

  const totalRevenue = products.reduce(
    (sum, p) =>
      sum + (Number(p?.price) || 0) * (Number(p?.sold) || 1),
    0
  );

  const totalRatings = products.reduce(
    (sum, p) => sum + (Number(p?.rating) || 0),
    0
  );

  const averageRating =
    totalProducts > 0
      ? (totalRatings / totalProducts).toFixed(1)
      : "0.0";

  return {
    totalProducts,
    totalRevenue,
    averageRating,
  };
}
