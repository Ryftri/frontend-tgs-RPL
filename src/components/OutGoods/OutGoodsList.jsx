import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const IncomingGoodsList = () => {
  const [outGoods, setOutGoods] = useState([]);
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("");
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    getOutGoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOutGoods = async () => {
    const response = await axios.get("http://localhost:5000/out-goods");
    setOutGoods(response.data);
  };

  const deleteOutGoods = async (productId) => {
    await axios.delete(`http://localhost:5000/out-goods/${productId}`);
    getOutGoods();
  };

  return (
    <div className="animation">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h3 className="h2">Barang Keluar</h3>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <Link to={"/barang-keluar/add"} className="btn btn-outline-success">
              Tambah Barang Keluar
            </Link>
          </div>
        </div>
      </div>
      <div className="option label__kusus justify-content-between">
      <div>
          <label>Pilih Tipe Produk</label>
          <select value={searchOption} onChange={event => setSearchOption(event.target.value)} className="option2 form-select" aria-label="Pilih Tipe">
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
          <label>Pencarian Berdasarkan Id</label>
          <input value={search} onChange={event => setSearch(event.target.value)} type="text" className="form-control" placeholder="Id barang masuk" aria-label="Username" aria-describedby="basic-addon1"/>
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
            <th scope="col">Kode</th>
            {user && user.role === "admin" && (
                <th scope="col" className="actions">Aksi</th>
            )}
          </tr>
        </thead>
        <tbody>
          {outGoods.filter((filtering) => 
        filtering.product.typeProduct.toLowerCase().includes(searchOption.toLowerCase()) && 
        filtering.kode_brg_keluar.toLowerCase().includes(search.toLowerCase())).map((incoming, index) => (
              <tr key={incoming.uuid}>
                <td className="fw-bold">{index + 1}</td>
                <td>{incoming.product.name}</td>
                <td>{incoming.product.typeProduct}</td>
                <td>{incoming.product.brand}</td>
                <td>{incoming.quantity}</td>
                <td>{incoming.user.name}</td>
                <td>{incoming.kode_brg_keluar}</td>
                {user && user.role === "admin" && (
                  <td className="btn-group me-2 button-td">
                    <button className="btn btn-danger" onClick={() => deleteOutGoods(incoming.uuid)}>
                      Hapus
                    </button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncomingGoodsList;
