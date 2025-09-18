import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: { name: "john", _id: "123", age: 18 },
  isLoading: false,

  login: () => {
    console.log("login");
  },
  setAuthUser: (user) => set({ authUser: user }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
