<template>
  <NuxtRouteAnnouncer />
  <UApp>
    <div class="min-h-screen bg-white sm:p-5 xl:p-8 dark:bg-hcharcoal-950">
      <div
        class="mx-auto min-h-screen max-w-[1440px] overflow-hidden bg-muted shadow-2xl sm:rounded-2xl dark:shadow-black/50"
      >
        <SiteHeader />
        <main class="bg-muted">
          <NuxtPage />
        </main>
        <SiteFooter />
      </div>
    </div>
  </UApp>
</template>
