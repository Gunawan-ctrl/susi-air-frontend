<template>
  <div class="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
    <UApp>
      <AppHeader />
      <UMain class="flex-1 main-content pb-20 sm:pb-0">
        <slot />
      </UMain>
      <AppFooter />
      <AppMobileNav />
    </UApp>
  </div>
</template>

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
