// src/pages/ProductCrud.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductCrud = () => {

  // STORE PRODUCTS
  const [products, setProducts] = useState([]);

  // FORM DATA
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  // IMAGE
  const [image, setImage] = useState(null);

  // EDIT ID
  const [editId, setEditId] = useState(null);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // HANDLE IMAGE
  // =========================
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  // =========================
  // GET PRODUCTS
  // =========================
  const getProducts = async () => {
    try {

      const response = await axios.get(
        "http://localhost:5000/api/products/get"
      );
      setProducts(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // CREATE PRODUCT
  // =========================
  const createProduct = async (e) => {
    e.preventDefault();

    try {

      const productData = new FormData();

      productData.append("name", formData.name);
      productData.append("price", formData.price);
      productData.append("description", formData.description);
      productData.append("image", image);

      await axios.post(
        "http://localhost:5000/api/products/create",
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product Added");

      getProducts();

      resetForm();

    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // DELETE PRODUCT
  // =========================
  const deleteProduct = async (id) => {
    try {

      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      alert("Product Deleted");

      getProducts();

    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // EDIT PRODUCT
  // =========================
  const editProduct = (product) => {

    setEditId(product._id);

    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
    });
  };

  // =========================
  // UPDATE PRODUCT
  // =========================
  const updateProduct = async (e) => {
    e.preventDefault();

    try {

      const updatedData = new FormData();

      updatedData.append("name", formData.name);
      updatedData.append("price", formData.price);
      updatedData.append("description", formData.description);

      if (image) {
        updatedData.append("image", image);
      }

      await axios.put(
        `http://localhost:5000/api/products/${editId}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product Updated");

      getProducts();

      resetForm();

    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {

    setFormData({
      name: "",
      price: "",
      description: "",
    });

    setImage(null);

    setEditId(null);
  };

  // =========================
  // USE EFFECT
  // =========================
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container">

      {/* FORM */}
      <form onSubmit={editId ? updateProduct : createProduct}>

        <h1>
          {editId ? "Update Product" : "Add Product"}
        </h1>

        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />

        <br /><br />

        {/* PRICE */}
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={formData.price}
          onChange={handleChange}
        />

        <br /><br />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <br /><br />

        {/* IMAGE */}
        <input
          type="file"
          onChange={handleImage}
        />

        <br /><br />

        <button type="submit">
          {editId ? "Update Product" : "Add Product"}
        </button>

      </form>

      {/* PRODUCT LIST */}
      <div className="product-list">

        <h1>Products</h1>

        {
          products.map((product) => (
            <div className="card" key={product._id}>

              <img
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.name}
                width="150"
              />

              <h3>{product.name}</h3>

              <p>₹ {product.price}</p>

              <p>{product.description}</p>

              <button onClick={() => editProduct(product)}>
                Edit
              </button>

              <button onClick={() => deleteProduct(product._id)}>
                Delete
              </button>

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default ProductCrud;