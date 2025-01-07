import type { MenuProps } from "antd";
import { HomeFilled, UpSquareFilled, ShopFilled } from "@ant-design/icons";
import { NavLink } from "react-router";

type MenuItem = Required<MenuProps>["items"][number];

export const getDashboardMenuItems = (
  role: "manager" | "admin",
): MenuItem[] => {
  return [
    {
      key: "/",
      icon: <HomeFilled />,
      label: <NavLink to="/">Home</NavLink>,
    },
    ...(role === "admin"
      ? [
          {
            key: "/users",
            icon: <UpSquareFilled />,
            label: <NavLink to="/users?page=1&limit=3">Users</NavLink>,
          },
          {
            key: "/restaurants",
            icon: <ShopFilled />,
            label: <NavLink to="/restaurants">Restaurants</NavLink>,
          },
        ]
      : []),
  ];
};
