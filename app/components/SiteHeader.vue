<script setup lang="ts">
const links = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Vendors", to: "/vendors" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
]
</script>

<template>
  <div class="bg-muted">
    <div>
      <UContainer
        class="flex min-h-9 items-center justify-center border-b border-default text-center sm:justify-between sm:text-left"
      >
        <p class="text-[0.65rem] font-semibold tracking-[0.22em] text-toned uppercase">
          Serving Northern Indiana + Greater Indianapolis
        </p>
        <p
          class="hidden text-[0.65rem] font-semibold tracking-[0.22em] text-toned uppercase sm:block"
        >
          Intentional gatherings. Genuinely made.
        </p>
      </UContainer>
    </div>

    <UHeader
      class="border-b-0 bg-muted"
      :ui="{ root: 'h-auto', container: 'border-b border-default py-2' }"
    >
      <template #title>
        <NuxtLink to="/" class="flex items-center gap-3">
          <img
            src="/images/hb_logo.svg"
            alt=""
            width="2000"
            height="2000"
            class="size-16 shrink-0 object-contain dark:brightness-0 dark:invert"
          />
          <span
            class="text-sm font-semibold tracking-[0.14em] text-highlighted uppercase sm:text-base"
          >
            Hampton Berkley
          </span>
        </NuxtLink>
      </template>

      <template #right>
        <UNavigationMenu :items="links" class="hidden lg:flex" />
        <UButton
          to="/contact"
          label="Inquire"
          class="hidden tracking-[0.14em] uppercase lg:inline-flex"
        />
        <UColorModeButton />
      </template>

      <template #body>
        <UNavigationMenu :items="links" orientation="vertical" class="-mx-2.5" />
        <UButton
          to="/contact"
          label="Inquire"
          block
          class="mt-4 tracking-[0.14em] uppercase"
        />
      </template>
    </UHeader>
  </div>
</template>
