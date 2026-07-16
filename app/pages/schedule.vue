<template>
  <div class="py-6 space-py-6">
    <!-- Header Halaman -->
    <CommonHeadingTitle title="Schedule" icon="i-heroicons-calendar" />
    <div
      class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex md:inline-flex items-center justify-center gap-2 dark:text-white p-1.5 rounded-lg border border-slate-200"
    >
      <button @click="prevMonth" class="p-1.5 rounded-md transition-colors">
        <UIcon name="i-heroicons-chevron-left" class="w-5 h-5" />
      </button>
      <span class="text-sm font-bold text-center capitalize font-mono">
        {{ formatMonthLabel }}
      </span>
      <button
        @click="nextMonth"
        class="p-1.5 hover:bg-brand-bg rounded-md transition-colors"
      >
        <UIcon name="i-heroicons-chevron-right" class="w-5 h-5" />
      </button>
    </div>

    <!-- Layout Grid Kalender & Detail Hari -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- SISI KIRI: Kalender Bulanan (Mengambil 2 Kolom di Desktop) -->
      <div
        class="lg:col-span-2 p-4 rounded-xl border border-slate-200 shadow-sm space-y-4"
      >
        <!-- Header Hari Kalender -->
        <div
          class="grid grid-cols-7 gap-1 text-center border-b border-slate-100 pb-2"
        >
          <span
            v-for="day in weekDays"
            :key="day"
            class="text-xs font-bold text-brand-secondary uppercase font-mono"
          >
            {{ day }}
          </span>
        </div>

        <!-- Grid Angka Tanggal Kalender -->
        <div class="grid grid-cols-7 gap-1">
          <!-- Placeholder Hari Kosong Awal Bulan -->
          <div
            v-for="blank in blankDays"
            :key="`blank-${blank}`"
            class="aspect-square bg-slate-50/50 rounded-lg"
          ></div>

          <!-- Hari Aktif Bulan Ini -->
          <button
            v-for="day in daysInMonth"
            :key="day"
            @click="selectDay(day)"
            class="aspect-square p-1 rounded-lg border transition-all flex flex-col justify-between relative group"
            :class="[
              isSelected(day)
                ? 'border-brand-navy ring-1 ring-brand-navy'
                : 'border-slate-100 hover:border-slate-300',
              isToday(day) ? 'bg-brand-navy/5' : 'bg-white',
            ]"
          >
            <!-- Angka Tanggal & Penanda Hari Ini -->
            <span
              class="text-xs font-bold font-mono"
              :class="isToday(day) ? 'text-brand-red' : 'text-brand-navy'"
            >
              {{ day }}
            </span>

            <!-- Status Badge Bulatan (Schedule vs Logbook) -->
            <div v-if="getDaySchedule(day)" class="absolute top-1 right-1">
              <!-- Jika semua schedule sudah dicatat di logbook, tampilkan Tick hijau -->
              <UIcon
                v-if="
                  getDaySchedule(day)?.count_logbooks ===
                  getDaySchedule(day)?.count_schedules
                "
                name="i-heroicons-check-circle-solid"
                class="w-4 h-4 text-brand-success"
              />
              <!-- Jika belum lengkap, tampilkan Badge Angka -->
              <span
                v-else
                class="w-4 h-4 flex items-center justify-center text-[9px] font-black text-white rounded-full bg-brand-red font-mono"
              >
                {{ getDaySchedule(day)?.count_schedules }}
              </span>
            </div>

            <!-- Kode Base Lapangan (e.g., MKW, CJN) di Bagian Bawah -->
            <div v-if="getDaySchedule(day)" class="w-full text-center">
              <span
                class="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded text-white font-mono uppercase"
                :style="{ backgroundColor: getDaySchedule(day)?.base_color }"
              >
                {{ getDaySchedule(day)?.base_name }}
              </span>
            </div>
          </button>
        </div>

        <!-- Legend Petunjuk Warna Tugas -->
        <div class="border-t border-slate-100 pt-4">
          <p class="text-xs font-bold text-brand-navy mb-2 font-mono uppercase">
            Legend & Colors
          </p>
          <div class="flex flex-wrap gap-3">
            <div
              v-for="item in legend"
              :key="item.code"
              class="flex items-center gap-1.5"
            >
              <span
                class="w-3 h-3 rounded-sm border border-black/10"
                :style="{ backgroundColor: item.color }"
              ></span>
              <span class="text-[10px] font-bold font-mono text-brand-secondary"
                >{{ item.code }}: {{ item.label }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- SISI KANAN: Detail Roster Pada Hari Yang Dipilih -->
      <div class="space-y-4">
        <div
          class="bg-brand-card p-5 rounded-xl border border-slate-200 shadow-sm space-y-4"
        >
          <div class="border-b border-slate-100 pb-3">
            <h3 class="text-sm font-bold text-brand-navy font-mono uppercase">
              Duty Details
            </h3>
            <p class="text-xs text-brand-secondary font-mono">
              {{ formatSelectedDateLabel }}
            </p>
          </div>

          <!-- Jika Ada Tugas Pada Hari Ini -->
          <div v-if="selectedDaySchedule" class="space-y-4">
            <!-- Tipe Tugas Utama -->
            <div
              class="flex items-center justify-between p-3 bg-brand-bg rounded-lg border border-slate-100"
            >
              <div>
                <p class="text-xs text-brand-secondary font-mono">TIPE TUGAS</p>
                <p class="text-sm font-bold text-brand-navy">
                  {{ getDutyLabel(selectedDaySchedule.duty_type) }}
                </p>
              </div>
              <span
                class="px-2.5 py-1 text-xs font-mono font-bold text-white rounded-md"
                :style="{ backgroundColor: selectedDaySchedule.base_color }"
              >
                {{ selectedDaySchedule.base_name }}
              </span>
            </div>

            <!-- Manifes Statistik Internal -->
            <div class="grid grid-cols-2 gap-2 text-center">
              <div
                class="bg-brand-bg/50 p-2.5 rounded-lg border border-slate-100"
              >
                <p class="text-[10px] text-brand-secondary font-mono">
                  SCHEDULED
                </p>
                <p class="text-lg font-bold text-brand-navy font-mono">
                  {{ selectedDaySchedule.count_schedules }}h
                </p>
              </div>
              <div
                class="bg-brand-bg/50 p-2.5 rounded-lg border border-slate-100"
              >
                <p class="text-[10px] text-brand-secondary font-mono font-bold">
                  LOGBOOKS
                </p>
                <p
                  class="text-lg font-bold font-mono"
                  :class="
                    selectedDaySchedule.count_logbooks ===
                    selectedDaySchedule.count_schedules
                      ? 'text-brand-success'
                      : 'text-brand-red'
                  "
                >
                  {{ selectedDaySchedule.count_logbooks }}h
                </p>
              </div>
            </div>

            <!-- Status Dokumen / Verifikasi Administrasi -->
            <div
              class="p-3 rounded-lg border flex items-center justify-between"
              :class="
                selectedDaySchedule.status === 2
                  ? 'bg-emerald-50/50 border-emerald-200 text-brand-success'
                  : 'bg-amber-50/50 border-amber-200 text-brand-warning'
              "
            >
              <div class="flex items-center gap-2">
                <UIcon
                  :name="
                    selectedDaySchedule.status === 2
                      ? 'i-heroicons-check-circle'
                      : 'i-heroicons-clock'
                  "
                  class="w-5 h-5 shrink-0"
                />
                <span class="text-xs font-bold uppercase font-mono">
                  {{
                    selectedDaySchedule.status === 2
                      ? "VERIFIED / COMPLETED"
                      : "PENDING APPROVAL"
                  }}
                </span>
              </div>
            </div>
          </div>

          <!-- Jika Tidak Ada Roster Aktif (Day Off / Standby) -->
          <div v-else class="py-8 text-center space-y-2">
            <UIcon
              name="i-heroicons-calendar"
              class="w-12 h-12 text-brand-secondary/30 mx-auto"
            />
            <p
              class="text-xs font-bold text-brand-secondary font-mono uppercase"
            >
              Tidak Ada Tugas
            </p>
            <p class="text-[11px] text-brand-secondary px-4">
              Hari ini adalah hari bebas tugas atau tidak tercantum dalam roster
              rilis.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import auth from "../middleware/auth.global";
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useScheduleStore } from "~/stores/scheduleStore";
import dayjs from "dayjs";
import "dayjs/locale/id";
definePageMeta({
  middleware: [auth],
});
dayjs.locale("id");

const scheduleStore = useScheduleStore();
const { legend } = storeToRefs(scheduleStore);

// Inisialisasi Tanggal berdasarkan 'today' bawaan mock store Anda
const currentYear = ref(2026);
const currentMonth = ref(4); // Bulan Mei (0-indexed di dayjs)
const selectedDay = ref<number>(15); // Hari default terpilih

const weekDays = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

// Format Label Bulan di Header (e.g., "Mei 2026")
const formatMonthLabel = computed(() => {
  return dayjs()
    .year(currentYear.value)
    .month(currentMonth.value)
    .format("MMMM YYYY");
});

// Logika pembentukan hari di grid kalender
const blankDays = computed(() => {
  const firstDayOfMonth = dayjs()
    .year(currentYear.value)
    .month(currentMonth.value)
    .date(1)
    .day();
  return firstDayOfMonth;
});

const daysInMonth = computed(() => {
  return dayjs()
    .year(currentYear.value)
    .month(currentMonth.value)
    .daysInMonth();
});

// Mendapatkan data roster bulan aktif langsung dari Pinia Store
const monthlySchedules = computed(() => {
  return scheduleStore.getSchedulesForMonth(
    currentYear.value,
    currentMonth.value,
  );
});

// Fungsi memetakan schedule harian pada cell kalender
const getDaySchedule = (day: number) => {
  const dateStr = dayjs()
    .year(currentYear.value)
    .month(currentMonth.value)
    .date(day)
    .format("YYYY-MM-DD");
  return monthlySchedules.value.find((s) => s.duty_date === dateStr);
};

// Handler Pilihan Hari & Detail Roster Kanan
const selectDay = (day: number) => {
  selectedDay.value = day;
};

const isSelected = (day: number) => {
  return selectedDay.value === day;
};

const isToday = (day: number) => {
  const cellDate = dayjs()
    .year(currentYear.value)
    .month(currentMonth.value)
    .date(day)
    .format("YYYY-MM-DD");
  return cellDate === scheduleStore.today;
};

const selectedDaySchedule = computed(() => {
  return getDaySchedule(selectedDay.value);
});

const formatSelectedDateLabel = computed(() => {
  return dayjs()
    .year(currentYear.value)
    .month(currentMonth.value)
    .date(selectedDay.value)
    .format("dddd, DD MMMM YYYY");
});

// Pencocokan label deskripsi duty dari legend store
const getDutyLabel = (code: string) => {
  const item = legend.value.find((l) => l.code === code);
  return item ? item.label : code;
};

// Navigasi Bulan
const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
  selectedDay.value = 1;
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
  selectedDay.value = 1;
};
</script>
