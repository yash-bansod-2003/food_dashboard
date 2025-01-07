import * as React from "react";
import {
  Avatar,
  Badge,
  Dropdown,
  Flex,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
import { BellFilled } from "@ant-design/icons";
import { Outlet, Navigate } from "react-router";
import { useAuthenticationStore } from "@/store";
import { api } from "@/http/client";
import { useMutation } from "@tanstack/react-query";
import { getDashboardMenuItems } from "@/lib/utils";

const { Header, Content, Footer, Sider } = Layout;

const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

function DashboardLayout() {
  const { user, logout: logoutFromStore } = useAuthenticationStore();
  const [collapsed, setCollapsed] = React.useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: async () => {
      logoutFromStore();
    },
  });

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        theme="light"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Flex className="demo-logo-vertical" style={{ height: "4rem" }}>
          Logo
        </Flex>
        <Menu
          theme="light"
          defaultSelectedKeys={["/"]}
          mode="inline"
          items={getDashboardMenuItems(user.role)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 1rem",
            background: colorBgContainer,
          }}
        >
          <Flex justify="space-between" align="start">
            <Badge text="Global" status="success" />
            <Space size="large">
              <Badge dot>
                <BellFilled />
              </Badge>
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "1",
                      label: "Logout",
                      onClick: () => {
                        logoutMutation.mutate();
                      },
                    },
                  ],
                }}
                placement="bottomLeft"
                arrow={{ pointAtCenter: true }}
              >
                <Avatar>
                  {user.firstname.charAt(0)}
                  {user.lastname.charAt(0)}
                </Avatar>
              </Dropdown>
            </Space>
          </Flex>
        </Header>
        <Content style={{ margin: "0 1rem" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Food ©{new Date().getFullYear()} Created by Yash Bansod
        </Footer>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
