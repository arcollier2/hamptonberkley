<script setup lang="ts">
type WeddingService = {
  title: string
  subtitle: string
  price?: string
  pricing?: { guests: string; price: string }[]
  includes: string[]
  cta: string
  class: string
}

const weddingServices: WeddingService[] = [
  {
    title: "Day-Of Coordination",
    subtitle: "Let us handle the details, so you can be present.",
    price: "$1,000+",
    includes: [
      "Final planning call 2–3 weeks before the event",
      "Vendor communication confirmation",
      "Wedding timeline management",
      "Day-before planning and execution",
      "Day-of execution and troubleshooting",
      "Ceremony and reception coordination",
    ],
    cta: "Let’s make it happen",
    class: "bg-hgreen-300",
  },
  {
    title: "Partial Planning",
    subtitle: "Expert guidance, every step of the way.",
    price: "$3,000+",
    includes: [
      "Planning support throughout engagement",
      "Vendor recommendations",
      "Timeline management",
      "Budget guidance",
      "Event logistics support",
    ],
    cta: "Learn more",
    class: "bg-hblue-200",
  },
  {
    title: "Full-Service Planning",
    subtitle: "A fully personalized, stress-free experience.",
    price: "$8,000+",
    includes: [
      "Full event management",
      "Design-thinking workshop",
      "Vision development",
      "Vendor sourcing",
      "Budget management",
      "Planning meetings",
      "On-site coordination",
    ],
    cta: "Let’s plan your day",
    class: "bg-hpink-200",
  },
]

const bridalEvents = [
  { name: "Bridal Showers", price: "$350" },
  { name: "Engagement Party", price: "$300" },
  { name: "Bachelorette Party Planning", price: "$500+" },
  { name: "Welcome Dinners", price: "$500+" },
  { name: "Rehearsal Dinners", price: "$500+" },
]

const corporateEvents = [
  { name: "Executive Dinners", price: "$500+" },
  { name: "Team-Building Experiences", price: "$500+" },
  { name: "Retreat Coordination", price: "$850+" },
  { name: "Elevated Private Gatherings", price: "$500+" },
  { name: "Baby Showers", price: "$550+" },
]

const canonicalUrl = new URL("/services", useSiteUrl()).toString()

useSeoMeta({
  title: "Services | Hampton Berkley",
  description:
    "Explore wedding planning, design workshops, bridal events, and private event services from Hampton Berkley.",
  ogTitle: "Services | Hampton Berkley",
  ogDescription:
    "Intentional planning services for weddings, bridal events, corporate gatherings, and meaningful celebrations.",
  ogUrl: canonicalUrl,
})

useHead({ link: [{ rel: "canonical", href: canonicalUrl }] })
</script>

<template>
  <div>
    <UContainer class="space-y-20 py-16 sm:space-y-24 sm:py-24">
      <section>
        <SectionDivider
          label="Wedding services"
          link-label="A day as meaningful as your love story"
          to="/contact"
          class="mb-7"
        />

        <h1 class="sr-only">Wedding and event planning services</h1>

        <div class="grid gap-4 lg:grid-cols-3">
          <article
            v-for="service in weddingServices"
            :key="service.title"
            class="flex min-h-[34rem] flex-col rounded-xl p-7 text-hcharcoal-900 shadow-sm ring-1 ring-black/5 sm:p-8"
            :class="service.class"
          >
            <h2 class="font-serif text-3xl leading-tight font-semibold">
              {{ service.title }}
            </h2>
            <p class="mt-3 text-[0.65rem] font-semibold tracking-[0.18em] uppercase">
              {{ service.subtitle }}
            </p>
            <span class="mt-5 block h-px w-10 bg-current opacity-40" />

            <p v-if="service.price" class="mt-7 font-serif text-3xl font-semibold">
              {{ service.price }}
            </p>

            <dl
              v-if="service.pricing"
              class="mt-7 divide-y divide-hcharcoal-900/15 border-y border-hcharcoal-900/15 text-xs"
            >
              <div
                v-for="tier in service.pricing"
                :key="tier.guests"
                class="flex justify-between gap-4 py-2"
              >
                <dt>{{ tier.guests }}</dt>
                <dd class="font-semibold">{{ tier.price }}</dd>
              </div>
            </dl>

            <div class="mt-7">
              <p class="text-[0.65rem] font-semibold tracking-[0.18em] uppercase">
                Includes
              </p>
              <ul class="mt-3 list-disc space-y-1 pl-4 text-sm leading-5">
                <li v-for="item in service.includes" :key="item">{{ item }}</li>
              </ul>
            </div>

            <NuxtLink
              :to="
                service.title === 'Day-Of Coordination'
                  ? '/service/wedding-coordination'
                  : '/contact'
              "
              class="mt-auto flex items-center gap-2 pt-8 text-xs font-semibold tracking-[0.14em] uppercase"
            >
              {{ service.cta }}
              <UIcon name="i-lucide-arrow-right" class="size-4" />
            </NuxtLink>
          </article>
        </div>
      </section>

      <section>
        <SectionDivider
          label="Signature service"
          link-label="Clarity today. A more meaningful tomorrow."
          to="/contact"
          class="mb-7"
        />

        <div
          class="grid overflow-hidden rounded-xl bg-elevated shadow-sm ring-1 ring-default lg:grid-cols-[0.42fr_0.58fr]"
        >
          <img
            src="/images/02398.jpg"
            alt="Hampton Berkley planners developing event concepts together at a table"
            width="2832"
            height="4240"
            loading="lazy"
            class="min-h-80 size-full object-cover object-center"
          />

          <div class="p-7 sm:p-10">
            <div
              class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
            >
              <div>
                <h2 class="font-serif text-4xl font-semibold">
                  Design Thinking Workshops
                </h2>
                <p
                  class="mt-3 text-[0.65rem] font-semibold tracking-[0.18em] text-toned uppercase"
                >
                  Clarity today. A more meaningful tomorrow.
                </p>
              </div>
              <p class="shrink-0 font-serif text-3xl font-semibold">$300</p>
            </div>

            <p class="mt-6 text-sm leading-6 text-muted">
              A signature differentiator of Hampton Berkley Co. These workshops help
              clients create a thoughtful foundation for their event, blending
              creativity with strategy.
            </p>

            <ul class="mt-5 grid gap-x-10 gap-y-2 text-sm sm:grid-cols-2">
              <li class="flex gap-2">
                <span aria-hidden="true">•</span>Clarify priorities
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true">•</span>Prevent overspending
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true">•</span>Establish realistic budgets
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true">•</span>Identify emotional goals for the event
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true">•</span>Build cohesive event concepts
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true">•</span>Create aligned visual and logistical
                direction
              </li>
            </ul>

            <UButton
              to="/contact"
              color="neutral"
              trailing-icon="i-lucide-arrow-right"
              class="mt-7 bg-hgreen-300 tracking-[0.12em] text-hcharcoal-950 uppercase hover:bg-hgreen-400"
            >
              Learn more about our process
            </UButton>
          </div>
        </div>
      </section>

      <section>
        <SectionDivider
          label="Additional services"
          link-label="More gatherings. More good times."
          to="/contact"
          class="mb-7"
        />

        <div class="grid gap-4 xl:grid-cols-2">
          <article
            class="grid overflow-hidden rounded-xl bg-hcharcoal-800 text-hcharcoal-50 shadow-sm sm:grid-cols-[0.62fr_0.38fr]"
          >
            <div class="flex min-h-96 flex-col p-7 sm:p-8">
              <h2 class="font-serif text-3xl font-semibold">Bridal Events</h2>
              <p class="mt-2 text-[0.65rem] font-semibold tracking-[0.18em] uppercase">
                Celebrate every chapter.
              </p>
              <span class="mt-5 block h-px w-10 bg-current opacity-40" />
              <dl class="mt-6 divide-y divide-hcharcoal-50/20 text-sm">
                <div
                  v-for="event in bridalEvents"
                  :key="event.name"
                  class="flex justify-between gap-4 py-2"
                >
                  <dt>{{ event.name }}</dt>
                  <dd class="font-semibold">{{ event.price }}</dd>
                </div>
              </dl>
              <NuxtLink
                to="/contact"
                class="mt-auto flex items-center gap-2 pt-7 text-xs font-semibold tracking-[0.14em] uppercase"
              >
                Inquire about bridal events
                <UIcon name="i-lucide-arrow-right" class="size-4" />
              </NuxtLink>
            </div>
            <img
              src="/images/working.png"
              alt="Hampton Berkley planner seated against a neutral studio backdrop"
              width="2832"
              height="4240"
              loading="lazy"
              class="min-h-64 size-full object-cover object-center"
            />
          </article>

          <article
            class="grid overflow-hidden rounded-xl bg-hblue-200 text-hcharcoal-900 shadow-sm sm:grid-cols-[0.62fr_0.38fr]"
          >
            <div class="flex min-h-96 flex-col p-7 sm:p-8">
              <h2 class="font-serif text-3xl font-semibold">
                Corporate &amp; Private Events
              </h2>
              <p class="mt-2 text-[0.65rem] font-semibold tracking-[0.18em] uppercase">
                Meaningful gatherings for every occasion.
              </p>
              <span class="mt-5 block h-px w-10 bg-current opacity-40" />
              <dl class="mt-6 divide-y divide-hcharcoal-900/15 text-sm">
                <div
                  v-for="event in corporateEvents"
                  :key="event.name"
                  class="flex justify-between gap-4 py-2"
                >
                  <dt>{{ event.name }}</dt>
                  <dd class="font-semibold">{{ event.price }}</dd>
                </div>
              </dl>
              <p class="mt-5 font-serif text-lg italic">
                Got a fun event coming up? We can do it all! Reach out for a quote.
              </p>
              <NuxtLink
                to="/contact"
                class="mt-auto flex items-center gap-2 pt-7 text-xs font-semibold tracking-[0.14em] uppercase"
              >
                Inquire now
                <UIcon name="i-lucide-arrow-right" class="size-4" />
              </NuxtLink>
            </div>
            <img
              src="/images/02391.jpg"
              alt="Hampton Berkley planners working together on event details"
              width="2832"
              height="4240"
              loading="lazy"
              class="min-h-64 size-full object-cover object-center"
            />
          </article>
        </div>
      </section>
    </UContainer>

    <ScallopedCta
      eyebrow="Let’s create something meaningful"
      heading="Ready to Start Planning?"
      content="We’d love to learn more about your event and how we can bring your vision to life."
      button-text="Inquire now"
      button-to="/contact"
    />
  </div>
</template>
