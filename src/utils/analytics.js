export function calculateAnalytics(products) {
  const totalProducts = products.length;

  const totalRevenue = products.reduce(
    (sum, p) => sum + p.price * (p.sold || 1),
    0
  );

  const averageRating =
    products.reduce((sum, p) => sum + p.rating, 0) / totalProducts || 0;

  return {
    totalProducts,
    totalRevenue,
    averageRating: averageRating.toFixed(1),
  };
}
