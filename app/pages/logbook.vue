<template>
  <div class="py-6 space-y-6">
    <CommonHeadingTitle title="Logbook" icon="i-lucide-book-open" />
    <div class="grid grid-cols-2 gap-3 mb-4">
      <div
        class="bg-brand-card dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <p class="text-label text-slate-400">Total Flights</p>
        <p class="number-xl text-brand-navy dark:text-white">
          {{ logbookStore.getTotalFlights }}
        </p>
      </div>
      <div
        class="bg-brand-card dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <p class="text-label text-slate-400">Total Hours</p>
        <p class="number-xl text-brand-navy dark:text-white">
          {{ logbookStore.getTotalFlightHours.toFixed(1) }}
          <span class="text-sm font-normal text-slate-400 ml-0.5">h</span>
        </p>
      </div>
    </div>

    <!-- Filter & Search -->
    <div class="flex flex-col sm:flex-row gap-3 mb-4">
      <!-- Filter Tabs -->
      <div
        class="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg flex-1"
      >
        <button
          v-for="tab in filterTabs"
          :key="tab.value"
          @click="logbookStore.setFilter(tab.value)"
          class="flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all"
          :class="
            logbookStore.filter === tab.value
              ? 'bg-brand-card dark:bg-slate-700 text-brand-navy dark:text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          "
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Search -->
      <UInput
        v-model="searchQuery"
        placeholder="Cari rute, pesawat..."
        icon="i-lucide-search"
        size="sm"
        class="w-full sm:w-48"
        @update:model-value="logbookStore.setSearch"
      />
    </div>

    <!-- Loading State -->
    <div v-if="logbookStore.isLoading" class="space-y-3">
      <USkeleton v-for="i in 3" :key="i" class="h-24 w-full rounded-xl" />
    </div>

    <!-- Empty State -->
    <div
      v-else-if="!logbookStore.filteredEntries.length"
      class="text-center py-12"
    >
      <UIcon name="i-lucide-inbox" class="w-12 h-12 text-slate-300 mx-auto" />
      <p class="text-slate-400 mt-3">Tidak ada logbook yang ditemukan</p>
    </div>

    <!-- Logbook List -->
    <div v-else class="space-y-3">
      <LogbookItem
        v-for="entry in logbookStore.filteredEntries"
        :key="entry.id"
        :entry="entry"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLogbookStore } from "~/stores/logbookStore";
import auth from "../middleware/auth.global";

definePageMeta({
  middleware: [auth],
});

const logbookStore = useLogbookStore();
const searchQuery = ref("");

type FilterStatus = "all" | "completed" | "pending" | "cancelled";

const filterTabs: { label: string; value: FilterStatus }[] = [
  { label: "Semua", value: "all" },
  { label: "Selesai", value: "completed" },
  { label: "Pending", value: "pending" },
  { label: "Batal", value: "cancelled" },
];
onMounted(() => {
  if (!logbookStore.entries.length) {
    logbookStore.fetchEntries();
  }
});

// Watch search query
watch(searchQuery, (value) => {
  logbookStore.setSearch(value);
});
</script>
