import { createBrowserRouter } from "react-router";
import { Button } from "@/components/ui/button";

import LoginPage from "@/pages/auth/login.tsx";

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
]);
