import { createBrowserRouter } from "react-router";
import { Button } from "@/components/ui/button";

import LoginPage from "@/pages/auth/login.tsx";
import UsersDashboardPage from "@/pages/dashboard/users";
import RestaurantsDashboardPage from "@/pages/dashboard/restaurants";

import DashboardLayout from "./layouts/dashboard-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>
    ),
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <div>Welcome to the Dashboard</div>,
      },
      {
        path: "/dashboard/users",
        element: <UsersDashboardPage />,
      },
      {
        path: "/dashboard/restaurants",
        element: <RestaurantsDashboardPage />,
      },
    ],
  },
]);
