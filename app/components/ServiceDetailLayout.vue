<script setup lang="ts">
type PriceOption = {
  title: string
  eyebrow?: string
  price: string
  features: string[]
  tone: "pink" | "blue" | "green"
}

type AddOn = {
  label: string
  icon: string
}

type GalleryImage = {
  src: string
  alt: string
}

const props = defineProps<{
  category: string
  title: string
  summary: string
  contentHeading: string
  content: string[]
  contentImage?: GalleryImage
  pricing: PriceOption[]
  addOns?: AddOn[]
  gallery?: GalleryImage[]
  galleryLabel?: string
  galleryLinkLabel?: string
  ctaEyebrow: string
  ctaHeading: string
  ctaContent: string
  ctaButtonText?: string
}>()

const toneClasses: Record<PriceOption["tone"], string> = {
  pink: "bg-hpink-200",
  blue: "bg-hblue-200",
  green: "bg-hgreen-300",
}

const galleryTrack = ref<HTMLElement | null>(null)

function scrollGallery(direction: -1 | 1) {
  galleryTrack.value?.scrollBy({
    left: direction * Math.min(galleryTrack.value.clientWidth * 0.8, 720),
    behavior: "smooth",
  })
}
</script>

<template>
  <div>
    <UContainer class="py-12 sm:py-16">
      <nav aria-label="Breadcrumb" class="flex flex-wrap gap-2 text-sm text-toned">
        <NuxtLink to="/" class="hover:text-primary">Home</NuxtLink>
        <span aria-hidden="true">/</span>
        <NuxtLink to="/services" class="hover:text-primary">Services</NuxtLink>
        <span aria-hidden="true">/</span>
        <span>{{ props.title }}</span>
      </nav>

      <header class="max-w-5xl pt-10 sm:pt-14">
        <p class="text-xs font-semibold tracking-[0.24em] text-primary uppercase">
          {{ props.category }}
        </p>
        <h1
          class="mt-4 font-serif text-5xl leading-none font-semibold text-balance sm:text-7xl"
        >
          {{ props.title }}
        </h1>
        <p class="mt-6 max-w-4xl text-xl leading-8 text-toned sm:text-2xl sm:leading-9">
          {{ props.summary }}
        </p>
      </header>

      <section
        class="mt-16 grid items-center gap-10 sm:mt-20"
        :class="{ 'lg:grid-cols-2': props.contentImage }"
      >
        <div>
          <h2 class="max-w-xl font-serif text-4xl leading-tight font-semibold">
            {{ props.contentHeading }}
          </h2>
          <div class="mt-6 max-w-2xl space-y-5 text-base leading-7 text-muted">
            <p v-for="paragraph in props.content" :key="paragraph">
              {{ paragraph }}
            </p>
          </div>
        </div>

        <img
          v-if="props.contentImage"
          :src="props.contentImage.src"
          :alt="props.contentImage.alt"
          width="1200"
          height="800"
          loading="lazy"
          class="aspect-[3/2] size-full rounded-xl object-cover shadow-sm"
        />
      </section>

      <section class="mt-16 sm:mt-20">
        <div class="grid gap-4 lg:grid-cols-3">
          <article
            v-for="option in props.pricing"
            :key="option.title"
            class="rounded-xl p-7 text-hcharcoal-900 shadow-sm ring-1 ring-black/5 sm:p-8"
            :class="toneClasses[option.tone]"
          >
            <h2 class="font-serif text-3xl font-semibold">{{ option.title }}</h2>
            <p
              v-if="option.eyebrow"
              class="mt-3 text-[0.65rem] font-semibold tracking-[0.18em] uppercase"
            >
              {{ option.eyebrow }}
            </p>
            <p class="mt-2 font-serif text-4xl font-semibold">{{ option.price }}</p>
            <ul class="mt-5 list-disc space-y-2 pl-5 text-sm leading-5">
              <li v-for="feature in option.features" :key="feature">
                {{ feature }}
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section
        v-if="props.addOns?.length"
        class="mt-5 rounded-xl bg-hblue-100 p-6 text-hcharcoal-900 dark:bg-hblue-900 dark:text-hblue-50"
      >
        <p class="text-[0.65rem] font-semibold tracking-[0.2em] uppercase">
          Optional add-ons
        </p>
        <ul class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li
            v-for="addOn in props.addOns"
            :key="addOn.label"
            class="flex items-center gap-3 border-hblue-300 sm:border-l sm:pl-5 sm:first:border-l-0 sm:first:pl-0 dark:border-hblue-700"
          >
            <UIcon :name="addOn.icon" class="size-6 shrink-0 text-primary" />
            <span class="text-sm">{{ addOn.label }}</span>
          </li>
        </ul>
      </section>

      <section v-if="props.gallery?.length" class="mt-16 sm:mt-20">
        <SectionDivider
          :label="props.galleryLabel ?? 'A look at past events'"
          :link-label="props.galleryLinkLabel ?? 'Real moments. Lasting impressions.'"
          to="/gallery"
          class="mb-7"
        />

        <div class="relative">
          <button
            type="button"
            aria-label="Show previous event photos"
            class="absolute top-1/2 left-0 z-10 hidden size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-hblue-300 bg-elevated text-primary shadow-sm hover:bg-accented md:flex"
            @click="scrollGallery(-1)"
          >
            <UIcon name="i-lucide-chevron-left" class="size-5" />
          </button>

          <div
            ref="galleryTrack"
            class="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3"
          >
            <img
              v-for="(image, index) in props.gallery"
              :key="`${image.src}-${index}`"
              :src="image.src"
              :alt="image.alt"
              width="800"
              height="600"
              loading="lazy"
              class="aspect-[4/3] w-[82%] shrink-0 snap-start rounded-xl object-cover sm:w-[48%] lg:w-[31.5%]"
            />
          </div>

          <button
            type="button"
            aria-label="Show next event photos"
            class="absolute top-1/2 right-0 z-10 hidden size-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-hblue-300 bg-elevated text-primary shadow-sm hover:bg-accented md:flex"
            @click="scrollGallery(1)"
          >
            <UIcon name="i-lucide-chevron-right" class="size-5" />
          </button>
        </div>
      </section>
    </UContainer>

    <ScallopedCta
      :eyebrow="props.ctaEyebrow"
      :heading="props.ctaHeading"
      :content="props.ctaContent"
      :button-text="props.ctaButtonText"
      button-to="/contact"
    />
  </div>
</template>
