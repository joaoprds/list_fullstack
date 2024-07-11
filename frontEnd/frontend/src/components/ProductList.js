import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [progress, setProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error while search Product. Error:", error);
      }
    };

    fetchProducts();
  }, [token]);

  const handleLoadTestProducts = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/products/test",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("50 test products loaded successfully");
    } catch (error) {
      console.error("Error loading test products:", error);
    }
  };

  const handleDeleteAllProducts = async () => {
    try {
      await axios.delete("http://localhost:3000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProgress(100);
      alert("All products were successfully deleted");
    } catch (error) {
      console.error("Error when deleting all products:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search Products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleLoadTestProducts}>Upload test products</button>
      <button onClick={handleDeleteAllProducts}>Delete all products</button>
      <div>Barra de Progresso: {progress}%</div>
      {filteredProducts.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
