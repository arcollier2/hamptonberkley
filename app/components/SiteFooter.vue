<script setup lang="ts">
const links = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Vendors", to: "/vendors" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
]

const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-muted">
    <UContainer>
      <div
        class="grid gap-10 border-b border-default py-9 md:grid-cols-[1.15fr_1.5fr_0.85fr] md:items-center"
      >
        <NuxtLink to="/" class="flex items-center gap-4">
          <img
            src="/images/hb_logo.svg"
            alt=""
            width="2000"
            height="2000"
            class="size-16 shrink-0 object-contain dark:brightness-0 dark:invert"
          />
          <span>
            <span
              class="block text-sm font-semibold tracking-[0.13em] text-highlighted uppercase"
            >
              Hampton Berkley
            </span>
            <span class="mt-1 block font-serif text-sm text-primary italic">
              Intentional Gatherings. Genuinely Made.
            </span>
          </span>
        </NuxtLink>

        <div class="space-y-5 md:text-center">
          <nav
            aria-label="Footer"
            class="flex flex-wrap gap-x-5 gap-y-2 text-xs md:justify-center"
          >
            <NuxtLink
              v-for="link in links"
              :key="link.to"
              :to="link.to"
              class="text-toned hover:text-primary"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>
          <a
            href="https://www.instagram.com/hamptonberkleyco"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-xs text-toned hover:text-primary"
          >
            <UIcon name="i-lucide-instagram" class="size-4" />
            @hamptonberkleyco
          </a>
        </div>

        <div class="md:text-right">
          <p
            class="text-[0.65rem] font-semibold tracking-[0.18em] text-toned uppercase"
          >
            Serving Northern Indiana<br />+ Greater Indianapolis
          </p>
          <p class="mt-3 text-xs leading-5 text-muted">
            Events with intention.<br />
            People at the center. Always.
          </p>
        </div>
      </div>

      <div
        class="flex flex-col gap-3 py-4 text-[0.65rem] text-dimmed sm:flex-row sm:items-center sm:justify-between"
      >
        <p>© {{ year }} Hampton Berkley All rights reserved.</p>
        <div class="flex gap-5" aria-label="Legal">
          <span>Privacy</span>
          <span class="border-l border-default pl-5">Terms</span>
        </div>
      </div>
    </UContainer>
  </footer>
</template>
