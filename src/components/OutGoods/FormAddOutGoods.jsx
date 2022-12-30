import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddOutGoods = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [typeProduct, setTypeProduct] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [alamat, setAlamat] = useState("");
  const [uuid, setUuid] = useState("");
  const [sisaBrang, setSisaBarang] = useState(0);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const filter = () => {
      let filtering = products.find((product) => product.name === name);

      if (!filtering) {
        filtering = "";
        setTypeProduct("");
        setBrand("");
        setUuid("");
        setSisaBarang(0);
      } else {
        setTypeProduct(filtering.typeProduct);
        setBrand(filtering.brand);
        setUuid(filtering.uuid);
        setSisaBarang(filtering.quantity);
      }
    };
    filter();
    if(products.length === 0){
      getProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const saveOutGoods = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("quantites", quantity);
    formData.append("alamat", alamat);
    formData.append("id", uuid);

    try {
      await axios.post("http://localhost:5000/out-goods", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/barang-keluar");
    } catch (error) {
      if (error) {
        setMsg(error.response.data.msg);
        console.log(error);
      }
      console.log(typeProduct);
    }
  };

  return (
    <div className="animation">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h3 className="h2">Tambah Barang Keluar</h3>
        <p>{msg}</p>
      </div>
      <form className="form p-4" onSubmit={saveOutGoods}>
        <div className="form-dashboard">
          <div className="select mb-3 select-name">
            <label>Pilih Produk</label>
            <select value={name} onChange={(event) => setName(event.target.value)} className="form-select" aria-label="Pilih Tipe">
              <option value=""></option>
              {products.map((product) => (
                <option key={product.uuid} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="select mb-3">
            <label>Tipe Produk</label>
            <select value={typeProduct} onChange={(event) => setTypeProduct(event.target.value)} className="form-select" aria-label="Pilih Tipe" disabled>
              <option value=""></option>
              <option value="pod">POD</option>
              <option value="mod">MOD</option>
              <option value="coil">Coil</option>
              <option value="liquid">liquid</option>
              <option value="kapas">Kapas</option>
              <option value="lain-lain">lain-lain</option>
            </select>
          </div>

          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingPassword" value={brand} onChange={(event) => setBrand(event.target.value)} placeholder="Gorilla" disabled />
            <label>Brand Produk</label>
          </div>

          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingInput" value={alamat} onChange={(event) => setAlamat(event.target.value)} placeholder="Alamat" />
            <label>Alamat Barang Keluar</label>
          </div>

          <div className="form-floating mb-3">
            <input type="number" className="form-control" id="floatingInput" value={quantity} onChange={(event) => setQuantity(event.target.value)} placeholder="20000" />
            <label>Jumlah Barang Keluar</label>
          </div>
        </div>

        <h3>Sisa barang : {sisaBrang}</h3>

        <button className="w-10 btn btn-lg btn-primary button-save" type="submit">
          Simpan
        </button>
      </form>
    </div>
  );
};

export default FormAddOutGoods;
