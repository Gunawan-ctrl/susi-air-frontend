<template>
  <div class="py-6 space-y-4">
    <!-- Header Modul -->
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">
          Latest News & Bulletin
        </h3>
        <p class="text-xs text-slate-400">
          Informasi internal dan pembaruan keselamatan operasional Susi Air
        </p>
      </div>
      <span
        class="hidden sm:inline-flex items-center gap-1 text-xs text-slate-400 font-medium"
      >
        Geser ke Kanan
        <svg
          class="w-3 h-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </span>
    </div>

    <!-- Enhanced Full-Width Carousel Container -->
    <div class="relative w-full">
      <UCarousel
        v-slot="{ item }"
        :items="news"
        :ui="{
          container: 'flex gap-4 ... pb-4 px-1',
          item: 'basis-[280px] sm:basis-[320px] md:basis-[360px]',
        }"
        arrows
        :autoplay="{ delay: 2000 }"
        loop
      >
        <!-- Card Item Box -->
        <div
          class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow group cursor-pointer"
        >
          <!-- Image Section -->
          <div
            class="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-900"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          <!-- Content Section -->
          <div class="p-4 flex flex-col flex-1 justify-between space-y-4">
            <div class="space-y-2">
              <h4
                class="text-base font-bold text-slate-800 dark:text-slate-100 line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
              >
                {{ item.title }}
              </h4>
              <p
                class="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed"
              >
                {{ item.description }}
              </p>
            </div>

            <!-- Footer Card: Aksi Interaktif -->
            <div
              class="pt-3 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400"
            >
              <span>Baca Selengkapnya</span>
              <svg
                class="w-3 h-3 transform group-hover:translate-x-1 transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </UCarousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDashboardStore } from "~/stores/dashboardStore";

const dashboardStore = useDashboardStore();
const { news } = storeToRefs(dashboardStore);
</script>
