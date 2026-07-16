<template>
  <nav
    class="sm:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 py-2 z-50 shadow-lg flex items-center justify-around"
  >
    <NuxtLink
      v-for="item in navItems"
      :key="item.label"
      :to="item.to"
      class="flex flex-col items-center gap-1 py-1 px-3 text-slate-500 dark:text-slate-400 transition-colors"
      active-class="text-blue-600 dark:text-blue-400 font-bold"
    >
      <UIcon :name="item.icon" class="w-5 h-5" />
      <span class="text-[10px] tracking-wide">{{ item.label }}</span>
    </NuxtLink>
  </nav>
</template>

<script setup>
const navItems = [
  { label: "Home", icon: "i-heroicons-home", to: "/" },
  { label: "Schedule", icon: "i-heroicons-calendar-days", to: "/schedule" },
  { label: "Logbook", icon: "i-heroicons-document-text", to: "/logbook" },
  { label: "Documents", icon: "i-heroicons-shield-check", to: "/documents" },
  { label: "More", icon: "i-heroicons-ellipsis-horizontal", to: "/more" },
];
</script>
