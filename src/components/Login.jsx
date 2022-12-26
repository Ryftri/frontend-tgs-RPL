import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());

    const getMeLogin = async() => {
      try {
        const response = await axios.get("http://localhost:5000/me");
        if(response.data) {
          navigate("/dashboard");
        }
      } catch (error) {
        if (error.response) {
          const message = error.response.data.msg;
          console.log(message);
        }
      }
    }
    setTimeout(() => {
      getMeLogin();
    }, 500)
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (event) => {
    event.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <div className="gradasi">
      <div className="login-form">
        <main className="form-signin">
          <form onSubmit={Auth} className="form login">
            <h1 className="h3 mb-3 fw-normal judul-login text-center">Mohon untuk login</h1>

            <div className="form-floating">
              <input type="email" className="form-control" id="floatingInput" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" />
              <label htmlFor="floatingInput">Email</label>
            </div>
            <div className="form-floating">
              <input type="password" className="form-control" id="floatingPassword" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary login__btn" type="submit">
              {isLoading ? "Loading...." : "Masuk"}
            </button>
          </form>
          {isError && <p className="text-center fs-5 text-light message">{message}</p>}
        </main>
      </div>
    </div>
  );
};

export default Login;
