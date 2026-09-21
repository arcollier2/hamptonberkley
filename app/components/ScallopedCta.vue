<script setup lang="ts">
type ScallopedCtaTone = "pink" | "blue" | "green"

const props = withDefaults(
  defineProps<{
    eyebrow: string
    heading: string
    content: string
    buttonText?: string
    buttonTo?: string
    showButton?: boolean
    tone?: ScallopedCtaTone
  }>(),
  {
    buttonText: "Inquire now",
    buttonTo: "/contact",
    showButton: true,
    tone: undefined,
  }
)

const randomTone = ref<ScallopedCtaTone>("pink")

onMounted(() => {
  const tones: ScallopedCtaTone[] = ["pink", "blue", "green"]
  randomTone.value = tones[Math.floor(Math.random() * tones.length)] ?? "pink"
})

const selectedTone = computed(() => props.tone ?? randomTone.value)

const toneClasses: Record<ScallopedCtaTone, string> = {
  pink: "bg-hpink-200",
  blue: "bg-hblue-200",
  green: "bg-hgreen-300",
}

const buttonClasses: Record<ScallopedCtaTone, string> = {
  pink: "bg-hblue-200 hover:bg-hblue-300",
  blue: "bg-hgreen-300 hover:bg-hgreen-400",
  green: "bg-hblue-200 hover:bg-hblue-300",
}
</script>

<template>
  <section class="scalloped-paper text-hcharcoal-900">
    <div class="scalloped-paper__fill" :class="toneClasses[selectedTone]">
      <UContainer
        class="grid items-center gap-6 px-6 text-center sm:px-12"
        :class="{ 'lg:grid-cols-[1fr_auto] lg:text-left': props.showButton }"
      >
        <div :class="{ 'lg:text-center': props.showButton }">
          <p class="text-[0.65rem] font-semibold tracking-[0.22em] uppercase">
            {{ props.eyebrow }}
          </p>
          <h2 class="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
            {{ props.heading }}
          </h2>
          <p class="mx-auto mt-2 max-w-2xl text-sm leading-6">
            {{ props.content }}
          </p>
        </div>

        <UButton
          v-if="props.showButton"
          :to="props.buttonTo"
          size="xl"
          color="neutral"
          class="justify-self-center px-10 tracking-[0.14em] text-hcharcoal-950 uppercase lg:justify-self-end"
          :class="buttonClasses[selectedTone]"
        >
          {{ props.buttonText }}
        </UButton>
      </UContainer>
    </div>
  </section>
</template>
