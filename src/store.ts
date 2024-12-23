import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "@/types";

interface AuthenticationStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthenticationStore = create(
  devtools<AuthenticationStore>((set) => ({
    user: null,
    setUser: (user: User) => set(() => ({ user })),
    logout: () => set({ user: null }),
  })),
);
