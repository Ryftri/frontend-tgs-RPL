import React, { useEffect } from "react";
import Layout from "../Layout";
import FormAddIncomingGoods from "../../components/IncomingGoods/FormAddIncomingGoods";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const AddIncoming = () => {
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
        <FormAddIncomingGoods/>
    </Layout>
  );
};

export default AddIncoming;
