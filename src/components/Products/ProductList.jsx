import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getProducts();
  }, []);
  
  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:5000/products/${productId}`);
    getProducts();
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h3 className="h2">Produk</h3>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
          <Link to={"/products/add"} className="btn btn-outline-success">Tambah Produk</Link>
          </div>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Nama Barang</th>
            <th scope="col">Tipe Produk</th>
            <th scope="col">Brand</th>
            <th scope="col">Jumlah Barang</th>
            <th scope="col">Di Input Oleh</th>
            {user && user.role === "admin" && (
            <th scope="col" className="actions">Aksi</th>
            )}
          </tr>
        </thead>
        <tbody>
        {products.map((product, index) => (
            <tr key={product.uuid}>
              <td className="fw-bold">{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.typeProduct}</td>
              <td>{product.brand}</td>
              <td>{product.quantity}</td>
              <td>{product.user.name}</td>
              {user && user.role === "admin" && (
              <td className="btn-group me-2 button-td">
                <Link to={`/products/edit/${product.uuid}`} className="btn btn-warning" >Edit</Link>
                <button className="btn btn-danger" onClick={() => deleteProduct(product.uuid)} >Hapus</button>
              </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
