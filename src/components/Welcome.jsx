import React from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h3 className="subtitle">
        Selamat Datang Kembali <strong>{user && user.name}</strong>
      </h3>
    </div>
  );
};

export default Welcome;
