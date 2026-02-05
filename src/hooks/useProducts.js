import { useMemo } from "react";
import sanitizeProduct from "../utils/sanitizeProduct";

/**
 * Reusable hook to derive filtered product data.
 * Sanitizes incoming products and defends against malformed input.
 */
export default function useProducts(products = [], filters = {}) {
  const { category, minPrice, maxPrice } = filters;

  return useMemo(() => {
    if (!Array.isArray(products)) return [];

    // Sanitize once at the data boundary
    let result = products.map(sanitizeProduct);

    if (category) {
      result = result.filter((p) => p.category === category);
    }

    if (typeof minPrice === "number") {
      result = result.filter((p) => p.price >= minPrice);
    }

    if (typeof maxPrice === "number") {
      result = result.filter((p) => p.price <= maxPrice);
    }

    return result;
  }, [products, category, minPrice, maxPrice]);
}
