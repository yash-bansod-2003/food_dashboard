import { Routes, Route } from "react-router";
import HomePage from "./pages/home";
import LoginPage from "./pages/auth/login";
import RootLayout from "@/layouts/root";
import AuthenticationLayout from "@/layouts/authentication";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<AuthenticationLayout />}>
          <Route path="/auth/login" element={<LoginPage />} />
        </Route>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
