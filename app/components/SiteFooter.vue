<script setup lang="ts">
const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Vendors", to: "/vendors" },
  { label: "Gallery", to: "/gallery" },
  { label: "Inquire", to: "/contact" },
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
          <div class="flex flex-wrap justify-center gap-2">
            <a
              href="https://www.instagram.com/hamptonberkleyco"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              class="flex size-9 items-center justify-center rounded-full border border-default text-toned transition-colors hover:border-primary hover:text-primary"
            >
              <UIcon name="i-lucide-instagram" class="size-4" />
            </a>
            <a
              href="https://www.pinterest.com/hamptonberkley/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              class="flex size-9 items-center justify-center rounded-full border border-default text-xs font-semibold text-toned transition-colors hover:border-primary hover:text-primary"
            >
              P
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61594835392511"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              class="flex size-9 items-center justify-center rounded-full border border-default text-xs font-semibold text-toned transition-colors hover:border-primary hover:text-primary"
            >
              f
            </a>
          </div>
        </div>

        <div class="md:text-right">
          <p
            class="text-[0.65rem] font-semibold tracking-[0.18em] text-toned uppercase"
          >
            Serving Northern Indiana<br />+ Greater Indianapolis
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
