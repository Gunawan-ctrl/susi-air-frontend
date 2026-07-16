<template>
  <div class="py-6 space-y-8">
    <!-- SECTION 1: 4 Progress Rings (Grid) -->
    <div>
      <h3 class="mb-4 text-xl font-bold text-slate-900 dark:text-white">
        Hours to Limit
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="(item, key) in summary"
          :key="key"
          class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between shadow-sm"
        >
          <!-- Informasi Teks -->
          <div class="space-y-1">
            <p
              class="text-sm font-medium text-slate-500 dark:text-slate-400 capitalize"
            >
              {{ key }}
            </p>
            <p class="text-2xl font-bold text-slate-900 dark:text-white">
              {{ item.current.toFixed(1) }}h
            </p>
            <p class="text-xs text-slate-400">Limit: {{ item.limit }}h</p>
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
                <div class="text-xs text-slate-400 animate-pulse">
                  Loading...
                </div>
              </template>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION 2: Trend Line Chart (Full Width) -->
    <div
      class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-sm"
    >
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h4 class="text-lg font-bold text-slate-900 dark:text-white">
            Flight Hours Trend Chart
          </h4>
          <p class="text-xs text-slate-400">
            Visualisasi akumulasi jam terbang terhadap batas operasional
          </p>
        </div>

        <!-- Filter Rentang Waktu -->
        <div
          class="inline-flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-700"
        >
          <button
            v-for="t in toggles"
            :key="t"
            class="px-3 py-1.5 text-xs font-semibold rounded-md transition-all uppercase"
            :class="
              currentToggle === t
                ? 'bg-slate-900 text-white dark:bg-slate-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
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
              class="h-[320px] flex items-center justify-center text-slate-400"
            >
              Memuat Grafik Tren...
            </div>
          </template>
        </ClientOnly>
      </div>
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

// 1. Ambil data ringkasan untuk Radial Charts
const summary = computed(() => flightStore.getSummary(today));

// Options Dinamis untuk Radial Chart
const getRadialOptions = (label: string, percentage: number) => {
  let trackColor = "#10B981"; // Hijau aman
  if (percentage >= 95)
    trackColor = "#EF4444"; // Merah overlimit
  else if (percentage >= 85) trackColor = "#F59E0B"; // Jingga warning

  return {
    chart: {
      type: "radialBar",
      sparkline: { enabled: true },
    },
    colors: [trackColor],
    plotOptions: {
      radialBar: {
        hollow: { size: "60%" },
        track: { background: "#F1F5F9" },
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

// 2. Ambil data tren dari Store
const chartData = computed(() =>
  flightStore.getChartData(currentToggle.value, today),
);

// Mapping data ke format Series ApexChart
const lineSeries = computed(() => [
  {
    name: "Jam Terbang",
    data: chartData.value?.values || [], // Mengambil array values langsung dari store
  },
]);

// Opsi konfigurasi Line Chart yang disesuaikan dengan data Store & UI Landing Page
const lineOptions = computed(() => {
  const limitValue = chartData.value?.limit || 0;
  const maxAxisValue = chartData.value?.max;

  return {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#1E3A8A"], // Navy khas Susi Air
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 4,
      colors: ["#FFFFFF"],
      strokeColors: "#1E3A8A",
      strokeWidth: 2,
    },
    grid: {
      borderColor: "#E2E8F0",
      strokeDashArray: 4,
    },
    // Garis Batas/Limit Operasional (Fitur baru agar sesuai desain UI)
    annotations: {
      yaxis: [
        {
          y: limitValue,
          borderColor: "#EF4444",
          strokeDashArray: 5,
          label: {
            borderColor: "#EF4444",
            style: {
              color: "#FFF",
              background: "#EF4444",
              fontSize: "10px",
              fontWeight: "700",
            },
            text: `BATAS LIMIT: ${limitValue}h`,
          },
        },
      ],
    },
    xaxis: {
      categories: chartData.value?.dates || [], // Mengambil array dates dari store
      labels: {
        style: { colors: "#94A3B8", fontSize: "10px" },
        // Mempercantik format tanggal agar tidak terlalu panjang di mobile
        formatter: (value: string) => {
          if (!value) return "";
          const parts = value.split("-");
          return parts.length === 3 ? `${parts[2]}/${parts[1]}` : value;
        },
      },
    },
    yaxis: {
      max: maxAxisValue, // Menggunakan limit maksimal dari store agar grafik proporsional
      labels: {
        style: { colors: "#94A3B8" },
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
