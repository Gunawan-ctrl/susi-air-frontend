<template>
  <div>
    <h3 class="mb-4 text-xl font-bold">Hours to Limit</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="(item, key) in summary"
        :key="key"
        class="p-4 rounded-xl border border-slate-200 dark:text-white flex items-center justify-between shadow-sm"
      >
        <!-- Informasi Teks -->
        <div class="space-y-1">
          <p class="text-sm font-medium text-brand-secondary capitalize">
            {{ key }}
          </p>
          <p class="text-2xl font-bold text-brand-navy">
            {{ item.current.toFixed(1) }}h
          </p>
          <p class="text-xs text-brand-secondary">Limit: {{ item.limit }}h</p>
        </div>

        <!-- Radial Progress Ring -->
        <div class="w-24 h-24 flex items-center justify-center">
          <ClientOnly>
            <VueApexChart
              type="radialBar"
              height="120"
              width="120"
              :series="[Math.min((item.current / item.limit) * 100, 100)]"
              :options="
                getRadialOptions(key, (item.current / item.limit) * 100)
              "
            />
            <template #fallback>
              <div class="text-xs text-brand-secondary animate-pulse">
                Loading...
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useFlightHoursStore } from "~/stores/flightHoursStore";
import VueApexChart from "vue3-apexcharts";

const flightStore = useFlightHoursStore();
const today = "2026-05-31";

const summary = computed(() => flightStore.getSummary(today));

// Logika opsi warna dinamis disesuaikan dengan token warna baru
const getRadialOptions = (label: string, percentage: number) => {
  let trackColor = "#1FBF8F"; // brand-success
  if (percentage >= 95)
    trackColor = "#E63757"; // brand-danger
  else if (percentage >= 85) trackColor = "#F59E0B"; // brand-warning

  return {
    chart: {
      type: "radialBar",
      sparkline: { enabled: true },
    },
    colors: [trackColor],
    plotOptions: {
      radialBar: {
        hollow: { size: "60%" },
        track: { background: "#F5F6F8" }, // brand-bg
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 5,
            fontSize: "14px",
            fontWeight: "700",
            formatter: (val: number) => `${val.toFixed(0)}%`,
          },
        },
      },
    },
    stroke: { lineCap: "round" },
  };
};
</script>
