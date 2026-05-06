<template>
  <div>
    <div v-if="loading" class="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950">
      <div
        class="w-10 h-10 border-4 border-neutral-200 dark:border-neutral-800 border-t-sky-500 rounded-full animate-spin">
      </div>
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

          <div class="flex flex-col md:flex-row md:items-center justify-between gap-8">
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
                  <span class="px-2 py-0.5 text-xs font-mono font-medium rounded-md" :class="courseInfo.badgeColor">
                    {{ courseInfo.badge }}
                  </span>
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

            <!-- Quick Access Exam Button -->
            <div class="shrink-0">
              <button @click="activeDomain = 'exam'"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-white font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 group"
                :style="{ backgroundColor: courseInfo.color, boxShadow: `0 10px 30px -10px ${courseInfo.color}60` }">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"></path>
                  <path d="M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"></path>
                </svg>
                <span>IR AL EXAMEN</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  class="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Domain tabs navigation -->
          <div ref="scrollContainer"
            class="flex overflow-x-auto items-center gap-0 mt-8 border-b border-neutral-100 dark:border-neutral-800 custom-scrollbar cursor-grab active:cursor-grabbing select-none outline-none [-webkit-tap-highlight-color:transparent]"
            @mousedown="startDragging" @mouseleave="stopDragging" @mouseup="stopDragging" @mousemove="moveDragging">
            <button v-for="domain in courseContent.domains" :key="domain.id" @click="handleTabClick(domain.id)"
              class="relative flex items-center gap-3 px-5 py-5 text-sm font-medium transition-all duration-300 shrink-0 pointer-events-auto outline-none focus:outline-none"
              :class="activeDomain === domain.id
                ? 'text-neutral-900 dark:text-white'
                : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'">
              <span
                class="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold transition-all duration-300"
                :style="activeDomain === domain.id
                  ? `background-color: ${courseInfo.color}; color: white; transform: scale(1.1);`
                  : ''"
                :class="activeDomain !== domain.id ? 'bg-neutral-100 dark:bg-neutral-900 text-neutral-400 dark:text-neutral-600' : ''">
                {{ domain.number }}
              </span>
              <span class="whitespace-nowrap">{{ domain.title }}</span>

              <!-- Underline indicator for active tab -->
              <div v-if="activeDomain === domain.id"
                class="absolute bottom-0 left-0 right-0 h-0.5 z-10 mx-2 rounded-t-full"
                :style="{ backgroundColor: courseInfo.color }">
              </div>
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
                    <span class="text-4xl font-light text-neutral-200 dark:text-neutral-800">{{ domain.topics.length
                    }}</span>
                    <p class="text-xs text-neutral-400 dark:text-neutral-600">secciones</p>
                  </div>
                </div>

                <DomainContent :domain="domain" :domain-color="courseInfo.color" />

                <!-- Finish Course CTA -->
                <div v-if="!nextDomain"
                  class="mt-16 p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 text-center">
                  <div
                    class="w-16 h-16 rounded-2xl bg-white dark:bg-neutral-800 shadow-sm flex items-center justify-center mx-auto mb-6">
                    <span class="text-2xl">🎉</span>
                  </div>
                  <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-2">¡Has completado el repaso!</h3>
                  <p class="text-sm text-neutral-500 dark:text-neutral-400 mb-8 max-w-sm mx-auto">
                    Ya has repasado todos los temas clave. ¿Estás listo para poner a prueba tus conocimientos?
                  </p>
                  <button @click="activeDomain = 'exam'"
                    class="px-8 py-3.5 rounded-xl text-white font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all"
                    :style="{ backgroundColor: courseInfo.color }">
                    Realizar examen simulacro
                  </button>
                </div>
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
                {{ examData.questionsPerExam }} preguntas aleatorias de un banco de {{ examData.totalQuestions }}.
                Retroalimentación inmediata.
              </p>
            </div>
            <ExamSimulator :exam-data="examData" :course-info="courseInfo" :course-content="courseContent" />
          </div>
        </Transition>

        <!-- Bottom navigation between domains -->
        <div v-if="activeDomain !== 'exam'"
          class="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-4 mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800">
          <button v-if="prevDomain" @click="activeDomain = prevDomain.id"
            class="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-medium border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 active:scale-95 transition-all">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M10.5 6.5h-8M5 3 1.5 6.5 5 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            <span class="truncate">{{ prevDomain.title }}</span>
          </button>
          <span v-else class="hidden sm:block"></span>

          <button v-if="nextDomain" @click="activeDomain = nextDomain.id"
            class="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-medium bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-100 active:scale-95 transition-all">
            <span class="truncate text-center">Sig: {{ nextDomain.title }}</span>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" class="shrink-0">
              <path d="M2.5 6.5h8M8 3l3.5 3.5L8 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
          <button v-else @click="activeDomain = 'exam'"
            class="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-medium text-white hover:opacity-90 active:scale-95 transition-all"
            :style="{ backgroundColor: courseInfo.color }">
            Finalizar y dar examen
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" class="shrink-0">
              <path d="M2.5 6.5h8M8 3l3.5 3.5L8 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <TheFooter />
    </div>
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
const scrollContainer = ref(null)

// Drag to scroll logic
let isDown = false
let isDragging = false
let startX
let scrollLeft

function startDragging(e) {
  isDown = true
  isDragging = false
  startX = e.pageX - scrollContainer.value.offsetLeft
  scrollLeft = scrollContainer.value.scrollLeft
}

function stopDragging() {
  isDown = false
}

function moveDragging(e) {
  if (!isDown) return
  e.preventDefault()
  const x = e.pageX - scrollContainer.value.offsetLeft
  const walk = (x - startX) * 1.5
  if (Math.abs(walk) > 5) isDragging = true
  scrollContainer.value.scrollLeft = scrollLeft - walk
}

function handleTabClick(domainId) {
  if (isDragging) return
  activeDomain.value = domainId
}

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

.custom-scrollbar::-webkit-scrollbar {
  display: none;
}

.custom-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@media (min-width: 1024px) {
  .custom-scrollbar::-webkit-scrollbar {
    display: block;
    height: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #e5e5e5;
    border-radius: 10px;
  }

  .dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #262626;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #d4d4d4;
  }

  .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #404040;
  }
}
</style>
