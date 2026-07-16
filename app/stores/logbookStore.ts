// stores/logbookStore.ts
import { defineStore } from "pinia";
import mockLogbookData from "~/assets/data/mock-logbook.json";

export interface LogEntry {
  id: string;
  date: string;
  route: string;
  departure: string;
  arrival: string;
  flightTime: number;
  aircraft: string;
  dutyType: string;
  status: "completed" | "pending" | "cancelled";
  notes?: string;
}

export const useLogbookStore = defineStore("logbook", () => {
  const entries = ref<LogEntry[]>([]);
  const isLoading = ref(false);
  const filter = ref<"all" | "completed" | "pending" | "cancelled">("all");
  const searchQuery = ref("");

  const fetchEntries = async () => {
    isLoading.value = true;
    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Gunakan data dari JSON
      entries.value = mockLogbookData.logbook as LogEntry[];
    } catch (error) {
      console.error("Failed to fetch logbook entries:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const filteredEntries = computed(() => {
    let result = entries.value;

    if (filter.value !== "all") {
      result = result.filter((e) => e.status === filter.value);
    }

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(
        (e) =>
          e.route.toLowerCase().includes(query) ||
          e.aircraft.toLowerCase().includes(query) ||
          e.dutyType.toLowerCase().includes(query),
      );
    }

    return [...result].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  });

  const setFilter = (status: "all" | "completed" | "pending" | "cancelled") => {
    filter.value = status;
  };

  const setSearch = (query: string) => {
    searchQuery.value = query;
  };

  const getTotalFlightHours = computed(() => {
    return entries.value
      .filter((e) => e.status === "completed")
      .reduce((total, e) => total + e.flightTime, 0);
  });

  const getTotalFlights = computed(() => {
    return entries.value.filter((e) => e.status === "completed").length;
  });

  return {
    entries,
    isLoading,
    filter,
    searchQuery,
    filteredEntries,
    fetchEntries,
    setFilter,
    setSearch,
    getTotalFlightHours,
    getTotalFlights,
  };
});
