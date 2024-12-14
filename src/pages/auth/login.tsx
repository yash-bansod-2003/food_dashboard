import { Card, Space, Form, Input, Checkbox, Button, Alert } from "antd";
import { LockFilled, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/http/client";
import { useAuthenticationStore } from "@/store";

interface Credentials {
  email: string;
  password: string;
  remember: boolean;
}

const login = async (values: Credentials) => {
  const { email, password } = values;
  const response = await api.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

const profile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

function Login() {
  const { setUser, logout: logoutFromStore } = useAuthenticationStore();
  const { refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: profile,
    enabled: false,
  });

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: async () => {
      const query = await refetch();
      setUser(query.data);
      if (query.data.role === "user") {
        await logout();
        logoutFromStore();
      }
    },
  });

  return (
    <Card
      style={{ width: 300 }}
      title={
        <Space style={{ width: "100%", justifyContent: "center" }}>
          <LockFilled />
          Sign in
        </Space>
      }
    >
      <Form
        initialValues={{ remember: true }}
        onFinish={(values) => {
          mutation.mutate(values);
        }}
        disabled={mutation.isPending}
      >
        {mutation.isError && (
          <Alert
            style={{ margin: "1rem 0" }}
            message={mutation.error.message}
            type="error"
          />
        )}
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "The input is not valid E-mail!" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="password" />
        </Form.Item>
        <Form.Item name="remember">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            loading={mutation.isPending}
            type="primary"
            htmlType="submit"
            block
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Login;
