<script setup lang="ts">
const links = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
]
</script>

<template>
  <UHeader class="bg-muted">
    <template #title>
      <NuxtLink to="/" class="font-serif text-2xl font-semibold tracking-wide">
        Hampton Berkley
      </NuxtLink>
    </template>

    <UNavigationMenu :items="links" />

    <template #right>
      <UColorModeButton />
      <UButton to="/contact" label="Plan with us" class="hidden sm:inline-flex" />
    </template>

    <template #body>
      <UNavigationMenu :items="links" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
