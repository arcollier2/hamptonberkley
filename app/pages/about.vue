<script setup lang="ts">
const founders = [
  {
    name: "Irelynd",
    image: "/images/02499.jpg",
    imageAlt: "Irelynd seated in the Hampton Berkley studio",
    imageWidth: 2832,
    imageHeight: 3868,
    description:
      "Always down for a spontaneous plan, Irelynd brings the creativity, big ideas, and eye for the little details. She’s the friend who makes everything feel a little more fun.",
    traits: ["Creative", "Optimistic", "Detail-oriented"],
  },
  {
    name: "Amelia",
    image: "/images/02251.jpg",
    imageAlt: "Amelia seated in the Hampton Berkley studio",
    imageWidth: 2832,
    imageHeight: 4240,
    description:
      "Amelia keeps us grounded, organized, and always thinking ahead. She brings the balance, the strategy, and a calm confidence that makes everything feel possible.",
    traits: ["Organized", "Thoughtful", "Always a plan"],
  },
]

const pillars = [
  {
    title: "Care for Women",
    description:
      "We support initiatives that provide women with access to essential resources, health services, and opportunities for full autonomy.",
  },
  {
    title: "Supporting Healthy Relationships",
    description:
      "We invest in programs and resources that strengthen relationships — from families to communities.",
  },
  {
    title: "Women in Entrepreneurship",
    description:
      "We champion women in entrepreneurship by supporting access to capital, mentorship, and resources that help them build and grow.",
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
              :width="founder.imageWidth"
              :height="founder.imageHeight"
              loading="lazy"
              class="h-auto w-full rounded-xl shadow-sm"
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

      <section class="border-t border-default py-16 sm:py-20">
        <h2 class="text-center font-serif text-4xl font-semibold sm:text-5xl">
          Our Pillars
        </h2>

        <div class="relative mt-10 pb-24 sm:pb-32 lg:pb-16">
          <div class="relative z-10 grid gap-4 lg:grid-cols-3">
            <article
              v-for="pillar in pillars"
              :key="pillar.title"
              class="flex min-h-80 flex-col items-center justify-center rounded-xl bg-hblue-500 px-7 py-10 text-center text-white shadow-sm sm:px-10"
            >
              <h3 class="max-w-sm font-serif text-3xl leading-tight font-semibold">
                {{ pillar.title }}
              </h3>
              <span class="mt-6 block h-px w-16 bg-hblue-200" />
              <p class="mt-6 max-w-sm text-base leading-7 text-hblue-50">
                {{ pillar.description }}
              </p>
            </article>
          </div>

          <figure
            class="relative z-20 mx-auto -mt-3 w-[82%] max-w-xl rotate-2 rounded-sm bg-white p-2 shadow-xl sm:-mt-5 sm:w-[64%] lg:-mt-4 lg:mr-8 lg:w-[38%] lg:max-w-lg lg:rotate-3"
          >
            <span
              aria-hidden="true"
              class="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 -rotate-2 bg-hpink-100/90 shadow-sm"
            />
            <img
              src="/images/hug.jpg"
              alt="Irelynd and Amelia smiling and hugging"
              width="2832"
              height="1618"
              loading="lazy"
              class="aspect-[2832/1618] w-full object-cover"
            />
          </figure>
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
