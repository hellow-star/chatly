import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  signUpError: null,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check-auth");
      set({ authUser: response.data.user });
    } catch (error) {
      set({ authUser: null });
      console.error("Error checking auth:", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (fullName, email, password) => {
    try {
      set({ isSigningUp: true });
      const response = await axiosInstance.post("/auth/signup", {
        fullName,
        email,
        password,
      });
      set({ authUser: response.data });

      toast.success("Signup successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },
}));
