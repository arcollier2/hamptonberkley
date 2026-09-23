<script setup lang="ts">
const route = useRoute()

const [{ data: categoryData }, { data: vendors }] = await Promise.all([
  useAsyncData("vendor-categories", () => queryCollection("vendorCategories").first()),
  useAsyncData("vendors", () => queryCollection("vendors").all()),
])

const categoryOptions = computed(() => [
  { id: "all", label: "All" },
  ...(categoryData.value?.categories ?? []),
])

const selectedCategory = computed(() => {
  const queryValue = Array.isArray(route.query.category)
    ? route.query.category[0]
    : route.query.category
  const requestedCategory = typeof queryValue === "string" ? queryValue : "all"

  return categoryOptions.value.some((category) => category.id === requestedCategory)
    ? requestedCategory
    : "all"
})

const categoryLabels = computed(
  () =>
    new Map(
      (categoryData.value?.categories ?? []).map((category) => [
        category.id,
        category.label,
      ])
    )
)

const visibleVendors = computed(() =>
  [...(vendors.value ?? [])]
    .filter(
      (vendor) =>
        selectedCategory.value === "all" ||
        vendor.categories.includes(selectedCategory.value)
    )
    .sort(
      (left, right) =>
        Number(right.featured) - Number(left.featured) ||
        left.name.localeCompare(right.name)
    )
)

const toneClasses = [
  "bg-hpink-200 text-hcharcoal-900",
  "bg-hblue-200 text-hcharcoal-900",
  "bg-hgreen-300 text-hcharcoal-900",
]

function vendorTone(id: string) {
  const hash = [...id].reduce((total, character) => total + character.charCodeAt(0), 0)
  return toneClasses[hash % toneClasses.length]
}

function displayWebsite(website: string) {
  return website.replace(/^https?:\/\//, "").replace(/\/$/, "")
}

const canonicalUrl = new URL("/vendors", useSiteUrl()).toString()

useSeoMeta({
  title: "Approved Vendors | Hampton Berkley",
  description:
    "Explore trusted florists, caterers, photographers, and event professionals recommended by Hampton Berkley.",
  ogTitle: "Approved Vendors | Hampton Berkley",
  ogDescription:
    "Trusted creative partners for meaningful weddings, gatherings, and events.",
  ogUrl: canonicalUrl,
})

useHead({ link: [{ rel: "canonical", href: canonicalUrl }] })
</script>

<template>
  <div>
    <UContainer>
      <section
        class="grid items-center gap-10 border-b border-default py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24"
      >
        <div>
          <p class="text-xs font-semibold tracking-[0.24em] text-primary uppercase">
            HB approved vendors
          </p>
          <h1
            class="mt-4 max-w-xl font-serif text-5xl leading-[0.95] font-semibold text-balance sm:text-6xl"
          >
            Trusted Creatives for Meaningful Moments
          </h1>
          <p class="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            Over the years, we’ve had the privilege of working with incredible vendors
            who share our passion for creating intentional, beautiful events. These are
            the people we trust, love working with, and wholeheartedly recommend.
          </p>
        </div>

        <img
          src="/images/street-signs.png"
          alt="Illustrated Hampton Drive and Berkley Road street signs"
          width="1230"
          height="1278"
          loading="eager"
          class="mx-auto w-full max-w-md object-contain dark:brightness-90"
        />
      </section>

      <nav
        aria-label="Vendor categories"
        class="flex gap-2 overflow-x-auto border-b border-default py-5"
      >
        <NuxtLink
          v-for="category in categoryOptions"
          :key="category.id"
          :to="{
            path: '/vendors',
            query: category.id === 'all' ? {} : { category: category.id },
          }"
          class="shrink-0 rounded-md px-5 py-2 text-[0.65rem] font-semibold tracking-[0.18em] uppercase"
          :class="
            selectedCategory === category.id
              ? 'bg-hgreen-300 text-hcharcoal-950'
              : 'text-toned hover:bg-accented hover:text-highlighted'
          "
        >
          {{ category.label }}
        </NuxtLink>
      </nav>

      <section class="py-12 sm:py-16">
        <div
          v-if="visibleVendors.length"
          class="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          <article
            v-for="vendor in visibleVendors"
            :key="vendor.id"
            class="flex min-h-72 flex-col rounded-xl p-7 shadow-sm ring-1 ring-black/5"
            :class="vendorTone(vendor.id)"
          >
            <div class="flex items-start justify-between gap-4">
              <p
                v-if="selectedCategory === 'all'"
                class="text-[0.65rem] font-semibold tracking-[0.18em] uppercase"
              >
                {{
                  vendor.categories
                    .map((category) => categoryLabels.get(category) ?? category)
                    .join(" · ")
                }}
              </p>
              <span
                v-if="vendor.featured"
                class="ml-auto inline-flex items-center gap-1 text-[0.65rem] font-semibold tracking-[0.14em] uppercase"
              >
                <UIcon name="i-lucide-star" class="size-3.5 fill-current" />
                Featured
              </span>
            </div>

            <h2 class="mt-3 font-serif text-3xl font-semibold">{{ vendor.name }}</h2>
            <p v-if="vendor.tagline" class="mt-2 leading-6 opacity-75">
              {{ vendor.tagline }}
            </p>
            <span class="mt-5 block h-px w-10 bg-current opacity-40" />

            <div class="mt-5 space-y-1 text-sm leading-5 opacity-80">
              <a
                v-if="vendor.instagram"
                :href="`https://www.instagram.com/${vendor.instagram}`"
                target="_blank"
                rel="noopener noreferrer"
                class="block hover:underline"
              >
                @{{ vendor.instagram }}
              </a>
              <a
                v-if="vendor.website"
                :href="vendor.website"
                target="_blank"
                rel="noopener noreferrer"
                class="block hover:underline"
              >
                {{ displayWebsite(vendor.website) }}
              </a>
              <a
                v-if="vendor.email"
                :href="`mailto:${vendor.email}`"
                class="block break-all hover:underline"
              >
                {{ vendor.email }}
              </a>
            </div>

            <a
              v-if="vendor.website"
              :href="vendor.website"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-auto flex items-center gap-2 pt-7 text-xs font-semibold tracking-[0.16em] uppercase"
            >
              Visit website
              <UIcon name="i-lucide-arrow-right" class="size-4" />
            </a>
          </article>
        </div>

        <p v-else class="py-16 text-center text-muted">
          Vendor recommendations for this category are coming soon.
        </p>
      </section>
    </UContainer>

    <ScallopedCta
      eyebrow="Let’s create something meaningful"
      heading="Ready to Plan a More Present Day?"
      content="We’d love to learn more about your celebration and how we can support you. Let’s create a day that feels organized, meaningful, and beautifully hosted."
      button-text="Inquire now"
      button-to="/contact"
    />
  </div>
</template>
