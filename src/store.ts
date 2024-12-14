import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface User {
  firstname: string;
  lastname: string;
  email: string;
  role: "admin" | "manager";
  created_at: string;
  updated_at: string;
}

interface AuthenticationState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthenticationStore = create(
  devtools<AuthenticationState>((set) => ({
    user: null,
    setUser: (user: User) => set({ user }),
    logout: () => set({ user: null }),
  })),
);
