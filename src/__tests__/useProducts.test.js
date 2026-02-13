import { renderHook } from "@testing-library/react";
import useProducts from "../hooks/useProducts";

const mockProducts = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: 50000,
    rating: 4.5,
    sold: 2,
  },
  {
    id: 2,
    name: "Shoes",
    category: "Clothing",
    price: 2000,
    rating: 4.0,
    sold: 5,
  },
  {
    id: 3,
    name: "Phone",
    category: "Electronics",
    price: 30000,
    rating: 4.8,
    sold: 3,
  },
];

describe("useProducts hook", () => {
  test("filters products by category", () => {
    const { result } = renderHook(() =>
      useProducts(mockProducts, { category: "Electronics" })
    );

    expect(result.current.length).toBe(2);
    expect(
      result.current.every((p) => p.category === "Electronics")
    ).toBe(true);
  });

  test("sorts products by price ascending", () => {
    const { result } = renderHook(() =>
      useProducts(mockProducts, { sortOrder: "price-asc" })
    );

    expect(result.current[0].price).toBe(2000);
    expect(result.current[2].price).toBe(50000);
  });

  test("sorts products by price descending", () => {
    const { result } = renderHook(() =>
      useProducts(mockProducts, { sortOrder: "price-desc" })
    );

    expect(result.current[0].price).toBe(50000);
    expect(result.current[2].price).toBe(2000);
  });

  test("returns empty array for invalid input", () => {
    const { result } = renderHook(() =>
      useProducts(null, {})
    );

    expect(result.current).toEqual([]);
  });
});
