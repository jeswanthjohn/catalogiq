import { useMemo } from "react";

/**
 * Reusable hook to derive filtered product data.
 */
export default function useProducts(products, filters = {}) {
  const { category, minPrice, maxPrice } = filters;

  return useMemo(() => {
    let result = [...products];

    if (category) {
      result = result.filter(p => p.category === category);
    }

    if (minPrice !== undefined) {
      result = result.filter(p => p.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      result = result.filter(p => p.price <= maxPrice);
    }

    return result;
  }, [products, category, minPrice, maxPrice]);
}
