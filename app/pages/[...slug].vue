<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(`page-${route.path}`, () =>
  queryCollection("pages").path(route.path).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true })
}

const canonicalUrl = new URL(route.path, useSiteUrl()).toString()
useSeoMeta({
  title: () => `${page.value?.title} | Hampton Berkley`,
  description: () => page.value?.description,
  ogTitle: () => page.value?.title,
  ogDescription: () => page.value?.description,
  ogUrl: canonicalUrl,
})
useHead({ link: [{ rel: "canonical", href: canonicalUrl }] })
</script>

<template>
  <UContainer v-if="page" class="py-16 sm:py-24">
    <ContentRenderer
      :value="page"
      class="prose dark:prose-invert mx-auto max-w-3xl prose-headings:font-serif"
    />
  </UContainer>
</template>
