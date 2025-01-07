import { api } from "@/http/client";
import { RightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, theme, Table } from "antd";
import { Link } from "react-router";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "First Name",
    dataIndex: "firstname",
    key: "firstname",
  },
  {
    title: "Last Name",
    dataIndex: "lastname",
    key: "lastname",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
];

const users = async () => {
  const response = await api.get("/users");
  return response.data;
};

function Users() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: users,
  });

  return (
    <>
      <Breadcrumb separator={<RightOutlined />} style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Users</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          background: colorBgContainer,
          height: "100%",
        }}
      >
        <Table dataSource={data} columns={columns} />
      </div>
    </>
  );
}

export default Users;
