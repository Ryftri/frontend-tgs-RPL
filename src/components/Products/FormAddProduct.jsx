import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddProduct = () => {
  const [name, setName] = useState("");
  const [typeProduct, setTypeProduct] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [file, setFile] = useState("");
  const [preview, setpreview] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate()

  const saveProduct = async(event) => {
    event.preventDefault()
    const formData = new FormData();
    
    
    formData.append("title", name);
    formData.append("type", typeProduct);
    formData.append("brand", brand);
    formData.append("quantites", quantity);
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/products", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      navigate("/products")
    } catch (error) {
       if(error) {
        setMsg(error.response.data.msg)
        console.log(error)
       }
       console.log(typeProduct)
    }
  }

  const loadImage = (event) => {
    const image = event.target.files[0]
    console.log(image)
    setFile(image)
    setpreview(URL.createObjectURL(image))
  }

  return (
    <div className="animation">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h3 className="h2">Tambah Produk</h3>
        <p>{msg}</p>
      </div>
      <form className="form p-4" onSubmit={saveProduct}>
        <div className="form-dashboard">
          <div className="form-floating mb-3">
            <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" id="floatingInput" placeholder="Paijo" />
            <label htmlFor="floatingInput">Nama Produk</label>
          </div>

          <div className="select mb-3">
            <label>Tipe Produk</label>
            <select value={typeProduct} onChange={(event) => setTypeProduct(event.target.value)} className="form-select" aria-label="Pilih Tipe">
              <option value=""></option>
              <option value="pod">POD</option>
              <option value="mod">MOD</option>
              <option value="coil">Coil</option>
              <option value="liquid">liquid</option>
              <option value="rda">RDA</option>
              <option value="kapas">Kapas</option>
              <option value="lain-lain">lain-lain</option>
            </select>
          </div>

          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingPassword" value={brand} onChange={(event) => setBrand(event.target.value)} placeholder="Gorilla" />
            <label htmlFor="floatingPassword">Brand Produk</label>
          </div>

          <div className="form-floating mb-3">
            <input type="number" className="form-control" id="floatingInput" value={quantity} onChange={(event) => setQuantity(event.target.value)} placeholder="20000" />
            <label htmlFor="floatingInput">Jumlah Produk</label>
          </div>

          <div className="foto mb-3">
            <label htmlFor="floatingPassword">Masukkan Foto Produk</label>
            <div>
              <div>
                <label className="d-flex flex-column">
                  <input type="file" className="file-input" onChange={loadImage} />
                  <span className="file-cta">
                    {preview ? (
                      <figure className="figure">
                        <img src={preview} alt="Gambar Pilihan" className="figure-img img-fluid rounded" />
                      </figure>
                    ) : ("")}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <button className="w-10 btn btn-lg btn-primary button-save" type="submit">
          Simpan
        </button>
      </form>
    </div>
  );
};

export default FormAddProduct;
