import React from "react";
import { Outlet } from "react-router";
import { useQuery } from "react-query";
import { profile } from "@/http/helpers";
import { useAuthenticationStore } from "@/store";

const RootLayout: React.FC = () => {
  const { data } = useQuery("profile", profile);
  const { setUser } = useAuthenticationStore();

  React.useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return <Outlet />;
};

export default RootLayout;
