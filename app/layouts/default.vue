<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 sm:pb-0">
    <UApp>
      <AppHeader />
      <UMain class="main-content">
        <slot />
      </UMain>
      <AppFooter />
      <AppMobileNav />
    </UApp>
  </div>
</template>

<script setup lang="ts"></script>
