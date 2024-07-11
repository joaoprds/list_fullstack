import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddEditProduct = ({ token }) => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/products/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const { name, description, price } = response.data;
          setName(name);
          setDescription(description);
          setPrice(price);
        } catch (error) {
          console.error("Error while search Product. Error:", error);
        }
      };

      fetchProduct();
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, description, price };
    try {
      if (id) {
        await axios.put(
          `http://localhost:3000/api/products/${id}`,
          productData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("Product Update !");
      } else {
        await axios.post("http://localhost:3000/api/products", productData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Product Created!");
      }
    } catch (error) {
      console.error("Error while save product. Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label>Description</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <label>Price</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <button type="submit">{id ? "Atualizar" : "Adicionar"}</button>
    </form>
  );
};

export default AddEditProduct;
