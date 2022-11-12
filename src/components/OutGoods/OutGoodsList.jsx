import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const IncomingGoodsList = () => {
  const [outGoods, setOutGoods] = useState([]);
  const [result, setResult] = useState([]);
  const [clickTypeProduct, setClickTypeProduct] = useState("");
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    getOutGoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderFunction = (event) => {
    setClickTypeProduct(event.target.value);
    setResult(outGoods.filter((incoming) => incoming.product.typeProduct === event.target.value));
  };

  const getOutGoods = async () => {
    const options = document.querySelector(".option2");
    const response = await axios.get("http://localhost:5000/out-goods");
    setOutGoods(response.data);
    setResult(response.data.filter((incoming) => incoming.product.typeProduct === options.value));
  };

  const deleteOutGoods = async (productId) => {
    await axios.delete(`http://localhost:5000/out-goods/${productId}`);
    getOutGoods();
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h3 className="h2">Barang Keluar</h3>
        <div className="option label__kusus">
          <label>Pilih Tipe Produk</label>
          <select value={clickTypeProduct} onChange={renderFunction} className="option2 form-select" aria-label="Pilih Tipe">
            <option value="">Semua Barang Keluar</option>
            <option value="pod">POD</option>
            <option value="mod">MOD</option>
            <option value="coil">Coil</option>
            <option value="liquid">liquid</option>
            <option value="rda">RDA</option>
            <option value="kapas">Kapas</option>
            <option value="lain-lain">lain-lain</option>
          </select>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <Link to={"/barang-keluar/add"} className="btn btn-outline-success">
              Tambah Barang Keluar
            </Link>
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
            <th scope="col">ID</th>
            {user && user.role === "admin" && (
                <th scope="col" className="actions">Aksi</th>
            )}
          </tr>
        </thead>
        <tbody>
          {clickTypeProduct !== "" ? (
            result.length !== 0 ? (
              result.map((outGoods, index) => (
                <tr key={outGoods.uuid}>
                  <td className="fw-bold">{index + 1}</td>
                  <td>{outGoods.product.name}</td>
                  <td>{outGoods.product.typeProduct}</td>
                  <td>{outGoods.product.brand}</td>
                  <td>{outGoods.quantity}</td>
                  <td>{outGoods.user.name}</td>
                  <td>{outGoods.id}</td>
                  {user && user.role === "admin" && (
                  <td className="btn-group me-2 button-td">
                    <button className="btn btn-danger" onClick={() => deleteOutGoods(outGoods.uuid)}>
                      Hapus
                    </button>
                  </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td className="pesan fs-2 text-center">Maaf data barang belum ada</td>
              </tr>
            )
          ) : outGoods.length !== 0 ? (
            outGoods.map((incoming, index) => (
              <tr key={incoming.uuid}>
                <td className="fw-bold">{index + 1}</td>
                <td>{incoming.product.name}</td>
                <td>{incoming.product.typeProduct}</td>
                <td>{incoming.product.brand}</td>
                <td>{incoming.quantity}</td>
                <td>{incoming.user.name}</td>
                <td>{incoming.id}</td>
                {user && user.role === "admin" && (
                  <td className="btn-group me-2 button-td">
                    <button className="btn btn-danger" onClick={() => deleteOutGoods(outGoods.uuid)}>
                      Hapus
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td className="pesan fs-2 text-center">Maaf data barang belum ada</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IncomingGoodsList;
