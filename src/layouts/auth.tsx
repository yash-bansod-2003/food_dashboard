import { Layout } from "antd";
import { Outlet, Navigate } from "react-router";
import { useAuthenticationStore } from "@/store";

function AuthenticationLayout() {
  const { user } = useAuthenticationStore();

  if (user) {
    return <Navigate to="/" replace />;
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
}

export default AuthenticationLayout;
