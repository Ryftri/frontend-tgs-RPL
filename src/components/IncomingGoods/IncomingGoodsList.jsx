import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const IncomingGoodsList = () => {
  const [incomings, setIncomings] = useState([]);
  const [result, setResult] = useState([]);
  const [clickTypeProduct, setClickTypeProduct] = useState("");
  const [msg, setMsg] = useState("")
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    getIncomingGoods();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderFunction = (event) => {
    setClickTypeProduct(event.target.value)
    setResult(incomings.filter(incoming => incoming.product.typeProduct === event.target.value))
  }
  
  const getIncomingGoods = async () => {
    const options = document.querySelector(".option2");
    const response = await axios.get("http://localhost:5000/incomings");
    setIncomings(response.data);
    setResult(response.data.filter(incoming => incoming.product.typeProduct === options.value))
  };

  const deleteIncoming = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/incomings/${productId}`);
      getIncomingGoods();
    } catch (error) {
      setMsg(error.response.data.msg)
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h3 className="h2">Barang Masuk</h3>

        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
          <Link to={"/barang-masuk/add"} className="btn btn-outline-success">Tambah Produk</Link>
          </div>
        </div>
      </div>

      <div className="option label__kusus justify-content-between">
        <div>
          <label>Pilih Tipe Produk</label>
          <select value={clickTypeProduct} onChange={renderFunction} className="option2 form-select" aria-label="Pilih Tipe">
            <option value="">Semua Barang Masuk</option>
            <option value="pod">POD</option>
            <option value="mod">MOD</option>
            <option value="coil">Coil</option>
            <option value="liquid">liquid</option>
            <option value="rda">RDA</option>
            <option value="kapas">Kapas</option>
            <option value="lain-lain">lain-lain</option>
          </select>
        </div>

        <div>
          <label>Pilih Tipe Produk</label>
          <select value={clickTypeProduct} onChange={renderFunction} className="option2 form-select" aria-label="Pilih Tipe">
            <option value="">Semua Barang Masuk</option>
            <option value="pod">POD</option>
            <option value="mod">MOD</option>
            <option value="coil">Coil</option>
            <option value="liquid">liquid</option>
            <option value="rda">RDA</option>
            <option value="kapas">Kapas</option>
            <option value="lain-lain">lain-lain</option>
          </select>
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
        {clickTypeProduct !== "" ? 
        result.length !== 0 ? result.map((incoming, index) => (
          <tr key={incoming.uuid}>
            <td className="fw-bold">{index + 1}</td>
            <td>{incoming.product.name}</td>
            <td>{incoming.product.typeProduct}</td>
            <td>{incoming.product.brand}</td>
            <td>{incoming.quantity}</td>
            <td>{incoming.user.name}</td>
            {user && user.role === "admin" && (
            <td className="btn-group me-2 button-td">
              <button className="btn btn-danger" onClick={() => deleteIncoming(incoming.uuid)} >Hapus</button>
            </td>
            )}
          </tr>
          ))
          : 
          <tr><td className="pesan fs-2 text-center">Maaf data barang belum ada</td></tr>
          :
          incomings.length !== 0 ? 
          incomings.map((incoming, index) => (
            <tr key={incoming.uuid}>
              <td className="fw-bold">{index + 1}</td>
              <td>{incoming.product.name}</td>
              <td>{incoming.product.typeProduct}</td>
              <td>{incoming.product.brand}</td>
              <td>{incoming.quantity}</td>
              <td>{incoming.user.name}</td>
              {user && user.role === "admin" && (
                <td className="btn-group me-2 button-td">
                  <button className="btn btn-danger" onClick={() => deleteIncoming(incoming.uuid)} >Hapus</button>
                </td>
            )}
            </tr>
          )) 
          :
          <tr><td className="pesan fs-2 text-center">Maaf data barang belum ada</td></tr>
          }
        </tbody>
      </table>
      <p>{msg}</p>
    </div>
  );
};

export default IncomingGoodsList;
