<template>
  <div class="group relative flex flex-col rounded-2xl border overflow-hidden" :class="[
    course.available
      ? 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-2xl dark:hover:shadow-black/40 hover:-translate-y-1 cursor-pointer'
      : 'bg-white dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800/40 opacity-60',
  ]"
    style="transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 400ms cubic-bezier(0.4, 0, 0.2, 1), border-color 300ms ease;"
    @click="goToCourse">
    <!-- Top accent bar -->
    <div class="h-0.5 w-full" :class="course.available ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'"
      :style="{ background: `linear-gradient(to right, ${course.color}40, ${course.color})`, transition: 'opacity 400ms cubic-bezier(0.4, 0, 0.2, 1)' }">
    </div>

    <div class="p-6 flex flex-col flex-1">
      <!-- Header -->
      <div class="flex items-start justify-between mb-5">
        <!-- Provider icon -->
        <div class="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold group-hover:scale-110"
          :style="{ backgroundColor: course.color + '15', border: `1px solid ${course.color}30`, transition: 'transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)' }">
          <span v-if="course.providerLogo === 'aws'" class="text-base font-black tracking-tighter"
            :style="{ color: course.color }">AWS</span>
          <span v-else-if="course.providerLogo === 'azure'" class="text-xs font-black"
            :style="{ color: course.color }">Az</span>
          <span v-else class="text-sm font-bold" :style="{ color: course.color }">{{ course.provider[0] }}</span>
        </div>

        <!-- Badges -->
        <div class="flex items-center gap-2">
          <!-- Coming soon badge -->
          <span v-if="course.comingSoon"
            class="px-2.5 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded-full">
            {{ t.courses.comingSoon }}
          </span>
          <!-- Free badge -->
          <span
            class="px-2.5 py-1 text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 rounded-full">
            {{ t.courses.free }}
          </span>
        </div>
      </div>

      <!-- Exam badge -->
      <div class="mb-3">
        <span class="inline-flex items-center px-2 py-0.5 text-xs font-mono font-medium rounded-md"
          :class="course.badgeColor">
          {{ course.badge }}
        </span>
      </div>

      <!-- Title + description -->
      <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-2 leading-snug">
        {{ course.title }}
      </h3>
      <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-5 flex-1">
        {{ course.description }}
      </p>

      <!-- Meta info -->
      <div class="flex items-center gap-4 mb-5 text-xs text-neutral-400 dark:text-neutral-500">
        <div class="flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.5" y="2" width="9" height="8" rx="1" stroke="currentColor" stroke-width="1.2" />
            <path d="M4 5.5H8M4 7.5H6.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
          </svg>
          {{ course.topics }} {{ t.courses.topics }}
        </div>
        <div class="flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.2" />
            <path d="M4.5 5C4.5 4.17 5.17 3.5 6 3.5C6.83 3.5 7.5 4.17 7.5 5C7.5 5.83 6 6.5 6 7M6 8.5V9"
              stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
          </svg>
          {{ course.questions }} {{ t.courses.questions }}
        </div>
      </div>

      <!-- Level pill -->
      <div class="flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 pt-4">
        <div class="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
          <span>{{ t.courses.level }}:</span>
          <span class="font-medium text-neutral-600 dark:text-neutral-300">{{ course.level }}</span>
        </div>

        <!-- CTA -->
        <button v-if="course.available"
          class="group/btn inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white shadow-sm hover:scale-105 active:scale-95"
          :style="{ backgroundColor: course.color, transition: 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 300ms ease, filter 200ms ease' }"
          onmouseover="this.style.filter='brightness(1.1)'" onmouseout="this.style.filter='brightness(1)'">
          {{ t.courses.startCourse }}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"
            style="transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);"
            class="group-hover/btn:translate-x-1">
            <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>

        <!-- Lock icon for unavailable courses -->
        <div v-else class="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="5.5" width="8" height="5.5" rx="1" stroke="currentColor" stroke-width="1.2" />
            <path d="M4 5.5V4C4 2.9 4.9 2 6 2C7.1 2 8 2.9 8 4V5.5" stroke="currentColor" stroke-width="1.2"
              stroke-linecap="round" />
          </svg>
          {{ t.courses.comingSoon }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from '../composables/useI18n.js'

const { t } = useI18n()
const router = useRouter()

const props = defineProps({
  course: {
    type: Object,
    required: true
  }
})

const goToCourse = () => {
  if (props.course.available) {
    router.push(`/course/${props.course.slug}`)
  }
}
</script>
