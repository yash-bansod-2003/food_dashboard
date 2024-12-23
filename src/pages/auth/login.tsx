import { Card, Space, Form, Input, Checkbox, Button } from "antd";
import { LockFilled, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useQuery, useMutation } from "react-query";
import { login, logout, profile } from "@/http/helpers";
import { useAuthenticationStore } from "@/store";
import { Roles } from "@/lib/constants";

function Login() {
  const { setUser, logout: logoutFromStore } = useAuthenticationStore();
  const profileQuery = useQuery("profile", profile, {
    enabled: false,
  });

  const logoutMutation = useMutation("logout", logout, {
    onSuccess: async () => {
      const { data } = await profileQuery.refetch();
      setUser(data);
    },
  });

  const loginMutation = useMutation("login", login, {
    onSuccess: async () => {
      const { data } = await profileQuery.refetch();
      if (data.role === Roles.USER) {
        logoutFromStore();
        logoutMutation.mutate();
        return;
      }
      setUser(data);
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
          loginMutation.mutate(values);
        }}
        disabled={loginMutation.isLoading}
      >
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
          <Checkbox defaultChecked>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loginMutation.isLoading}
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Login;
