<template>
  <div class="py-4 space-y-4">
    <!-- Judul Modul -->
    <h3 class="text-lg font-bold text-slate-900 dark:text-white">
      Upcoming Flight
    </h3>

    <!-- Single Unified Card (Gaya Landing Page) -->
    <div
      class="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl border border-slate-700 shadow-xl overflow-hidden p-6 relative group"
    >
      <!-- Ornamen Dekoratif Latar Belakang Khas Penerbangan -->
      <div
        class="absolute -right-10 -bottom-10 text-slate-700/20 pointer-events-none transform group-hover:scale-110 transition-transform duration-500"
      >
        <svg
          class="w-64 h-64"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L6 12Zm0 0h7.5"
          />
        </svg>
      </div>

      <!-- Konten Utama -->
      <div class="relative z-10 space-y-6">
        <!-- Baris Atas: Detail Waktu & Tanggal -->
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/50 pb-4"
        >
          <div class="flex items-center gap-2.5">
            <span class="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
              <svg
                class="w-4 h-4 transform rotate-90"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L14 19v-5.5l8 2.5z"
                />
              </svg>
            </span>
            <div>
              <p
                class="text-xs text-slate-400 font-medium uppercase tracking-wider"
              >
                Tanggal Keberangkatan
              </p>
              <p class="text-lg font-bold text-slate-100">
                {{ dayjs(flight.date).locale("en").format("DD MMM YYYY") }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2.5 sm:text-right">
            <div class="hidden sm:block">
              <p
                class="text-xs text-slate-400 font-medium uppercase tracking-wider"
              >
                Jadwal Blok (UTC/LT)
              </p>
              <p class="text-lg font-bold text-emerald-400 font-mono">
                {{ flight.time }}
              </p>
            </div>
            <!-- Tampilan Mobile Waktu -->
            <div class="sm:hidden flex flex-col">
              <p
                class="text-xs text-slate-400 font-medium uppercase tracking-wider"
              >
                Jadwal Blok
              </p>
              <p class="text-base font-bold text-emerald-400 font-mono">
                {{ flight.time }}
              </p>
            </div>
          </div>
        </div>

        <!-- Baris Bawah: Jalur Rute Penerbangan (Flight Path Visual) -->
        <div class="flex items-center justify-between gap-4 py-2">
          <!-- Bandara Asal -->
          <div class="space-y-1 max-w-[40%]">
            <span
              class="text-3xl sm:text-4xl font-black tracking-tight text-white block"
              >{{ flight.departure }}</span
            >
            <span class="text-xs sm:text-sm text-slate-400 block truncate">{{
              flight.departureCity
            }}</span>
          </div>

          <!-- Indikator Jalur Terbang / Ikon Pesawat -->
          <div class="flex-1 flex items-center justify-center relative px-2">
            <div
              class="w-full border-t-2 border-dashed border-slate-600 absolute"
            ></div>
            <div
              class="bg-slate-800 p-2 rounded-full border border-slate-600 relative z-10 text-blue-400 group-hover:text-white transition-colors"
            >
              <svg
                class="w-4 h-4 transform rotate-90"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L14 19v-5.5l8 2.5z"
                />
              </svg>
            </div>
          </div>

          <!-- Bandara Tujuan -->
          <div class="space-y-1 text-right max-w-[40%]">
            <span
              class="text-3xl sm:text-4xl font-black tracking-tight text-white block"
              >{{ flight.arrival }}</span
            >
            <span class="text-xs sm:text-sm text-slate-400 block truncate">{{
              flight.arrivalCity
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDashboardStore } from "~/stores/dashboardStore";
import dayjs from "dayjs";

const dashboardStore = useDashboardStore();
const flight = computed(() => dashboardStore.upcomingFlight);
</script>
