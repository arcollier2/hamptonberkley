<script setup lang="ts">
const canonicalUrl = new URL("/", useSiteUrl()).toString()

useSeoMeta({
  title: "Hampton Berkley | Wedding planning",
  description: "Thoughtful wedding planning and event organization.",
  ogTitle: "Hampton Berkley",
  ogDescription: "Thoughtful wedding planning and event organization.",
  ogUrl: canonicalUrl,
  ogType: "website",
})

useHead({ link: [{ rel: "canonical", href: canonicalUrl }] })
</script>

<template>
  <div>
    <section class="relative overflow-hidden border-b border-default bg-muted">
      <UContainer
        class="grid min-h-[72vh] items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div class="max-w-3xl">
          <p
            class="mb-5 text-sm font-semibold tracking-[0.24em] text-primary uppercase"
          >
            Wedding planning & organization
          </p>
          <h1
            class="font-serif text-6xl leading-[0.95] font-semibold text-balance sm:text-7xl lg:text-8xl"
          >
            A celebration that feels entirely like you.
          </h1>
          <p class="mt-7 max-w-xl text-lg leading-8 text-muted">
            Hampton Berkley brings calm, clarity, and considered detail to every stage
            of your wedding.
          </p>
          <div class="mt-9 flex flex-wrap gap-3">
            <UButton to="/contact" size="xl">Begin your plans</UButton>
            <UButton to="/gallery" size="xl" color="neutral" variant="outline">
              View the gallery
            </UButton>
          </div>
        </div>
        <div
          class="aspect-[4/5] rounded-t-full border border-default bg-elevated p-4 shadow-xl shadow-hcharcoal-950/5"
        >
          <div
            class="flex h-full items-center justify-center rounded-t-full bg-accented text-center"
          >
            <p class="max-w-xs px-8 font-serif text-3xl text-muted">
              Your photography will live here.
            </p>
          </div>
        </div>
      </UContainer>
    </section>

    <UContainer class="space-y-24 py-24 sm:py-32">
      <section class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <SectionHeading
          eyebrow="Our approach"
          title="Beautifully organized. Deeply personal."
          description="From the first idea to the final farewell, every decision is shaped around your priorities, your people, and the experience you want to share."
        />
        <div class="grid gap-5 sm:grid-cols-2">
          <UCard>
            <UIcon name="i-lucide-calendar-heart" class="mb-5 size-7 text-primary" />
            <h3 class="font-serif text-2xl font-semibold">Full planning</h3>
            <p class="mt-3 text-muted">
              End-to-end guidance for a cohesive, carefully managed celebration.
            </p>
          </UCard>
          <UCard>
            <UIcon name="i-lucide-sparkles" class="mb-5 size-7 text-primary" />
            <h3 class="font-serif text-2xl font-semibold">Event design</h3>
            <p class="mt-3 text-muted">
              A visual direction that ties every thoughtful detail together.
            </p>
          </UCard>
        </div>
      </section>

      <section
        class="rounded-3xl bg-elevated px-6 py-16 text-center shadow-sm sm:px-12"
      >
        <SectionHeading
          eyebrow="Start a conversation"
          title="Tell us what you are imagining."
          description="Share a few details and we will be in touch about the next steps."
          class="mx-auto"
        />
        <UButton to="/contact" size="xl" class="mt-8"
          >Plan with Hampton Berkley</UButton
        >
      </section>
    </UContainer>
  </div>
</template>
