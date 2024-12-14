import * as React from "react";
import { Outlet } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/http/client";
import { useAuthenticationStore } from "@/store";

const profile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

function RootLayout() {
  const { setUser } = useAuthenticationStore();

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: profile,
  });

  React.useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <Outlet />;
}

export default RootLayout;
