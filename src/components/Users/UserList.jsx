import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);
  
  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h3 className="h2">Anggota</h3>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
          <Link to={"/users/add"} className="btn btn-outline-success">Tambah Anggota</Link>
          </div>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Nama</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col" className="actions">Aksi</th>
          </tr>
        </thead>
        <tbody className="table-dashboard">
        {users.map((user, index) => (
            <tr key={user.uuid}>
              <th>{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="btn-group me-2 button-td">
                <Link to={`/users/edit/${user.uuid}`} className="btn btn-warning" >Edit</Link>
                <button className="btn btn-danger" onClick={() => deleteUser(user.uuid)} >Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
