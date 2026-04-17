<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-white dark:bg-neutral-950">
    <!-- Subtle grid background -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] opacity-40 dark:opacity-30"></div>

    <!-- Glow orbs -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-400/10 dark:bg-sky-500/8 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/8 dark:bg-blue-600/6 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative z-10 max-w-4xl mx-auto text-center">
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-sm font-medium text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/60 rounded-full">
        <span class="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
        {{ t.hero.badge }}
      </div>

      <!-- Main heading -->
      <h1 class="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-6 leading-[1.08]">
        {{ t.hero.title }}<br/>
        <span class="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
          {{ t.hero.titleHighlight }}
        </span>
      </h1>

      <!-- Subtitle -->
      <p class="text-lg sm:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
        {{ t.hero.subtitle }}
      </p>

      <!-- CTA buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="#courses"
          class="group inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-medium text-sm hover:bg-neutral-700 dark:hover:bg-neutral-100 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          {{ t.hero.cta }}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="transition-transform group-hover:translate-y-0.5 duration-200">
            <path d="M7 2L7 12M7 12L3 8M7 12L11 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a
          href="#how"
          class="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 rounded-xl font-medium text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200"
        >
          {{ t.hero.ctaSecondary }}
        </a>
      </div>

      <!-- Stats row -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-8 mt-16 pt-16 border-t border-neutral-200 dark:border-neutral-800">
        <div v-for="stat in stats" :key="stat.key" class="flex flex-col items-center gap-1">
          <span class="text-2xl font-semibold text-neutral-900 dark:text-white">{{ stat.value }}</span>
          <span class="text-sm text-neutral-500 dark:text-neutral-500">{{ t.hero[stat.key] }}</span>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 dark:opacity-30">
      <span class="text-xs text-neutral-500 dark:text-neutral-600 tracking-widest uppercase">Scroll</span>
      <div class="w-px h-10 bg-gradient-to-b from-neutral-400 dark:from-neutral-600 to-transparent"></div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const { t } = useI18n()

const stats = [
  { key: 'stat1', value: '2+' },
  { key: 'stat2', value: '0$' },
  { key: 'stat3', value: '✓' },
]
</script>
