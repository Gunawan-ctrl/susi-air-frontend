<template>
  <div>
    <!-- Desktop Separator -->
    <div
      class="max-w-7xl xl:max-w-[90rem] mx-auto px-4 sm:px-6 hidden sm:block"
    >
      <USeparator icon="i-heroicons-paper-airplane" class="opacity-50" />
    </div>

    <!-- Desktop Footer Container -->
    <UFooter
      class="hidden sm:block"
      :ui="{ container: 'max-w-7xl xl:max-w-[90rem] mx-auto px-4 sm:px-6' }"
    >
      <template #left>
        <p class="text-xs font-medium text-slate-400">
          Susi Air Operations Crew Portal • © {{ currentYear }}
        </p>
      </template>
      <template #right>
        <div
          class="text-[10px] font-mono font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded"
        >
          v1.0.0
        </div>
      </template>
    </UFooter>
  </div>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>
