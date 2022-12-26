import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <p className="fs-5 border-bottom border-light">General</p>
          <li className="nav-item link__pages">
            <NavLink to="/dashboard" className="nav-link fs-6">
              <i className="bi bi-house-door"></i>
              Dashboard
            </NavLink>
          </li>
          
          <li className="nav-item link__pages">
            <NavLink to="/products" className="nav-link fs-6">
              <i className="bi bi-inboxes"></i>
              <span data-feather="file"></span>
              Produk
            </NavLink>
          </li>

          <li className="nav-item link__pages">
            <NavLink to="/barang-masuk" className="nav-link fs-6">
              <i className="bi bi-box-arrow-in-down"></i>
              <span data-feather="file"></span>
              Barang Masuk
            </NavLink>
          </li>

          <li className="nav-item link__pages">
            <NavLink to="/barang-keluar" className="nav-link fs-6">
              <i className="bi bi-box-arrow-up"></i>
              <span data-feather="file"></span>
              Barang Keluar
            </NavLink>
          </li>
        </ul>

        {user && user.role === "admin" && (
          <ul className="nav flex-column">
            <p className="fs-5 border-bottom border-light">Administrator</p>
            <li className="nav-item link__pages">
              <NavLink to="/users" className="nav-link fs-6">
                <i className="bi bi-person-video2"></i>
                Staff
              </NavLink>
            </li>
          </ul>
        )}

        <div className="flex-column">
          <p className="fs-5 border-bottom border-light">Setting</p>
          <button onClick={logout} className="btn btn-danger m-2 fs-6">
            <i className="bi bi-box-arrow-left"></i>
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
