import { api } from "@/http/client";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Form, Input, Row, Select, Space } from "antd";

interface Restaurant {
  id: number;
  name: string;
  address: string;
}

const restaurants = async () => {
  const response = await api.get("/restaurants");
  return response.data;
};

export const CreateUserForm = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["restaurants"],
    queryFn: restaurants,
  });

  console.log(data);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Card title="Basic Information">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="firstname"
              label="First Name"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input placeholder="John" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastname"
              label="Last Name"
              rules={[
                { required: true, message: "Please input your lastname!" },
              ]}
            >
              <Input placeholder="Deo" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "The input is not valid E-mail!" },
              ]}
            >
              <Input placeholder="johndeo@domain.com" />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card title="Security Information">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please input your role!" }]}
            >
              <Select placeholder="Select a role" defaultValue="user">
                <Select.Option value="user">User</Select.Option>
                <Select.Option value="manager">Manager</Select.Option>
                <Select.Option value="admin">Admin</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card title="Restaurant Information">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="restaurantId"
              label="Restaurant"
              rules={[
                { required: true, message: "Please input your restaurant!" },
              ]}
            >
              <Select loading={isLoading} placeholder="Select a Restaurant">
                {data &&
                  data.map((restaurant: Restaurant) => (
                    <Select.Option key={restaurant.id} value={restaurant.id}>
                      {restaurant.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Space>
  );
};
