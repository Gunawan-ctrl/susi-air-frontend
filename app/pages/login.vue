<template>
  <div
    class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 relative overflow-hidden"
  >
    <!-- Ornamen Abstrak Latar Belakang (Jalur Penerbangan) -->
    <div class="absolute inset-0 opacity-5 pointer-events-none dark:opacity-10">
      <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <line
          x1="-100"
          y1="100%"
          x2="100%"
          y2="-100"
          stroke="currentColor"
          stroke-width="2"
          stroke-dasharray="10 15"
        />
        <line
          x1="0"
          y1="80%"
          x2="120%"
          y2="0"
          stroke="currentColor"
          stroke-width="4"
        />
      </svg>
    </div>

    <!-- Kotak Login Utama (Card) -->
    <div
      class="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl relative z-10 space-y-6"
    >
      <!-- Logo & Header Section -->
      <div class="text-center space-y-2">
        <div class="inline-flex rounded-xl">
          <img
            src="../assets/images/susi-air-logo.png"
            alt="Susi Air Logo"
            srcset=""
            width="90"
          />
        </div>
        <p class="text-xs text-slate-400 font-medium">
          Crew Portal Companion v2.4
        </p>
      </div>

      <!-- Form Input Section -->
      <UForm :state="form" @submit="handleLogin" class="space-y-4">
        <!-- Input Username -->
        <UFormField label="Username" name="username">
          <UInput
            v-model="form.username"
            placeholder="Masukkan username Anda"
            icon="i-heroicons-user"
            size="md"
            required
            class="w-full"
          />
        </UFormField>

        <!-- Input Password -->
        <UFormField label="Password" name="password">
          <UInput
            v-model="form.password"
            type="password"
            required
            placeholder="••••••••"
            icon="i-heroicons-lock-closed"
            size="md"
            class="w-full"
          />
        </UFormField>

        <!-- Button Sign In -->
        <div class="pt-2">
          <UButton
            type="submit"
            block
            size="md"
            color="primary"
            class="font-semibold shadow-sm shadow-blue-500/10"
          >
            Sign In to Dashboard
          </UButton>
        </div>
      </UForm>

      <!-- Footer Help Link -->
      <div
        class="pt-4 border-t border-slate-100 dark:border-slate-800 text-center"
      >
        <a
          href="#"
          class="text-xs font-semibold text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1"
        >
          <svg
            class="w-3.5 h-3.5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
            />
          </svg>
          Need Help? Contact CRD Support
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~/stores/authStore";
definePageMeta({
  layout: "auth",
});

const form = ref({ username: "", password: "" });
const authStore = useAuthStore();

const handleLogin = () => {
  authStore.login(form.value.username, form.value.password);
};
</script>
