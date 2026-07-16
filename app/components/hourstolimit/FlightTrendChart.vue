<template>
  <div
    class="bg-brand-card p-6 rounded-xl border border-slate-200 space-y-4 shadow-sm"
  >
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h4 class="text-lg font-bold text-brand-navy">
          Flight Hours Trend Chart
        </h4>
        <p class="text-xs text-brand-secondary">
          Visualisasi akumulasi jam terbang terhadap batas operasional
        </p>
      </div>

      <!-- Filter Rentang Waktu -->
      <div
        class="inline-flex bg-brand-bg p-1 rounded-lg border border-slate-200"
      >
        <button
          v-for="t in toggles"
          :key="t"
          class="px-3 py-1.5 text-xs font-semibold rounded-md transition-all uppercase"
          :class="
            currentToggle === t
              ? 'bg-brand-navy text-white shadow-sm'
              : 'text-brand-secondary hover:text-brand-navy'
          "
          @click="currentToggle = t"
        >
          {{ t }}
        </button>
      </div>
    </div>

    <!-- Main Line Chart -->
    <div class="w-full min-h-[320px]">
      <ClientOnly>
        <VueApexChart
          type="line"
          height="320"
          :series="lineSeries"
          :options="lineOptions"
        />
        <template #fallback>
          <div
            class="h-[320px] flex items-center justify-center text-brand-secondary"
          >
            Memuat Grafik Tren...
          </div>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useFlightHoursStore } from "~/stores/flightHoursStore";
import VueApexChart from "vue3-apexcharts";

const flightStore = useFlightHoursStore();
const today = "2026-05-31";

const toggles = ["1w", "1m", "3m", "6m", "1y"] as const;
const currentToggle = ref<"1w" | "1m" | "3m" | "6m" | "1y">("1w");

const chartData = computed(() =>
  flightStore.getChartData(currentToggle.value, today),
);

const lineSeries = computed(() => [
  {
    name: "Jam Terbang",
    data: chartData.value?.values || [],
  },
]);

const lineOptions = computed(() => {
  const limitValue = chartData.value?.limit || 0;
  const maxAxisValue = chartData.value?.max;

  return {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#0E2138"], // brand-navy
    stroke: { curve: "smooth", width: 3 },
    markers: {
      size: 4,
      colors: ["#FFFFFF"],
      strokeColors: "#0E2138",
      strokeWidth: 2,
    },
    grid: {
      borderColor: "#F5F6F8",
      strokeDashArray: 4,
    },
    annotations: {
      yaxis: [
        {
          y: limitValue,
          borderColor: "#E63757", // brand-danger
          strokeDashArray: 5,
          label: {
            borderColor: "#E63757",
            style: {
              color: "#FFF",
              background: "#E63757",
              fontSize: "10px",
              fontWeight: "700",
            },
            text: `BATAS LIMIT: ${limitValue}h`,
          },
        },
      ],
    },
    xaxis: {
      categories: chartData.value?.dates || [],
      labels: {
        style: { colors: "#6B7280", fontSize: "10px" },
        formatter: (value: string) => {
          if (!value) return "";
          const parts = value.split("-");
          return parts.length === 3 ? `${parts[2]}/${parts[1]}` : value;
        },
      },
    },
    yaxis: {
      max: maxAxisValue,
      labels: {
        style: { colors: "#6B7280" },
        formatter: (val: number) => `${val.toFixed(0)}h`,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: { formatter: (val: number) => `${val.toFixed(1)} Jam` },
    },
  };
});
</script>
