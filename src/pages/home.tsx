import { RightOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

function Home() {
  return (
    <>
      <Breadcrumb separator={<RightOutlined />} style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 360,
        }}
      >
        Home
      </div>
    </>
  );
}

export default Home;
