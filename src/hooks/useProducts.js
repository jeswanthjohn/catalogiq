import { useMemo } from "react";
import sanitizeProduct from "../utils/sanitizeProduct";

/**
 * useProducts
 * -----------
 * Derives filtered & sorted product data.
 * - Sanitizes incoming products
 * - Applies category filtering
 * - Applies price sorting
 * - Memoized to prevent unnecessary recalculations
 */
export default function useProducts(products = [], filters = {}) {
  const { category = "all", sortOrder = "" } = filters;

  return useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) {
      return [];
    }

    // Sanitize once at boundary
    const sanitized = products.map(sanitizeProduct);

    let result = sanitized;

    // Category filter
    if (category && category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // Sorting (mutually exclusive)
    if (sortOrder === "price-asc") {
      result = result.slice().sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      result = result.slice().sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, category, sortOrder]);
}
