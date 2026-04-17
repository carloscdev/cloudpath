<template>
  <header
    class="fixed top-0 left-0 right-0 z-50"
    :class="[
      scrolled
        ? 'bg-white/85 dark:bg-neutral-950/85 backdrop-blur-2xl border-b border-neutral-200/60 dark:border-neutral-800/60 shadow-sm'
        : 'bg-transparent border-b border-transparent'
    ]"
    style="transition: background-color 400ms cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 400ms ease, border-color 400ms ease, box-shadow 400ms ease;"
  >
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2.5 group">
        <div
          class="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-sm group-hover:shadow-sky-200 dark:group-hover:shadow-sky-900/50 transition-shadow duration-300"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 8.5C3 6.015 5.015 4 7.5 4C8.88 4 10.12 4.6 11 5.56" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M12 7.5C12 9.985 9.985 12 7.5 12C6.12 12 4.88 11.4 4 10.44" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            <circle cx="7.5" cy="8" r="1.5" fill="white"/>
          </svg>
        </div>
        <span class="font-semibold text-neutral-900 dark:text-white tracking-tight text-lg">
          Cloud<span class="text-sky-500">Path</span>
        </span>
      </a>

      <!-- Nav actions -->
      <div class="flex items-center gap-2">
        <!-- Lang toggle -->
        <button
          @click="toggleLang"
          class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg active:scale-95"
          style="transition: color 200ms ease, background-color 200ms ease, transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);"
          :title="currentLang === 'es' ? 'Switch to English' : 'Cambiar a Español'"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.2"/>
            <path d="M8 1C8 1 5.5 4 5.5 8C5.5 12 8 15 8 15" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            <path d="M8 1C8 1 10.5 4 10.5 8C10.5 12 8 15 8 15" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            <path d="M1.5 8H14.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            <path d="M2 5.5H14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            <path d="M2 10.5H14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
          <span>{{ currentLang === 'es' ? 'EN' : 'ES' }}</span>
        </button>

        <!-- Theme toggle -->
        <button
          @click="toggleTheme"
          class="w-9 h-9 flex items-center justify-center rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95"
          style="transition: color 200ms ease, background-color 200ms ease, transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);"
          :title="isDark ? 'Light mode' : 'Dark mode'"
        >
          <!-- Sun icon -->
          <svg v-if="isDark" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.3"/>
            <path d="M8 1V2.5M8 13.5V15M1 8H2.5M13.5 8H15M3.05 3.05L4.1 4.1M11.9 11.9L12.95 12.95M12.95 3.05L11.9 4.1M4.1 11.9L3.05 12.95" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          </svg>
          <!-- Moon icon -->
          <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 9.5C12.5 11.5 10.4 12.9 8 12.9C4.7 12.9 2 10.2 2 6.9C2 4.5 3.4 2.4 5.5 1.4C4.8 2.4 4.5 3.6 4.5 4.9C4.5 8.2 7.2 10.9 10.5 10.9C11.8 10.9 13 10.5 14 9.9L13.5 9.5Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Free badge -->
        <span class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 rounded-full">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          {{ t.nav.free }}
        </span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../composables/useTheme.js'
import { useI18n } from '../composables/useI18n.js'

const { isDark, toggleTheme } = useTheme()
const { t, currentLang, toggleLang } = useI18n()

const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
