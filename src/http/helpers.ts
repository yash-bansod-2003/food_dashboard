import { api } from "@/http/api";
import { MutationFunction } from "react-query";

export const login = async (credentials: MutationFunction<unknown, string>) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const profile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
