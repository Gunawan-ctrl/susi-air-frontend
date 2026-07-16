<template>
  <div class="max-w-lg">
    <div class="flex items-center gap-2 mb-4">
      <UIcon :name="icon" class="w-6 h-6 text-brand-chart" />
      <h1 class="text-xl font-bold text-brand-navy dark:text-white">
        {{ title }}
      </h1>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string;
  icon: string;
}>();
</script>
