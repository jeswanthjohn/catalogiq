import products from "../../public/products.json";

/**
 * Simulates fetching products from an API.
 * Later, this can be replaced with a real backend call.
 */
export function fetchAllProducts() {
  return products;
}

/**
 * Returns unique product categories.
 */
export function fetchCategories() {
  const categories = new Set(products.map(p => p.category));
  return Array.from(categories);
}
