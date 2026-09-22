<script setup lang="ts">
defineProps<{
  label: string
  linkLabel: string
  to: string
}>()
</script>

<template>
  <div class="flex items-center gap-3">
    <p
      class="shrink-0 text-[0.65rem] font-semibold tracking-[0.2em] text-toned uppercase"
    >
      {{ label }}
    </p>
    <span
      class="h-px min-w-6 flex-1 bg-hblue-300 dark:bg-hblue-700"
      aria-hidden="true"
    />
    <NuxtLink
      :to="to"
      class="flex shrink-0 items-center gap-2 text-right text-[0.65rem] font-semibold tracking-[0.16em] text-toned uppercase hover:text-primary"
    >
      {{ linkLabel }}
      <UIcon name="i-lucide-arrow-right" class="size-3.5" />
    </NuxtLink>
  </div>
</template>
