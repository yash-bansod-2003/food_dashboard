import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Profile } from "@/types";

interface AuthState {
  profile: null | Profile;
  setProfile: (profile: Profile | null) => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      profile: null,
      setProfile: (profile: Profile | null) => set({ profile }),
    }),
    {
      name: "auth-storage",
    },
  ),
);

export default useAuthStore;
