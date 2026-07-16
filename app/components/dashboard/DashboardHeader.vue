<template>
  <div class="py-6">
    <!-- Hero Banner -->
    <div
      class="bg-brand-card dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-card flex flex-col md:flex-row md:items-center md:justify-between gap-6 overflow-hidden relative"
    >
      <!-- Kiri: Avatar & Sapaan -->
      <div class="flex items-center gap-4 relative z-10">
        <div
          class="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-xs"
        >
          <svg
            class="w-7 h-7 text-slate-500 dark:text-slate-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>

        <div class="space-y-1">
          <h2
            class="headline-lg font-bold text-brand-navy dark:text-white tracking-tight"
          >
            {{ greetingText }}, {{ flightStore.pilot?.name || "Pilot" }}!
          </h2>
          <p
            class="text-body text-brand-secondary dark:text-slate-400 font-medium"
          >
            Akses Cepat Companion Penerbangan Anda.
          </p>
        </div>
      </div>

      <!-- Kanan: Total Flight Hours -->
      <div
        class="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-4 rounded-xl shrink-0 md:max-w-xs w-full md:w-auto relative z-10"
      >
        <div
          class="p-3 bg-blue-50 dark:bg-blue-950/40 text-brand-chart dark:text-blue-400 rounded-lg"
        >
          <svg
            class="w-6 h-6 transform -rotate-45"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L6 12Zm0 0h7.5"
            />
          </svg>
        </div>
        <div>
          <p
            class="text-label font-semibold text-slate-400 uppercase tracking-wider"
          >
            Total Flight Hours
          </p>
          <p
            class="number-xl text-brand-navy dark:text-white font-mono tracking-tight"
          >
            {{ flightStore.totalFlightHours?.toFixed(1) || "0.0" }}
            <span class="text-sm font-bold text-slate-400 ml-0.5">h</span>
          </p>
        </div>
      </div>

      <!-- Background Subtle Accent -->
      <div
        class="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none hidden md:block"
      >
        <svg
          class="w-full h-full text-brand-navy dark:text-white"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,100 C30,40 70,60 100,0 L100,100 Z"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFlightHoursStore } from "~/stores/flightHoursStore";

const flightStore = useFlightHoursStore();

const greetingText = ref("Selamat Pagi");

onMounted(() => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) greetingText.value = "Selamat Pagi";
  else if (hour >= 11 && hour < 15) greetingText.value = "Selamat Siang";
  else if (hour >= 15 && hour < 18) greetingText.value = "Selamat Sore";
  else greetingText.value = "Selamat Malam";
});
</script>
