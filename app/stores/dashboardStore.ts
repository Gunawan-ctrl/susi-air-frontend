import { defineStore } from "pinia";

export const useDashboardStore = defineStore("dashboard", () => {
  const upcomingFlight = ref({
    date: "2026-05-31",
    time: "08:00 - 10:00",
    departure: "HLP",
    departureCity: "Jakarta",
    arrival: "CJN",
    arrivalCity: "Pangandaran",
  });

  const news = ref([
    {
      id: 1,
      title: "Rute Baru: Jakarta – Bali",
      image:
        "https://www.hostelworld.com/blog/wp-content/uploads/dreamstimesmall_322299871.jpg",
      description:
        "Penerbangan perdana rute HLP-DPS mulai Juli 2026. Tiket tersedia untuk pilot dan awak kabin.",
      category: "Network",
    },
    {
      id: 2,
      title: "Peringatan Cuaca: Badai di Sumatera",
      image:
        "https://www.hostelworld.com/blog/wp-content/uploads/dreamstimesmall_322299871.jpg",
      description:
        "Badai petir diperkirakan terjadi di wilayah Sumatera Utara dan Barat.",
      category: "Operational",
    },
    {
      id: 3,
      title: "Safety Briefing Wajib untuk Semua Pilot",
      image:
        "https://www.hostelworld.com/blog/wp-content/uploads/dreamstimesmall_322299871.jpg",
      description:
        "Briefing keselamatan terbaru wajib diikuti sebelum penerbangan.",
      category: "Safety",
    },
    {
      id: 4,
      title: "Armada Baru: Pesawat Cessna 208",
      image:
        "https://www.hostelworld.com/blog/wp-content/uploads/dreamstimesmall_322299871.jpg",
      description:
        "Penambahan unit pesawat Cessna Grand Caravan untuk mendukung rute di Papua.",
      category: "Fleet",
    },
    {
      id: 5,
      title: "Update: Prosedur Pendaratan Darurat",
      image:
        "https://www.hostelworld.com/blog/wp-content/uploads/dreamstimesmall_322299871.jpg",
      description:
        "Prosedur pendaratan darurat diperbarui berdasarkan hasil evaluasi operasional.",
      category: "Safety",
    },
  ]);

  return { upcomingFlight, news };
});
