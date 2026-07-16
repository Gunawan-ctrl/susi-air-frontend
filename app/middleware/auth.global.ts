export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  // Jika belum login dan bukan halaman login → redirect ke login
  if (!authStore.isAuthenticated && to.path !== "/login") {
    return navigateTo("/login");
  }

  // Jika sudah login dan mencoba akses login → redirect ke home
  if (authStore.isAuthenticated && to.path === "/login") {
    return navigateTo("/");
  }
});
