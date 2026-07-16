<template>
  <div
    class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm"
  >
    <!-- Header Modul -->
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6"
    >
      <div>
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">
          My Documents Tracker
        </h3>
        <p class="text-xs text-slate-400">
          Status lisensi operasional berdasarkan data per
          {{ formatDate(docStore.today) }}
        </p>
      </div>
      <div
        class="flex items-center gap-1.5 text-xs text-slate-500 font-medium self-start sm:self-center"
      >
        <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
        Sistem Peringatan Dini Aktif
      </div>
    </div>

    <!-- Responsive Table Container -->
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr
            class="border-b border-slate-200 dark:border-slate-700 text-xs font-semibold uppercase text-slate-400 bg-slate-50 dark:bg-slate-900/50"
          >
            <th class="py-3 px-4">Nama Dokumen</th>
            <th class="py-3 px-4">Tanggal Kedaluwarsa</th>
            <th class="py-3 px-4">Status</th>
            <th class="py-3 px-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody
          class="divide-y divide-slate-100 dark:divide-slate-700/50 text-sm"
        >
          <tr
            v-for="doc in documents"
            :key="doc.id"
            class="hover:bg-slate-50/70 dark:hover:bg-slate-700/30 transition-colors"
          >
            <!-- Kolom Nama Dokumen -->
            <td
              class="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-200 flex items-center gap-3"
            >
              <svg
                class="w-4 h-4 text-slate-400 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
              {{ doc.label }}
            </td>

            <!-- Kolom Tanggal Kedaluwarsa -->
            <td
              class="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-mono text-xs"
            >
              {{ formatDate(doc.expiryDate) }}
            </td>

            <!-- Kolom Status -->
            <td class="py-3.5 px-4">
              <UBadge
                :color="badgeConfig(doc).color"
                variant="subtle"
                class="font-semibold text-xs px-2.5 py-0.5 rounded capitalize"
              >
                {{ badgeConfig(doc).label }}
              </UBadge>
            </td>

            <!-- Kolom Aksi -->
            <td class="py-3.5 px-4 text-right">
              <UButton
                :variant="
                  docStore.getDocumentStatus(doc) === 'expired'
                    ? 'solid'
                    : 'ghost'
                "
                :color="
                  docStore.getDocumentStatus(doc) === 'expired'
                    ? 'error'
                    : 'primary'
                "
                size="xs"
                class="font-medium"
              >
                {{
                  docStore.getDocumentStatus(doc) === "expired"
                    ? "Perbarui Segera"
                    : "Lihat Dokumen"
                }}
              </UButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDocumentsStore } from "~/stores/documentsStore";
import type { Document } from "~/types";
import dayjs from "dayjs";

const docStore = useDocumentsStore();

// Memastikan data dokumen tetap reaktif dari store
const documents = computed<Document[]>(() => docStore.documents);

// Penyatuan konfigurasi badge agar lebih efisien dan clean (menghindari duplikasi pemanggilan status)
const badgeConfig = (doc: Document) => {
  const status = docStore.getDocumentStatus(doc);

  switch (status) {
    case "expired":
      return { color: "error" as const, label: "Expired" };
    case "warning":
      return { color: "warning" as const, label: "Soon" };
    case "safe":
    default:
      return { color: "success" as const, label: "Valid" };
  }
};

// Helper untuk merapikan format tanggal agar enak dilihat pilot
const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";
  return dayjs(dateString).locale("en").format("DD MMM YYYY");
};
</script>
