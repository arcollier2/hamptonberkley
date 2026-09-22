<script setup lang="ts">
const founders = [
  {
    name: "Irelynd",
    image: "/images/irelynd-crop.png",
    imageAlt: "Irelynd holding a blue Hampton Berkley planning portfolio",
    description:
      "Always down for a spontaneous plan, Irelynd brings the creativity, big ideas, and eye for the little details. She’s the friend who makes everything feel a little more fun.",
    traits: ["Creative", "Optimistic", "Detail-oriented"],
  },
  {
    name: "Amelia",
    image: "/images/amelia-crop.png",
    imageAlt: "Amelia holding a dark planning notebook",
    description:
      "Amelia keeps us grounded, organized, and always thinking ahead. She brings the balance, the strategy, and a calm confidence that makes everything feel possible.",
    traits: ["Organized", "Thoughtful", "Always a plan"],
  },
]

const canonicalUrl = new URL("/about", useSiteUrl()).toString()

useSeoMeta({
  title: "About | Hampton Berkley",
  description:
    "Meet Irelynd and Amelia, the best friends and former roommates behind Hampton Berkley.",
  ogTitle: "About Hampton Berkley",
  ogDescription:
    "Two roommates, two streets, and one big dream: the story behind Hampton Berkley.",
  ogUrl: canonicalUrl,
})

useHead({ link: [{ rel: "canonical", href: canonicalUrl }] })
</script>

<template>
  <div>
    <UContainer>
      <section
        class="grid items-center gap-10 border-b border-default py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-24"
      >
        <div>
          <p class="text-xs font-semibold tracking-[0.24em] text-primary uppercase">
            Our story
          </p>
          <h1
            class="mt-4 max-w-xl font-serif text-5xl leading-[0.95] font-semibold text-balance sm:text-6xl"
          >
            Two roommates.<br />
            Two streets.<br />
            One big dream.
          </h1>

          <div
            class="mt-7 max-w-xl space-y-5 text-sm leading-6 text-muted sm:text-base"
          >
            <p>
              Hampton Berkley started with Irelynd and Amelia — two college roommates
              who spent three years living life side by side. Our home was on Hampton
              Drive and Berkley Road, and somewhere between late nights, getting ready
              together, and dreaming about what was next, those two streets became a
              little piece of our story.
            </p>
            <p>
              When it came time to create something of our own, we knew we wanted it to
              feel personal. Something that reflected the things we love, the people we
              love, and the meaningful moments that bring people together.
            </p>
            <p>
              So, we brought our two favorite streets together and Hampton Berkley was
              born.
            </p>
          </div>

          <span class="mt-7 block h-px w-10 bg-hblue-300 dark:bg-hblue-700" />
          <p
            class="mt-5 text-[0.65rem] font-semibold tracking-[0.22em] text-toned uppercase"
          >
            Same streets. Brighter days.
          </p>
        </div>

        <img
          src="/images/street-signs.png"
          alt="Illustrated Hampton Drive and Berkley Road street signs"
          width="1230"
          height="1278"
          loading="eager"
          class="mx-auto w-full max-w-xl object-contain dark:brightness-90"
        />
      </section>

      <section class="py-16 sm:py-20">
        <header class="text-center">
          <p class="text-xs font-semibold tracking-[0.24em] text-primary uppercase">
            Meet the founders
          </p>
          <h2 class="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
            Irelynd &amp; Amelia
          </h2>
          <p class="mt-4 text-sm text-muted sm:text-base">
            Best friends, former roommates, and the girls behind Hampton Berkley.
          </p>
        </header>

        <div class="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-10">
          <article
            v-for="founder in founders"
            :key="founder.name"
            class="grid items-center gap-7 sm:grid-cols-[1.05fr_0.95fr]"
          >
            <img
              :src="founder.image"
              :alt="founder.imageAlt"
              width="992"
              height="1584"
              loading="lazy"
              class="aspect-[31/49] size-full rounded-xl object-cover shadow-sm"
            />

            <div>
              <h3 class="font-serif text-4xl font-semibold">{{ founder.name }}</h3>
              <span class="mt-4 block h-px w-10 bg-hblue-300 dark:bg-hblue-700" />
              <p class="mt-5 text-sm leading-6 text-muted">
                {{ founder.description }}
              </p>
              <span class="mt-6 block h-px w-10 bg-hblue-300 dark:bg-hblue-700" />
              <ul
                class="mt-5 space-y-1 text-[0.65rem] font-semibold tracking-[0.2em] text-toned uppercase"
              >
                <li v-for="trait in founder.traits" :key="trait">{{ trait }}</li>
              </ul>
            </div>
          </article>
        </div>
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
