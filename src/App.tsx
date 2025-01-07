import { Routes, Route } from "react-router";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/auth/login";
import UsersPage from "@/pages/users";

import RootLayout from "@/layouts/root";
import AuthenticationLayout from "@/layouts/auth";
import DashboardLayout from "@/layouts/dashboard";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<AuthenticationLayout />}>
          <Route path="/auth/login" element={<LoginPage />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
