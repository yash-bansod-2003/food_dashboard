import { Layout } from "antd";
import { Outlet, Navigate } from "react-router";
import { useAuthenticationStore } from "@/store";

function DashboardLayout() {
  const { user } = useAuthenticationStore();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
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

export default DashboardLayout;
