<!-- components/logbook/LogbookItem.vue -->
<template>
  <div
    class="bg-brand-card dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-4 hover:shadow-md transition-all cursor-pointer"
  >
    <div class="flex items-start justify-between">
      <!-- Kiri: Info Penerbangan -->
      <div class="flex-1">
        <!-- Route -->
        <div class="flex items-center gap-2">
          <span class="font-semibold text-brand-navy dark:text-white">
            {{ entry.route }}
          </span>
          <UBadge
            :color="getStatusColor(entry.status)"
            variant="soft"
            size="xs"
          >
            {{ getStatusLabel(entry.status) }}
          </UBadge>
        </div>

        <!-- Date & Time -->
        <div
          class="flex items-center gap-3 mt-1 text-sm text-slate-500 dark:text-slate-400"
        >
          <span class="flex items-center gap-1">
            <UIcon name="i-lucide-calendar" class="w-3.5 h-3.5" />
            {{ formatDate(entry.date) }}
          </span>
          <span class="flex items-center gap-1">
            <UIcon name="i-lucide-clock" class="w-3.5 h-3.5" />
            {{ entry.departure }} – {{ entry.arrival }}
          </span>
        </div>

        <!-- Aircraft & Duty Type -->
        <div class="flex items-center gap-3 mt-1.5 text-xs">
          <span
            class="flex items-center gap-1 text-slate-500 dark:text-slate-400"
          >
            <UIcon name="i-lucide-plane" class="w-3 h-3" />
            {{ entry.aircraft }}
          </span>
          <span
            class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono"
          >
            {{ entry.dutyType }}
          </span>
          <span class="text-slate-500 dark:text-slate-400">
            {{ entry.flightTime }}h
          </span>
        </div>

        <!-- Notes (jika ada) -->
        <p v-if="entry.notes" class="text-xs text-slate-400 mt-1.5 italic">
          {{ entry.notes }}
        </p>
      </div>

      <!-- Kanan: Ikon Status -->
      <div class="ml-3 shrink-0">
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center"
          :class="{
            'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400':
              entry.status === 'completed',
            'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400':
              entry.status === 'pending',
            'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400':
              entry.status === 'cancelled',
          }"
        >
          <UIcon :name="getStatusIcon(entry.status)" class="w-4 h-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LogEntry } from "~/stores/logbookStore";
import dayjs from "dayjs";

defineProps<{
  entry: LogEntry;
}>();

const getStatusColor = (status: LogEntry["status"]) => {
  switch (status) {
    case "completed":
      return "green";
    case "pending":
      return "warning";
    case "cancelled":
      return "error";
    default:
      return "gray";
  }
};

const getStatusLabel = (status: LogEntry["status"]) => {
  switch (status) {
    case "completed":
      return "Selesai";
    case "pending":
      return "Pending";
    case "cancelled":
      return "Batal";
    default:
      return "Unknown";
  }
};

const getStatusIcon = (status: LogEntry["status"]) => {
  switch (status) {
    case "completed":
      return "i-lucide-check-circle";
    case "pending":
      return "i-lucide-clock";
    case "cancelled":
      return "i-lucide-x-circle";
    default:
      return "i-lucide-circle";
  }
};

const formatDate = (date: string) => {
  return dayjs(date).format("DD MMM YYYY");
};
</script>
