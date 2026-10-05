<script setup lang="ts">
type ScallopedCtaTone = "pink" | "blue" | "green"

const props = withDefaults(
  defineProps<{
    eyebrow?: string
    heading?: string
    content?: string
    buttonText?: string
    buttonTo?: string
    showButton?: boolean
    tone?: ScallopedCtaTone
  }>(),
  {
    eyebrow: "Let’s create something meaningful",
    heading: "Ready to Start Planning?",
    content:
      "We’d love to learn more about your event and how we can bring your vision to life.",
    buttonText: "Inquire now",
    buttonTo: "/contact",
    showButton: true,
    tone: undefined,
  }
)

const selectedTone = computed(() => props.tone ?? "blue")

const toneClasses: Record<ScallopedCtaTone, string> = {
  pink: "bg-hpink-200",
  blue: "bg-hblue-500 text-white",
  green: "bg-hgreen-300",
}

const buttonClasses: Record<ScallopedCtaTone, string> = {
  pink: "bg-hblue-200 hover:bg-hblue-300",
  blue: "bg-muted text-hblue-900 hover:bg-hblue-50 dark:bg-hblue-200 dark:hover:bg-hblue-100",
  green: "bg-hblue-200 hover:bg-hblue-300",
}
</script>

<template>
  <section class="scalloped-paper text-hcharcoal-900">
    <div class="scalloped-paper__fill" :class="toneClasses[selectedTone]">
      <UContainer class="grid items-center gap-8 px-6 py-4 text-center sm:px-12">
        <div>
          <p class="text-xs font-semibold tracking-[0.22em] uppercase sm:text-sm">
            {{ props.eyebrow }}
          </p>
          <h2 class="mt-3 font-serif text-3xl font-semibold sm:text-5xl">
            {{ props.heading }}
          </h2>
          <p class="mx-auto mt-4 max-w-4xl text-base leading-7 sm:text-lg">
            {{ props.content }}
          </p>
        </div>

        <UButton
          v-if="props.showButton"
          :to="props.buttonTo"
          size="xl"
          color="neutral"
          class="w-full max-w-xs justify-self-center px-10 tracking-[0.14em] text-hcharcoal-950 uppercase"
          :class="buttonClasses[selectedTone]"
        >
          {{ props.buttonText }}
        </UButton>
      </UContainer>
    </div>
  </section>
</template>
