<template>
  <div class="py-6 space-y-6">
    <CommonHeadingTitle title="Documents" icon="i-heroicons-document-text" />
    <DashboardDocuments />
  </div>
</template>

<script setup lang="ts">
import auth from "../middleware/auth.global";

definePageMeta({
  middleware: [auth],
});
</script>
