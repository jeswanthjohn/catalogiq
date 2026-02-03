import { useMemo } from "react";

/**
 * Reusable hook to derive filtered product data.
 * Defensive against malformed or empty input.
 */
export default function useProducts(products = [], filters = {}) {
  const { category, minPrice, maxPrice } = filters;

  return useMemo(() => {
    if (!Array.isArray(products)) return [];

    let result = [...products];

    if (category) {
      result = result.filter((p) => p?.category === category);
    }

    if (minPrice !== undefined) {
      result = result.filter(
        (p) => typeof p?.price === "number" && p.price >= minPrice
      );
    }

    if (maxPrice !== undefined) {
      result = result.filter(
        (p) => typeof p?.price === "number" && p.price <= maxPrice
      );
    }

    return result;
  }, [products, category, minPrice, maxPrice]);
}
