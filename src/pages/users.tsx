import * as React from "react";
import { api } from "@/http/client";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Breadcrumb,
  theme,
  Table,
  Space,
  Flex,
  Button,
  Select,
  Input,
  Drawer,
  Form,
} from "antd";
import { Link, useSearchParams } from "react-router";
import { CreateUserForm } from "@/components/users/forms/create";

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

const createUser = async (values: unknown) => {
  const response = await api.post("/users", values);
  return response.data;
};

function Users() {
  const [form] = Form.useForm();
  const [open, setOpen] = React.useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const users = async () => {
    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "5";

    const response = await api.get(`/users?page=${page}&limit=${limit}`);
    return response.data;
  };

  const queryClient = useQueryClient();
  const {
    token: { colorBgContainer, colorBgLayout },
  } = theme.useToken();

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: users,
  });

  const mutation = useMutation({
    mutationKey: ["user/create"],
    mutationFn: createUser,
    onSuccess: async () => {
      console.log("user created successfully");
    },
  });

  const handleFormSubmit = async () => {
    await form.validateFields();
    console.log("Values", form.getFieldsValue());
    mutation.mutate(form.getFieldsValue());
    queryClient.invalidateQueries({ queryKey: ["users"] });
    setOpen(false);
  };

  return (
    <>
      <Breadcrumb separator={<RightOutlined />} style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Users</Breadcrumb.Item>
      </Breadcrumb>
      <Space
        direction="vertical"
        style={{ width: "100%", height: "100%" }}
        size="large"
      >
        <div
          style={{
            padding: 24,
            background: colorBgContainer,
          }}
        >
          <Flex justify="space-between">
            <Space>
              <Input.Search placeholder="Search..." />
              <Select style={{ width: 120 }} defaultValue="all">
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="manager">Manager</Select.Option>
                <Select.Option value="user">User</Select.Option>
              </Select>
              <Select style={{ width: 120 }} defaultValue="active">
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="blocked">Blocked</Select.Option>
              </Select>
            </Space>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => setOpen(true)}
            >
              Create User
            </Button>
            <Drawer
              closable
              width={720}
              styles={{ body: { background: colorBgLayout } }}
              destroyOnClose
              title="Create User"
              placement="right"
              open={open}
              onClose={() => setOpen(false)}
              extra={
                <Space>
                  <Button onClick={() => setOpen(false)}>Cancel</Button>
                  <Button type="primary" onClick={() => handleFormSubmit()}>
                    Submit
                  </Button>
                </Space>
              }
            >
              <Form form={form} layout="vertical" disabled={false}>
                <CreateUserForm />
              </Form>
            </Drawer>
          </Flex>
        </div>
        <div
          style={{
            padding: 24,
            background: colorBgContainer,
          }}
        >
          {data && (
            <Table
              dataSource={data.data}
              columns={columns}
              rowKey="id"
              pagination={{
                total: data.total,
                pageSize: data.limit,
                current: data.page,
                onChange: (page: number, limit: number) => {
                  setSearchParams((prev) => ({
                    ...prev,
                    page: String(page),
                    limit: String(limit),
                  }));
                },
              }}
            />
          )}
        </div>
      </Space>
    </>
  );
}

export default Users;
