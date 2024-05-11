import React from "react";
import {
  LineChartOutlined,
  UserOutlined,
  AlignCenterOutlined,
  BookOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthServices } from "../../../services/authService";
import {
  AUTHENTICATED_ROUTE,
  UNAUTHENTICATED_ROUTES,
} from "../../../Utils/Constant";
const { Header, Content, Footer, Sider } = Layout;
// const items = [
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
//   UserOutlined,
// ].map((icon, index) => ({
//   key: String(index + 1),
//   icon: React.createElement(icon),
//   label: `nav ${index + 1}`,
// }));

const items = [
  {
    key: 1,
    icon: <LineChartOutlined />,
    label: <Link to={AUTHENTICATED_ROUTE.DASHBOARD}>Dashboard</Link>,
  },
  {
    key: 2,
    icon: <AlignCenterOutlined />,
    label: <Link to={AUTHENTICATED_ROUTE.CATEGORIES}>Categories</Link>,
  },
  {
    key: 3,
    icon: <UserOutlined />,
    label: <Link to={AUTHENTICATED_ROUTE.USERS}>Users</Link>,
  },
  {
    key: 4,
    icon: <BookOutlined />,
    label: "Post",
  },
  {
    key: 5,
    icon: <LogoutOutlined />,
    label: (
      <div
        onClick={() => {
          AuthServices.removeToken();
          window.location.href = UNAUTHENTICATED_ROUTES.LOGIN;
        }}
      >
        Logout{" "}
      </div>
    ),
  },
];

const AdminLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" style={{ marginTop: 40 }} />
        <div style={{ marginLeft: 2 }}>
          <Button
            type="primary"
            ghost
            style={{ width: "97%" }}
            onClick={() => {
              navigate(UNAUTHENTICATED_ROUTES.HOME);
            }}
          >
            Home
          </Button>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflowX: "auto",
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
