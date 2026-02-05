/**
 * Normalizes a raw product object into a safe, predictable shape.
 * Used as a defensive guard against malformed or incomplete data.
 */
export default function sanitizeProduct(raw = {}) {
  return {
    id: raw.id ?? crypto.randomUUID(),
    name: typeof raw.name === "string" ? raw.name : "Untitled Product",
    category: typeof raw.category === "string" ? raw.category : "Uncategorized",
    price: typeof raw.price === "number" ? raw.price : 0,
    rating: typeof raw.rating === "number" ? raw.rating : 0,
    image: typeof raw.image === "string" ? raw.image : null,
  };
}
