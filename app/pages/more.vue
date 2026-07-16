<template>
  <div class="py-6 space-y-6">
    <CommonHeadingTitle title="More" icon="i-lucide-more-horizontal" />
    <CommonComingSoon />
  </div>
</template>

<script setup lang="ts">
import auth from "../middleware/auth.global";

definePageMeta({ middleware: [auth] });
</script>
