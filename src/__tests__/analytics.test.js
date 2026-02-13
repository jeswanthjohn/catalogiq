import { calculateAnalytics } from "../utils/analytics";

const mockProducts = [
  {
    id: 1,
    price: 100,
    rating: 4,
    sold: 2,
  },
  {
    id: 2,
    price: 200,
    rating: 5,
    sold: 3,
  },
];

describe("calculateAnalytics", () => {
  test("calculates total products correctly", () => {
    const result = calculateAnalytics(mockProducts);
    expect(result.totalProducts).toBe(2);
  });

  test("calculates total revenue correctly", () => {
    const result = calculateAnalytics(mockProducts);
    // (100 * 2) + (200 * 3) = 200 + 600 = 800
    expect(result.totalRevenue).toBe(800);
  });

  test("calculates average rating correctly", () => {
    const result = calculateAnalytics(mockProducts);
    // (4 + 5) / 2 = 4.5
    expect(result.averageRating).toBe(4.5);
  });

  test("handles empty product array", () => {
    const result = calculateAnalytics([]);
    expect(result.totalProducts).toBe(0);
    expect(result.totalRevenue).toBe(0);
    expect(result.averageRating).toBe(0);
  });
});
