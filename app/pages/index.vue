<template>
  <div class="home">
    <DashboardHeader />
    <DashboardUpcomingFlight />
    <DashboardLatestNews />
    <DashboardHoursToLimit />
    <DashboardDocuments />
  </div>
</template>

<script setup lang="ts">
import auth from "../middleware/auth.global";

definePageMeta({
  middleware: [auth],
});
</script>
