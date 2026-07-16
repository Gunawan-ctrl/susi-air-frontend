import { defineStore } from "pinia";
import { useFlightHoursStore } from "../stores/flightHoursStore";

export const useAuthStore = defineStore("auth", () => {
  const flightHours = useFlightHoursStore();
  const isAuthenticated = ref(false);
  const user = ref({ username: "", email: "" });

  const login = (username: string, password: string) => {
    if (username && password) {
      flightHours.pilot.name = username;
      isAuthenticated.value = true;
      navigateTo("/");
    }
  };

  const logout = () => {
    isAuthenticated.value = false;
    navigateTo("/login");
  };

  return { isAuthenticated, user, login, logout };
});
