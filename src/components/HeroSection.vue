<template>
  <section
    class="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-white dark:bg-neutral-950">
    <!-- Subtle grid background -->
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] opacity-40 dark:opacity-30">
    </div>

    <!-- Glow orbs -->
    <div
      class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-400/10 dark:bg-sky-500/8 rounded-full blur-3xl pointer-events-none">
    </div>
    <div
      class="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/8 dark:bg-blue-600/6 rounded-full blur-3xl pointer-events-none">
    </div>

    <div class="relative z-10 max-w-4xl mx-auto text-center">
      <!-- Badge -->
      <div
        class="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-sm font-medium text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/60 rounded-full">
        <span class="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
        {{ t.hero.badge }}
      </div>

      <!-- Main heading -->
      <h1
        class="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-6 leading-[1.08]">
        {{ t.hero.title }}<br />
        <span class="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
          {{ t.hero.titleHighlight }}
        </span>
      </h1>

      <!-- Subtitle -->
      <p
        class="text-lg sm:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
        {{ t.hero.subtitle }}
      </p>

      <!-- CTA buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a href="#courses"
          class="group inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-medium text-sm hover:bg-neutral-700 dark:hover:bg-neutral-100 transition-all duration-200 shadow-sm hover:shadow-md">
          {{ t.hero.cta }}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="transition-transform group-hover:translate-y-0.5 duration-200">
            <path d="M7 2L7 12M7 12L3 8M7 12L11 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </a>
        <button @click="isModalOpen = true"
          class="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 rounded-xl font-medium text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200">
          {{ t.hero.ctaSecondary }}
        </button>
      </div>

      <!-- Stats row -->
      <div
        class="flex flex-col sm:flex-row items-center justify-center gap-8 mt-16 pt-16 border-t border-neutral-200 dark:border-neutral-800">
        <div v-for="stat in stats" :key="stat.key" class="flex flex-col items-center gap-1">
          <span class="text-2xl font-semibold text-neutral-900 dark:text-white">{{ stat.value }}</span>
          <span class="text-sm text-neutral-500 dark:text-neutral-500">{{ t.hero[stat.key] }}</span>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div
      class="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 dark:opacity-30">
      <span class="text-xs text-neutral-500 dark:text-neutral-600 tracking-widest uppercase">Scroll</span>
      <div class="w-px h-10 bg-gradient-to-b from-neutral-400 dark:from-neutral-600 to-transparent"></div>
    </div>

    <!-- About Project Modal -->
    <Teleport to="body">
      <Transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <div v-if="isModalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-900/60 backdrop-blur-sm"
          @click="isModalOpen = false">
          <Transition enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100" leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div v-if="isModalOpen"
              class="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-2xl shadow-xl overflow-hidden"
              @click.stop>
              <!-- Modal Header -->
              <div
                class="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
                <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
                  {{ t.aboutProject.title }}
                </h3>
                <button @click="isModalOpen = false"
                  class="text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-300 transition-colors">
                  <span class="sr-only">{{ t.aboutProject.close }}</span>
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Modal Body -->
              <div class="p-6">
                <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm sm:text-base">
                  {{ t.aboutProject.description }}
                </p>
              </div>

              <!-- Modal Footer -->
              <div
                class="px-6 py-4 bg-neutral-50 dark:bg-neutral-950/50 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
                <button @click="isModalOpen = false"
                  class="px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-medium text-sm hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors">
                  {{ t.aboutProject.close }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const { t } = useI18n()

const stats = [
  { key: 'stat1', value: '2+' },
  { key: 'stat2', value: '0$' },
  { key: 'stat3', value: '✓' },
]

const isModalOpen = ref(false)
</script>
