<template>
  <section id="courses" class="py-24 px-6 bg-white dark:bg-neutral-950">
    <div class="max-w-6xl mx-auto">
      <!-- Section header -->
      <div class="mb-14">
        <p class="text-xs font-medium tracking-widest uppercase text-sky-500 dark:text-sky-400 mb-4">
          {{ t.courses.sectionLabel }}
        </p>
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 class="text-4xl sm:text-5xl font-semibold text-neutral-900 dark:text-white tracking-tight mb-3">
              {{ t.courses.title }}
            </h2>
            <p class="text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed">
              {{ t.courses.subtitle }}
            </p>
          </div>
          <!-- Courses count -->
          <div class="flex items-center gap-2 shrink-0">
            <span class="text-5xl font-light text-neutral-200 dark:text-neutral-700">{{ courses.length }}</span>
            <span class="text-sm text-neutral-400 dark:text-neutral-600 leading-tight">cursos<br/>disponibles</span>
          </div>
        </div>
      </div>

      <!-- Courses grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <CourseCard
          v-for="course in courses"
          :key="course.id"
          :course="course"
        />
        <!-- Add more placeholder card -->
        <div class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 p-8 text-center min-h-[280px] opacity-50">
          <div class="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="text-neutral-400 dark:text-neutral-600"/>
            </svg>
          </div>
          <p class="text-sm font-medium text-neutral-400 dark:text-neutral-600">Más cursos próximamente</p>
          <p class="text-xs text-neutral-300 dark:text-neutral-700 mt-1">GCP, CompTIA, ...</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from '../composables/useI18n.js'
import CourseCard from './CourseCard.vue'
import coursesData from '../data/courses.json'

const { t } = useI18n()

const courses = coursesData.courses
</script>
