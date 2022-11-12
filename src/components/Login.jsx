import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";

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
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (event) => {
    event.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <div className="login-form">
      <main className="form-signin">
        <form onSubmit={Auth} className="form">
          <h1 className="h3 mb-3 fw-normal">Mohon untuk login</h1>

          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" />
            <label for="floatingInput">Email</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
            <label for="floatingPassword">Password</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            {isLoading ? "Loading...." : "Masuk"}
          </button>
        </form>
        {isError && <p className="text-center">{message}</p>}
      </main>
    </div>
  );
};

export default Login;
