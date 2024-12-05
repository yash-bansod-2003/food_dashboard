import { Routes, Route } from "react-router";
import HomePage from "./pages/home";
import LoginPage from "./pages/auth/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
