import { useMemo } from "react";
import sanitizeProduct from "../utils/sanitizeProduct";

/**
 * Reusable hook to derive filtered & sorted product data.
 * - Sanitizes incoming products
 * - Applies category filtering
 * - Applies price sorting
 * - Defends against malformed input
 */
export default function useProducts(products = [], filters = {}) {
  const { category = "all", sortOrder = "" } = filters;

  return useMemo(() => {
    if (!Array.isArray(products)) return [];

    // Sanitize once at the data boundary
    let result = products.map(sanitizeProduct);

    // Filter by category
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // Sort by price
    if (sortOrder === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, category, sortOrder]);
}
