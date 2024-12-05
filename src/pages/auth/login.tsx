import { Layout, Card, Space, Form, Input, Checkbox, Button } from "antd";
import { LockFilled, MailOutlined, LockOutlined } from "@ant-design/icons";
function Login() {
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
            console.log(values);
          }}
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
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
}

export default Login;
