<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-default bg-muted">
    <UContainer class="grid gap-10 py-12 md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <p class="font-serif text-3xl font-semibold">Hampton Berkley</p>
        <p class="mt-3 max-w-lg text-sm text-muted">
          Thoughtful wedding planning, designed around the people at the heart of the
          celebration.
        </p>
      </div>
      <div class="space-y-3 text-sm md:text-right">
        <NuxtLink to="/contact" class="block font-medium hover:text-primary">
          Start planning
        </NuxtLink>
        <p class="text-muted">© {{ year }} Hampton Berkley</p>
      </div>
    </UContainer>
  </footer>
</template>
