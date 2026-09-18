<script setup lang="ts">
const { data: items } = await useAsyncData("gallery", () =>
  queryCollection("gallery").order("order", "ASC").all()
)

const canonicalUrl = new URL("/gallery", useSiteUrl()).toString()
useSeoMeta({
  title: "Gallery | Hampton Berkley",
  description: "A gallery of weddings and celebrations planned by Hampton Berkley.",
  ogUrl: canonicalUrl,
})
useHead({ link: [{ rel: "canonical", href: canonicalUrl }] })
</script>

<template>
  <UContainer class="py-16 sm:py-24">
    <SectionHeading
      eyebrow="Selected celebrations"
      title="The gallery"
      description="A flexible, content-driven home for photography, event details, locations, and services."
    />

    <div class="mt-12 grid gap-8 md:grid-cols-2">
      <article v-for="item in items" :key="item.id" class="group">
        <div class="overflow-hidden rounded-2xl bg-muted">
          <NuxtImg
            :src="item.image"
            :alt="item.imageAlt"
            width="1200"
            height="900"
            class="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div class="pt-5">
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h2 class="font-serif text-3xl font-semibold">{{ item.title }}</h2>
            <p v-if="item.location" class="text-sm text-muted">{{ item.location }}</p>
          </div>
          <p class="mt-2 text-muted">{{ item.description }}</p>
          <div v-if="item.services?.length" class="mt-4 flex flex-wrap gap-2">
            <UBadge
              v-for="service in item.services ?? []"
              :key="service"
              color="neutral"
              variant="soft"
            >
              {{ service }}
            </UBadge>
          </div>
        </div>
      </article>
    </div>
  </UContainer>
</template>
