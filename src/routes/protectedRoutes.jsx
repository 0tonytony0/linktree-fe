import { Route, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/constants";
import Layout from "../layouts/Layout";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

export const ProtectedRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, []);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
