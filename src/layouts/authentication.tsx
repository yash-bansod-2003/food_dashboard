import React from "react";
import { Outlet, Navigate } from "react-router";
import { useAuthenticationStore } from "@/store";
import { Layout } from "antd";

const AuthenticationLayout: React.FC = () => {
  const { user } = useAuthenticationStore();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <Layout
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Outlet />
    </Layout>
  );
};

export default AuthenticationLayout;
