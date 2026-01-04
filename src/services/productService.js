export async function getProducts() {
  const response = await fetch("/products.json");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}
