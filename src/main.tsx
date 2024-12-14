import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import "./index.css";
import App from "./App.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#F65F42",
              colorLink: "#F65F42",
            },
          }}
        >
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
