<template>
  <footer class="border-t border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-12 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <!-- Brand + description -->
        <div class="max-w-xs">
          <a href="/" class="flex items-center gap-2.5 mb-3 group">
            <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8.5C3 6.015 5.015 4 7.5 4C8.88 4 10.12 4.6 11 5.56" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M12 7.5C12 9.985 9.985 12 7.5 12C6.12 12 4.88 11.4 4 10.44" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="7.5" cy="8" r="1.5" fill="white"/>
              </svg>
            </div>
            <span class="font-semibold text-neutral-900 dark:text-white tracking-tight">Cloud<span class="text-sky-500">Path</span></span>
          </a>
          <p class="text-sm text-neutral-400 dark:text-neutral-500 leading-relaxed">
            {{ t.footer.description }}
          </p>
        </div>

        <!-- Links -->
        <div class="flex gap-10">
          <div>
            <p class="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-widest mb-3">{{ t.footer.links }}</p>
            <ul class="space-y-2">
              <li v-for="course in courses" :key="course.id">
                <router-link
                  :to="'/course/' + course.slug"
                  class="text-sm text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200 flex items-center gap-2"
                >
                  <span
                    class="w-1.5 h-1.5 rounded-full shrink-0"
                    :style="{ backgroundColor: course.color }"
                  ></span>
                  {{ course.title }}
                  <span v-if="!course.available" class="text-xs text-neutral-300 dark:text-neutral-700">(soon)</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-10 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-xs text-neutral-400 dark:text-neutral-600">
          © {{ currentYear }} CloudPath · {{ t.footer.rights }}
        </p>
        <div class="flex items-center gap-4">
          <!-- Version badge -->
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 text-[10px] font-mono font-medium">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <circle cx="4" cy="4" r="3" fill="currentColor" opacity="0.4"/>
              <circle cx="4" cy="4" r="1.5" fill="currentColor"/>
            </svg>
            v{{ appVersion }}
          </span>
          <p class="text-xs text-neutral-400 dark:text-neutral-600 flex items-center gap-1.5">
            {{ t.footer.madeWith }}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 10.5C6 10.5 1.5 7.5 1.5 4.5C1.5 3.12 2.62 2 4 2C4.89 2 5.67 2.47 6 3.14C6.33 2.47 7.11 2 8 2C9.38 2 10.5 3.12 10.5 4.5C10.5 7.5 6 10.5 6 10.5Z" fill="#ef4444" stroke="#ef4444" stroke-width="0.8" stroke-linejoin="round"/>
            </svg>
            {{ t.footer.by }}
            <a
              href="https://carlosc.dev"
              target="_blank"
              rel="noopener noreferrer"
              class="font-medium text-neutral-600 dark:text-neutral-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-200 underline underline-offset-2 decoration-neutral-200 dark:decoration-neutral-700 hover:decoration-sky-400"
            >
              Carlos Cordova
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from '../composables/useI18n.js'
import coursesData from '../data/courses.json'

const { t } = useI18n()

const courses = coursesData.courses
const appVersion = coursesData.appVersion
const currentYear = new Date().getFullYear()
</script>
