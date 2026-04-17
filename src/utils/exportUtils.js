 /**
 * CSV Injection Protection
 * ------------------------
 * Prevents Excel from interpreting values as formulas.
 * Also escapes quotes and commas safely.
 */
function sanitizeCSVValue(value) {
  if (value === null || value === undefined) return "";

  let str = String(value);

  // Prevent formula injection
  if (/^[=+\-@]/.test(str)) {
    str = "'" + str;
  }

  // Escape double quotes
  str = str.replace(/"/g, '""');

  // Wrap in quotes if needed
  if (str.includes(",") || str.includes("\n") || str.includes('"')) {
    str = `"${str}"`;
  }

  return str;
}

/**
 * Export products safely as CSV
 */
export function exportProductsCSV(products = []) {
  if (!Array.isArray(products) || products.length === 0) return;

  const headers = ["id", "name", "price", "category", "unitsSold"];

  const rows = products.map((p) => {
    return [
      sanitizeCSVValue(p?.id),
      sanitizeCSVValue(p?.name),
      sanitizeCSVValue(
        typeof p?.price === "number" ? p.price : ""
      ),
      sanitizeCSVValue(p?.category),
      sanitizeCSVValue(Number(p?.unitsSold ?? p?.sold) || 0),
    ].join(",");
  });

  const csvContent = [headers.join(","), ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "products-report.csv";
  link.click();

  URL.revokeObjectURL(url);
}
