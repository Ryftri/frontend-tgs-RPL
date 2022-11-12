import React, { useEffect } from "react";
import Layout from "../Layout";
import OutGoodsList from "../../components/OutGoods/OutGoodsList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const OutGoods = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <Layout>
      <OutGoodsList />
    </Layout>
  );
};

export default OutGoods;
