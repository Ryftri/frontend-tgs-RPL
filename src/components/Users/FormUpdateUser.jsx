import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams ,useNavigate } from "react-router-dom";

const FormUpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [msg, setMsg] = useState("");

  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    const getUserById = async() => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`)

        setName(response.data.name)
        setEmail(response.data.email)
        setRole(response.data.role)
        setFile(response.data.image)
        setPreview(response.data.url)
      } catch (error) {
        if(error) {
          setMsg(error.response.data.msg)
          console.log(error)
        } 
      }
    }

    getUserById()
  }, [id])

  const updateUser = async(event) => {
    event.preventDefault()
    const formData = new FormData();
    
    
    formData.append("nameUser", name);
    formData.append("emailUser", email);
    formData.append("password", password);
    formData.append("confPassword", confirmPassword);
    formData.append("role", role);
    formData.append("file", file);

    try {
      await axios.patch(`http://localhost:5000/users/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      navigate("/users")
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
    <div className="animation">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h3 className="h2">Ubah Data Anggota</h3>
        <p>{msg}</p>
      </div>

      <form className="form  p-4" onSubmit={updateUser}>
        <div className="form-dashboard">
          <div className="form-floating mb-3">
            <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" id="floatingInput" placeholder="Paijo" />
            <label htmlFor="floatingInput">Nama</label>
          </div>

          <div className="form-floating mb-3">
            <input  value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email</label>
          </div>

          <div className="form-floating mb-3">
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-floating mb-3">
            <input value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Confirm Password" />
            <label htmlFor="floatingPassword">Konfirmasi Password</label>
          </div>

          <div className="select mb-3">
            <label htmlFor="floatingPassword">Role</label>
            <select value={role} onChange={(event) => setRole(event.target.value)} className="form-select" aria-label="Pilih Role">
              <option value="admin">Admin</option>
              {role === "admin" ? ("") : (<option value="user">User</option>)}
            </select>
          </div>

          <div className="foto mb-3">
            <label htmlFor="floatingPassword">Masukkan Foto Anggota</label>
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

export default FormUpdateUser;
