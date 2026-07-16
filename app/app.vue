<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [
    {
      rel: "icon",
      href: "/susi-air-icon.png",
    },
  ],
  htmlAttrs: { lang: "en" },
});

useSeoMeta({
  title: "Susi Air - Crew Portal Dashboard",
  description:
    "Portal pemantauan jam terbang, limitasi operasional, dan pembaruan dokumen resmi kru Susi Air.",
});
</script>

<style>
.main-content {
  max-width: 90rem;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .main-content {
    padding: 0 1.5rem;
  }
}
</style>
