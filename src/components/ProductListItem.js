import { useState } from "react";

const FALLBACK_IMAGE =
  "https://via.placeholder.com/300x200?text=No+Image";

export default function ProductListItem({ product = {} }) {
  const [imgSrc, setImgSrc] = useState(
    typeof product.image === "string" && product.image.trim() !== ""
      ? product.image
      : FALLBACK_IMAGE
  );

  const name =
    typeof product.name === "string" && product.name.trim() !== ""
      ? product.name
      : "Unnamed Product";

  const price =
    typeof product.price === "number" ? `₹${product.price}` : "Price N/A";

  const rating =
    typeof product.rating === "number" ? product.rating : null;

  return (
    <div className="product-card">
      {/* IMAGE WITH FALLBACK */}
      <img
        src={imgSrc}
        alt={name}
        onError={() => setImgSrc(FALLBACK_IMAGE)}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "6px",
          marginBottom: "0.5rem",
        }}
      />

      <h3 style={{ margin: "0 0 0.5rem 0" }}>{name}</h3>

      <p style={{ margin: "0.25rem 0", fontWeight: "600" }}>
        {price}
      </p>

      {rating !== null && (
        <p style={{ margin: "0.25rem 0", color: "#555" }}>
          ⭐ {rating}
        </p>
      )}
    </div>
  );
}