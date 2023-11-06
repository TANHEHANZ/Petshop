import { create } from "zustand";
export const useUser = create((set) => {
  return {
    user: JSON.parse(localStorage.getItem("user")) || null,
    setUser: (user) => {
      localStorage.setItem("user", JSON.stringify(user));
      set((old) => ({ ...old, user }));
    },
    logout: () => {
      localStorage.removeItem("user");
      set((old) => ({ ...old, user: null }));
    },
  };
});
