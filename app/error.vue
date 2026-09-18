<script setup lang="ts">
import type { NuxtError } from "#app"

defineProps<{ error: NuxtError }>()

function goHome() {
  return clearError({ redirect: "/" })
}
</script>

<template>
  <UApp>
    <SiteHeader />
    <UContainer
      class="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center"
    >
      <p class="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
        Page not found
      </p>
      <h1 class="mt-4 font-serif text-5xl font-semibold">
        This page is not on the guest list.
      </h1>
      <p class="mt-5 max-w-lg text-muted">
        The page may have moved, or the address may be incomplete.
      </p>
      <UButton class="mt-8" icon="i-lucide-home" @click="goHome">Return home</UButton>
    </UContainer>
    <SiteFooter />
  </UApp>
</template>
