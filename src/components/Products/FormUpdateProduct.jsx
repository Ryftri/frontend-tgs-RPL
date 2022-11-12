import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams ,useNavigate } from "react-router-dom";

const FormUpdateProduct = () => {
  const [name, setName] = useState("");
  const [typeProduct, setTypeProduct] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [msg, setMsg] = useState("");

  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    const getProductsById = async() => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`)

        setName(response.data.name)
        setTypeProduct(response.data.typeProduct)
        setBrand(response.data.brand)
        setQuantity(response.data.quantity)
        setFile(response.data.image)
        setPreview(response.data.url)
      } catch (error) {
        if(error) {
          setMsg(error.response.data.msg)
          console.log(error)
        } 
      }
    }

    getProductsById()
  }, [id])

  const updateProduct = async(event) => {
    event.preventDefault()
    const formData = new FormData();
    
    
    formData.append("title", name);
    formData.append("type", typeProduct);
    formData.append("brand", brand);
    formData.append("quantites", quantity);
    formData.append("file", file);

    try {
      await axios.patch(`http://localhost:5000/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(file)
      navigate("/products")
    } catch (error) {
       if(error) {
        setMsg(error.response.data.msg)
        console.log(error)
       }
    }
  }

  const loadImage = (event) => {
    const image = event.target.files[0]
    setFile(image)
    setPreview(URL.createObjectURL(image))
  }


  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h3 className="h2">Tambah Produk</h3>
        <p>{msg}</p>
      </div>
      <form className="form p-4" onSubmit={updateProduct} >
        <div className="form-dashboard">
          <div className="form-floating mb-3">
            <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" id="floatingInput" placeholder="Barang" />
            <label for="floatingInput">Nama Produk</label>
          </div>

          <div className="select mb-3">
            <label>Tipe Produk</label>
            <select value={typeProduct} onChange={(event) => setTypeProduct(event.target.value)} className="form-select" aria-label="Pilih Tipe">
              <option value="pod">POD</option>
              <option value="mod">MOD</option>
              <option value="coil">Coil</option>
              <option value="liquid">liquid</option>
              <option value="lain-lain">lain-lain</option>
            </select>
          </div>

          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingPassword" value={brand} onChange={(event) => setBrand(event.target.value)} />
            <label for="floatingPassword">Brand Produk</label>
          </div>

          <div className="form-floating mb-3">
            <input type="number" className="form-control" id="floatingInput" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
            <label for="floatingInput">Jumlah Produk</label>
          </div>

          <div className="foto mb-3">
            <label for="floatingPassword">Masukkan Foto Produk</label>
            <div>
              <div>
                <label className="d-flex flex-column">
                  <input type="file" className="file-input" onChange={loadImage} />
                  <span className="file-cta">
                    <span className="file-cta">
                    {preview ? (
                      <figure className="figure">
                        <img src={preview} alt="Gambar Pilihan" className="figure-img img-fluid rounded" />
                      </figure>
                    ) : ("")}
                    </span>
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

export default FormUpdateProduct;
