import React, { useState, useEffect } from "react";
import { fetchProducts } from "../services/api";

const ProductPicker = ({ onSelect, onClose }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchProducts(search, page, 10)
      .then((response) => setProducts((prev) => [...prev, ...response.data]))
      .finally(() => setLoading(false));
  }, [page, search]);

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div onScroll={handleScroll}>
      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        {products.map((product) => (
          <div key={product.id} onClick={() => onSelect(product)}>
            <img src={product.image.src} alt={product.title} loading="lazy" />
            <h4>{product.title}</h4>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ProductPicker;
