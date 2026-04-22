<template>
  <div v-if="loading" class="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950">
    <div class="w-10 h-10 border-4 border-neutral-200 dark:border-neutral-800 border-t-sky-500 rounded-full animate-spin"></div>
  </div>

  <div v-else-if="courseInfo" class="min-h-screen bg-white dark:bg-neutral-950">
    <TheNavbar />

    <!-- Course hero header -->
    <div class="pt-24 pb-0 px-6 border-b border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div class="max-w-5xl mx-auto py-10">
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-sm text-neutral-400 dark:text-neutral-600 mb-6">
          <router-link to="/" class="hover:text-neutral-600 dark:hover:text-neutral-400"
            style="transition: color 200ms ease;">Inicio</router-link>
          <span>/</span>
          <router-link to="/" class="hover:text-neutral-600 dark:hover:text-neutral-400"
            style="transition: color 200ms ease;">Cursos</router-link>
          <span>/</span>
          <span class="text-neutral-600 dark:text-neutral-300">{{ courseInfo.title }}</span>
        </nav>

        <div class="flex flex-col sm:flex-row sm:items-start gap-5">
          <!-- Provider logo -->
          <div
            class="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 font-black text-lg tracking-tighter"
            :style="{ backgroundColor: courseInfo.color + '15', border: `1px solid ${courseInfo.color}30`, color: courseInfo.color }">
            {{ courseInfo.providerLogo === 'aws' ? 'AWS' : 'Az' }}
          </div>
          <div class="flex-1">
            <!-- Badge row -->
            <div class="flex flex-wrap items-center gap-2 mb-3">
              <span
                class="px-2 py-0.5 text-xs font-mono font-medium rounded-md"
                :class="courseInfo.badgeColor">
                {{ courseInfo.badge }}
              </span>
              <span
                class="px-2.5 py-1 text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 rounded-full">100% Gratis</span>
              <span
                class="px-2.5 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 rounded-full">
                {{ courseInfo.level }}
              </span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white tracking-tight mb-2">
              {{ courseInfo.title }}
            </h1>
            <p class="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-2xl">
              {{ courseInfo.description }}
            </p>

            <!-- Stats row -->
            <div class="flex flex-wrap gap-5 mt-4">
              <div v-for="stat in courseStats" :key="stat.label"
                class="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path :d="stat.icon" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
                </svg>
                <span>{{ stat.value }}</span>
                <span>{{ stat.label }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Domain tabs -->
        <div class="flex gap-0 mt-8 overflow-x-auto -mb-px scrollbar-hide">
          <button v-for="domain in courseContent.domains" :key="domain.id" @click="activeDomain = domain.id"
            class="flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 shrink-0 transition-all duration-300"
            :class="activeDomain === domain.id
              ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
              : 'border-transparent text-neutral-400 dark:text-neutral-50 hover:text-neutral-600 dark:hover:text-neutral-400 hover:border-neutral-200 dark:hover:border-neutral-700'"
            :style="activeDomain === domain.id ? `border-color: ${courseInfo.color}` : ''">
            <span class="w-5 h-5 rounded flex items-center justify-center text-xs font-bold"
              :style="activeDomain === domain.id ? `background-color: ${courseInfo.color}20; color: ${courseInfo.color}` : 'background-color: #f5f5f5; color: #737373;'">
              {{ domain.number }}
            </span>
            {{ domain.title }}
            <span class="hidden sm:inline-block text-xs px-1.5 py-0.5 rounded font-medium ml-1"
              :style="activeDomain === domain.id ? `background-color: ${courseInfo.color}15; color: ${courseInfo.color}` : 'background-color: #f5f5f5; color: #737373;'">
              {{ domain.weight }}%
            </span>
          </button>
          <!-- Exam tab -->
          <button @click="activeDomain = 'exam'"
            class="flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 shrink-0"
            :class="activeDomain === 'exam'
              ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
              : 'border-transparent text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400 hover:border-neutral-200 dark:hover:border-neutral-700'"
            :style="activeDomain === 'exam' ? `border-color: ${courseInfo.color}` : ''">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7 2a5 5 0 1 0 0 10A5 5 0 0 0 7 2Zm0 0v2m0 6v2M2 7H0m14 0h-2M3.5 3.5 2 2m10 10-1.5-1.5M3.5 10.5 2 12M12 2l-1.5 1.5"
                stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
            </svg>
            Examen
          </button>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="max-w-5xl mx-auto px-6 py-10">
      <!-- Domain content -->
      <Transition name="tab-fade" mode="out-in">
        <div v-if="activeDomain !== 'exam'" :key="activeDomain">
          <div v-for="domain in courseContent.domains" :key="domain.id">
            <div v-if="activeDomain === domain.id">
              <!-- Domain intro -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <p class="text-xs font-medium tracking-widest uppercase mb-1" :style="{ color: courseInfo.color }">
                    Dominio {{ domain.number }} · {{ domain.weight }}% del examen
                  </p>
                  <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white tracking-tight">
                    {{ domain.title }}
                  </h2>
                  <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{{ domain.description }}</p>
                </div>
                <!-- Topics count -->
                <div class="shrink-0 text-right">
                  <span class="text-4xl font-light text-neutral-200 dark:text-neutral-800">{{ domain.topics.length }}</span>
                  <p class="text-xs text-neutral-400 dark:text-neutral-600">secciones</p>
                </div>
              </div>

              <DomainContent :domain="domain" :domain-color="courseInfo.color" />
            </div>
          </div>
        </div>

        <!-- Exam tab -->
        <div v-else key="exam">
          <div class="mb-8">
            <p class="text-xs font-medium tracking-widest uppercase mb-1" :style="{ color: courseInfo.color }">
              Simulador de examen · {{ courseInfo.badge }}
            </p>
            <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white tracking-tight">
              Practica con preguntas del examen
            </h2>
            <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              {{ examData.questionsPerExam }} preguntas aleatorias de un banco de {{ examData.totalQuestions }}. Retroalimentación inmediata.
            </p>
          </div>
          <ExamSimulator :exam-data="examData" />
        </div>
      </Transition>

      <!-- Bottom navigation between domains -->
      <div v-if="activeDomain !== 'exam'"
        class="flex justify-between items-center mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800">
        <button v-if="prevDomain" @click="activeDomain = prevDomain.id"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 active:scale-95 transition-all">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M10.5 6.5h-8M5 3 1.5 6.5 5 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          {{ prevDomain.title }}
        </button>
        <span v-else></span>
        <button v-if="nextDomain" @click="activeDomain = nextDomain.id"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-100 active:scale-95 transition-all">
          {{ nextDomain.title }}
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2.5 6.5h8M8 3l3.5 3.5L8 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
        <button v-else @click="activeDomain = 'exam'"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white hover:opacity-90 active:scale-95 transition-all"
          :style="{ backgroundColor: courseInfo.color }">
          Ir al examen
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2.5 6.5h8M8 3l3.5 3.5L8 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>

    <TheFooter />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import TheNavbar from '../components/TheNavbar.vue'
import TheFooter from '../components/TheFooter.vue'
import DomainContent from '../components/course/DomainContent.vue'
import ExamSimulator from '../components/course/ExamSimulator.vue'
import coursesData from '../data/courses.json'

// Data files mapping
const dataMap = {
  'aws-cloud-practitioner': {
    content: () => import('../data/aws-ccp-content.json'),
    exam: () => import('../data/aws-ccp-exam.json')
  },
  'az-900': {
    content: () => import('../data/azure-az900-content.json'),
    exam: () => import('../data/azure-az900-exam.json')
  }
}

const route = useRoute()
const loading = ref(true)
const courseInfo = ref(null)
const courseContent = ref(null)
const examData = ref(null)
const activeDomain = ref('')

async function loadCourse() {
  loading.value = true
  const id = route.params.id
  
  // Load general info from courses.json
  const info = coursesData.courses.find(c => c.slug === id)
  if (!info) {
    // Handle 404 or redirect
    return
  }
  courseInfo.value = info
  
  // Dyamic load content and exam
  if (dataMap[id]) {
    const [contentMod, examMod] = await Promise.all([
      dataMap[id].content(),
      dataMap[id].exam()
    ])
    courseContent.value = contentMod.default || contentMod
    examData.value = examMod.default || examMod
    activeDomain.value = courseContent.value.domains[0].id
  }
  
  loading.value = false
  window.scrollTo(0, 0)
}

watch(() => route.params.id, loadCourse)
onMounted(loadCourse)

const allDomains = computed(() => courseContent.value?.domains || [])

const currentDomainIndex = computed(() =>
  allDomains.value.findIndex(d => d.id === activeDomain.value)
)

const prevDomain = computed(() =>
  currentDomainIndex.value > 0 ? allDomains.value[currentDomainIndex.value - 1] : null
)

const nextDomain = computed(() =>
  currentDomainIndex.value < allDomains.value.length - 1 ? allDomains.value[currentDomainIndex.value + 1] : null
)

const courseStats = computed(() => [
  { icon: 'M6 1.5v9M1.5 7l4.5 4.5L10.5 7', value: allDomains.value.length, label: 'dominios' },
  { icon: 'M1.5 7.5h9M7 3l4.5 4.5L7 12', value: examData.value?.totalQuestions || 0, label: 'preguntas' },
  { icon: 'M2 9l2-2 2 2 4-4', value: courseInfo.value?.badge || '', label: 'código' },
])
</script>

<style scoped>
.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}

.tab-fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.tab-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
