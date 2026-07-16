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
