<script setup lang="ts">
const serviceLinks = [
  { label: "Weddings", to: "/gallery" },
  { label: "Bridal events", to: "/services" },
  { label: "Social events", to: "/services" },
  { label: "Corporate events", to: "/services" },
]

const services = [
  {
    title: "Wedding Planning",
    items: ["Full-Service Planning", "Partial Planning", "Day-Of Coordination"],
    class: "bg-hgreen-300 text-hcharcoal-900",
  },
  {
    title: "Bridal Events",
    items: ["Showers", "Bachelorette Trips", "Rehearsal Dinners", "Welcome Dinners"],
    class: "bg-hcharcoal-800 text-hcharcoal-50",
  },
  {
    title: "Social Events",
    items: [
      "Engagement Parties",
      "Baby Showers",
      "Private Gatherings",
      "Milestone Celebrations",
    ],
    class: "bg-hblue-200 text-hcharcoal-900",
  },
  {
    title: "Corporate Events",
    items: ["Executive Dinners", "Team Building", "Retreats", "Elevated Experiences"],
    class: "bg-hpink-200 text-hcharcoal-900",
  },
]

const canonicalUrl = new URL("/", useSiteUrl()).toString()

useSeoMeta({
  title: "Hampton Berkley Co. | Intentional gatherings",
  description:
    "Thoughtfully planned, beautifully designed weddings and events across Northern Indiana and Greater Indianapolis.",
  ogTitle: "Hampton Berkley Co.",
  ogDescription:
    "Thoughtfully planned, beautifully designed weddings and events across Northern Indiana and Greater Indianapolis.",
  ogUrl: canonicalUrl,
  ogType: "website",
})

useHead({ link: [{ rel: "canonical", href: canonicalUrl }] })
</script>

<template>
  <div>
    <section class="bg-muted">
      <UContainer class="overflow-hidden px-0 sm:px-0 lg:px-0">
        <div class="grid lg:grid-cols-[0.43fr_0.57fr]">
          <div
            class="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-12 lg:py-16 xl:px-16"
          >
            <p
              class="mb-4 text-xs font-semibold tracking-[0.24em] text-toned uppercase"
            >
              Planning meaningful moments
            </p>
            <h1
              class="max-w-xl font-serif text-5xl leading-[0.98] font-semibold text-balance sm:text-6xl xl:text-7xl"
            >
              Intentional Gatherings, Genuinely Made
            </h1>
            <p class="mt-6 max-w-lg leading-7 text-muted">
              Thoughtfully planned, beautifully designed events that bring people
              together. From “I do” to corporate gatherings and everything in between,
              we make your vision a reality.
            </p>
            <div class="mt-8">
              <UButton
                to="/services"
                size="lg"
                color="neutral"
                trailing-icon="i-lucide-arrow-right"
                class="bg-hgreen-300 tracking-[0.12em] text-hcharcoal-950 uppercase hover:bg-hgreen-400"
              >
                Explore our services
              </UButton>
            </div>
            <p
              class="mt-7 text-[0.65rem] font-semibold tracking-[0.22em] text-toned uppercase"
            >
              People / Places / Meaningful Moments
            </p>
          </div>

          <div class="relative min-h-[360px] sm:min-h-[460px] lg:min-h-[560px]">
            <img
              src="/images/02192.jpg"
              alt="Two Hampton Berkley planners holding notebooks and a blue HB portfolio"
              width="2579"
              height="1711"
              loading="eager"
              fetchpriority="high"
              class="absolute inset-0 size-full object-cover object-center"
            />
          </div>
        </div>
      </UContainer>

      <nav
        aria-label="Services"
        class="hidden overflow-x-auto border-y border-hblue-300 bg-hblue-200 md:flex dark:border-hblue-800 dark:bg-hblue-950"
      >
        <NuxtLink
          v-for="service in serviceLinks"
          :key="service.label"
          :to="service.to"
          class="min-w-44 flex-1 border-l border-hblue-300 px-5 py-6 text-center text-xs font-semibold tracking-[0.18em] text-hcharcoal-800 uppercase first:border-l-0 hover:bg-hblue-300/50 dark:border-hblue-800 dark:text-hblue-100 dark:hover:bg-hblue-900/50"
        >
          {{ service.label }}
        </NuxtLink>
      </nav>
    </section>

    <UContainer class="py-24 sm:py-32">
      <section>
        <div class="mb-8 flex items-end justify-between gap-6">
          <p class="text-xs font-semibold tracking-[0.22em] text-primary uppercase">
            Our services
          </p>
          <NuxtLink
            to="/services"
            class="hidden items-center gap-2 text-xs font-semibold tracking-[0.18em] text-toned uppercase hover:text-primary sm:flex"
          >
            View all services
            <UIcon name="i-lucide-arrow-right" class="size-4" />
          </NuxtLink>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="service in services"
            :key="service.title"
            class="flex min-h-80 flex-col rounded-xl p-7"
            :class="service.class"
          >
            <h2 class="font-serif text-3xl font-semibold">{{ service.title }}</h2>
            <ul class="mt-6 space-y-2 text-sm leading-5">
              <li v-for="item in service.items" :key="item">{{ item }}</li>
            </ul>
            <span class="mt-auto block h-px w-10 bg-current opacity-50" />
            <NuxtLink
              to="/services"
              class="mt-6 flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase"
            >
              Learn more
              <UIcon name="i-lucide-arrow-right" class="size-4" />
            </NuxtLink>
          </article>
        </div>
      </section>
    </UContainer>

    <section class="scalloped-paper bg-hpink-200 text-hcharcoal-900">
      <UContainer
        class="grid items-center gap-6 px-6 py-10 text-center sm:px-12 sm:py-12 lg:grid-cols-[1fr_auto] lg:text-left"
      >
        <div class="lg:text-center">
          <p class="text-[0.65rem] font-semibold tracking-[0.22em] uppercase">
            Let’s create something meaningful
          </p>
          <h2 class="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
            Ready to Plan a More Present Day?
          </h2>
          <p class="mx-auto mt-2 max-w-2xl text-sm leading-6">
            We’d love to learn more about your celebration and how we can support you.
            Let’s create a day that feels organized, meaningful, and beautifully hosted.
          </p>
        </div>
        <UButton
          to="/contact"
          size="xl"
          color="neutral"
          class="justify-self-center bg-hblue-200 px-10 tracking-[0.14em] text-hcharcoal-950 uppercase hover:bg-hblue-300 lg:justify-self-end"
        >
          Inquire now
        </UButton>
      </UContainer>
    </section>
  </div>
</template>
