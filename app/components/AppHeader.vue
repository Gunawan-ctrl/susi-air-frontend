<template>
  <UHeader
    :ui="{ container: 'max-w-7xl xl:max-w-[90rem] mx-auto px-4 sm:px-6' }"
  >
    <template #left>
      <NuxtLink
        to="https://susiair.com/"
        target="_blank"
        class="flex items-center gap-2 group"
      >
        <img
          src="../assets/images/susi-air-logo.png"
          alt="Susi Air Logo"
          width="90"
        />
      </NuxtLink>
    </template>

    <template #right>
      <UColorModeButton />

      <!-- Notification Bell -->
      <div class="relative inline-flex">
        <UButton
          icon="i-heroicons-bell"
          variant="ghost"
          color="neutral"
          aria-label="Notifications"
        />
        <span class="absolute top-1 right-1 flex h-2 w-2">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
          ></span>
          <span
            class="relative inline-flex rounded-full h-2 w-2 bg-red-500"
          ></span>
        </span>
      </div>

      <!-- User Profile Avatar -->
      <div
        class="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-700"
      >
        <div class="hidden md:block text-right">
          <p
            class="text-xs font-bold text-slate-700 dark:text-slate-200 line-clamp-1 capitalize"
          >
            {{ flightStore.pilot?.name }}
          </p>
          <p class="text-[10px] text-slate-400 font-medium font-mono uppercase">
            Active Crew
          </p>
        </div>

        <UAvatar
          :alt="flightStore.pilot?.name"
          size="md"
          class="ring-2 ring-slate-100 dark:ring-slate-800 font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 uppercase"
          loading="lazy"
        />
      </div>
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import { useFlightHoursStore } from "~/stores/flightHoursStore";

const flightStore = useFlightHoursStore();
</script>
