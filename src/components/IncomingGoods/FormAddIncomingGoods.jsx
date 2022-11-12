import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddIncomingGoods = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [typeProduct, setTypeProduct] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [uuid, setUuid] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const filter = () => {
        let filtering = products.find(product => product.name === name);

        if(!filtering) {
           filtering = "" ;
           setTypeProduct("");
           setBrand("");
           setUuid("");
        } else {
            setTypeProduct(filtering.typeProduct);
            setBrand(filtering.brand);
            setUuid(filtering.uuid);
        }
    }
    getProducts();
    filter()
  }, [name])

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  }

  const saveIncoming = async(event) => {
    event.preventDefault()
    const formData = new FormData();
    
    formData.append("quantites", quantity);
    formData.append("id", uuid);

    try {
      await axios.post("http://localhost:5000/incomings", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      navigate("/barang-masuk")
    } catch (error) {
       if(error) {
        setMsg(error.response.data.msg)
        console.log(error)
       }
       console.log(typeProduct)
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h3 className="h2">Tambah Barang Masuk</h3>
        <p>{msg}</p>
      </div>
      <form className="form p-4" onSubmit={saveIncoming}>
        <div className="form-dashboard">

          <div className="select mb-3 select-name">
            <label>Nama Produk</label>
            <select value={name} onChange={(event) => setName(event.target.value)} className="form-select" aria-label="Pilih Tipe">
              <option value=""></option>
              {products.map((product) => <option key={product.uuid} value={product.name}>{product.name}</option>)}
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
              <option value="lain-lain">lain-lain</option>
            </select>
          </div>

          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingPassword" value={brand} onChange={(event) => setBrand(event.target.value)} placeholder="Gorilla" disabled/>
            <label >Brand Produk</label>
          </div>

          <div className="form-floating mb-3">
            <input type="number" className="form-control" id="floatingInput" value={quantity} onChange={(event) => setQuantity(event.target.value)} placeholder="20000" />
            <label >Jumlah Produk</label>
          </div>
        </div>

        <button className="w-10 btn btn-lg btn-primary button-save" type="submit">
          Simpan
        </button>
      </form>
    </div>
  );
};

export default FormAddIncomingGoods;
