<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  description?: string
}>()
</script>

<template>
  <div class="max-w-2xl">
    <p
      v-if="eyebrow"
      class="mb-3 text-sm font-semibold tracking-[0.2em] text-primary uppercase"
    >
      {{ eyebrow }}
    </p>
    <h2 class="font-serif text-4xl font-semibold text-balance sm:text-5xl">
      {{ title }}
    </h2>
    <p v-if="description" class="mt-5 text-lg leading-8 text-muted">
      {{ description }}
    </p>
  </div>
</template>
