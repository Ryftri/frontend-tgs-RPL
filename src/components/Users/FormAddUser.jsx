import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [file, setFile] = useState("");
  const [preview, setpreview] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate()

  const saveUser = async(event) => {
    event.preventDefault()
    const formData = new FormData();
    
    
    formData.append("nameUser", name);
    formData.append("emailUser", email);
    formData.append("password", password);
    formData.append("confPassword", confirmPassword);
    formData.append("role", role);
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/users", formData, {
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
    console.log(image)
    setFile(image)
    setpreview(URL.createObjectURL(image))
  }

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h3 className="h2">Tambah Anggota</h3>
        <p>{msg}</p>
      </div>
      <form onSubmit={saveUser} className="form p-4">
        <div className="form-dashboard">
          <div className="form-floating mb-3">
            <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" id="floatingInput" placeholder="Paijo" />
            <label htmlFor="floatingInput">Nama</label>
          </div>

          <div className="form-floating mb-3">
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
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
              <option value="user">User</option>
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

export default FormAddUser;
