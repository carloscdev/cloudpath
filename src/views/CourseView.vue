<template>
  <div class="min-h-screen bg-white dark:bg-neutral-950">
    <TheNavbar />

    <!-- Course hero header -->
    <div class="pt-24 pb-0 px-6 border-b border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div class="max-w-5xl mx-auto py-10">
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-sm text-neutral-400 dark:text-neutral-600 mb-6">
          <a href="/" class="hover:text-neutral-600 dark:hover:text-neutral-400" style="transition: color 200ms ease;">Inicio</a>
          <span>/</span>
          <a href="/" class="hover:text-neutral-600 dark:hover:text-neutral-400" style="transition: color 200ms ease;">Cursos</a>
          <span>/</span>
          <span class="text-neutral-600 dark:text-neutral-300">AWS Cloud Practitioner</span>
        </nav>

        <div class="flex flex-col sm:flex-row sm:items-start gap-5">
          <!-- Provider logo -->
          <div
            class="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 font-black text-lg tracking-tighter"
            style="background-color: #FF990015; border: 1px solid #FF990030; color: #FF9900;"
          >
            AWS
          </div>
          <div class="flex-1">
            <!-- Badge row -->
            <div class="flex flex-wrap items-center gap-2 mb-3">
              <span class="px-2 py-0.5 text-xs font-mono font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 rounded-md">CLF-C02</span>
              <span class="px-2.5 py-1 text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 rounded-full">100% Gratis</span>
              <span class="px-2.5 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 rounded-full">Nivel Fundamental</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white tracking-tight mb-2">
              AWS Certified Cloud Practitioner
            </h1>
            <p class="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-2xl">
              Guía completa para aprobar la certificación CLF-C02. Cubre los 4 dominios del examen oficial con conceptos clave, mejores prácticas y un simulador de examen con preguntas aleatorias.
            </p>

            <!-- Stats row -->
            <div class="flex flex-wrap gap-5 mt-4">
              <div v-for="stat in courseStats" :key="stat.label" class="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path :d="stat.icon" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                </svg>
                <span>{{ stat.value }}</span>
                <span>{{ stat.label }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Domain tabs -->
        <div class="flex gap-0 mt-8 overflow-x-auto -mb-px scrollbar-hide">
          <button
            v-for="domain in courseContent.domains"
            :key="domain.id"
            @click="activeDomain = domain.id"
            class="flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 shrink-0"
            :class="activeDomain === domain.id
              ? 'border-amber-500 text-neutral-900 dark:text-white'
              : 'border-transparent text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400 hover:border-neutral-200 dark:hover:border-neutral-700'"
            style="transition: color 200ms ease, border-color 200ms ease;"
          >
            <span
              class="w-5 h-5 rounded flex items-center justify-center text-xs font-bold"
              :class="activeDomain === domain.id
                ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600'"
            >{{ domain.number }}</span>
            {{ domain.title }}
            <span
              class="hidden sm:inline-block text-xs px-1.5 py-0.5 rounded font-medium"
              :class="activeDomain === domain.id
                ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600'"
            >{{ domain.weight }}%</span>
          </button>
          <!-- Exam tab -->
          <button
            @click="activeDomain = 'exam'"
            class="flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 shrink-0"
            :class="activeDomain === 'exam'
              ? 'border-amber-500 text-neutral-900 dark:text-white'
              : 'border-transparent text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400 hover:border-neutral-200 dark:hover:border-neutral-700'"
            style="transition: color 200ms ease, border-color 200ms ease;"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 2a5 5 0 1 0 0 10A5 5 0 0 0 7 2Zm0 0v2m0 6v2M2 7H0m14 0h-2M3.5 3.5 2 2m10 10-1.5-1.5M3.5 10.5 2 12M12 2l-1.5 1.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
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
                  <p class="text-xs font-medium tracking-widest uppercase text-amber-500 dark:text-amber-400 mb-1">
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
                  <p class="text-xs text-neutral-400 dark:text-neutral-600">temas</p>
                </div>
              </div>

              <DomainContent :domain="domain" :domain-color="'#FF9900'" />
            </div>
          </div>
        </div>

        <!-- Exam tab -->
        <div v-else key="exam">
          <div class="mb-8">
            <p class="text-xs font-medium tracking-widest uppercase text-amber-500 dark:text-amber-400 mb-1">
              Simulador de examen · CLF-C02
            </p>
            <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white tracking-tight">
              Practica con preguntas del examen
            </h2>
            <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              10 preguntas aleatorias de un banco de {{ examData.totalQuestions }}. Retroalimentación inmediata en cada respuesta.
            </p>
          </div>
          <ExamSimulator />
        </div>
      </Transition>

      <!-- Bottom navigation between domains -->
      <div v-if="activeDomain !== 'exam'" class="flex justify-between items-center mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800">
        <button
          v-if="prevDomain"
          @click="activeDomain = prevDomain.id"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 active:scale-95"
          style="transition: all 200ms cubic-bezier(0.34,1.56,0.64,1);"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M10.5 6.5h-8M5 3 1.5 6.5 5 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ prevDomain.title }}
        </button>
        <span v-else></span>
        <button
          v-if="nextDomain"
          @click="activeDomain = nextDomain.id"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-100 active:scale-95"
          style="transition: all 200ms cubic-bezier(0.34,1.56,0.64,1);"
        >
          {{ nextDomain.title }}
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2.5 6.5h8M8 3l3.5 3.5L8 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button
          v-else
          @click="activeDomain = 'exam'"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-amber-500 text-white hover:bg-amber-600 active:scale-95"
          style="transition: all 200ms cubic-bezier(0.34,1.56,0.64,1);"
        >
          Ir al examen
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2.5 6.5h8M8 3l3.5 3.5L8 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <TheFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TheNavbar from '../components/TheNavbar.vue'
import TheFooter from '../components/TheFooter.vue'
import DomainContent from '../components/course/DomainContent.vue'
import ExamSimulator from '../components/course/ExamSimulator.vue'
import courseContent from '../data/aws-ccp-content.json'
import examData from '../data/aws-ccp-exam.json'

const activeDomain = ref(courseContent.domains[0].id)

const allDomains = courseContent.domains

const currentDomainIndex = computed(() =>
  allDomains.findIndex(d => d.id === activeDomain.value)
)

const prevDomain = computed(() =>
  currentDomainIndex.value > 0 ? allDomains[currentDomainIndex.value - 1] : null
)

const nextDomain = computed(() =>
  currentDomainIndex.value < allDomains.length - 1 ? allDomains[currentDomainIndex.value + 1] : null
)

const courseStats = [
  { icon: 'M6 1.5v9M1.5 7l4.5 4.5L10.5 7', value: '4', label: 'dominios' },
  { icon: 'M6 1a5 5 0 1 0 0 10A5 5 0 0 0 6 1Zm0 2.5v2.5l2 2', value: '~40h', label: 'estudio' },
  { icon: 'M1.5 7.5h9M7 3l4.5 4.5L7 12', value: '40', label: 'preguntas simuladas' },
  { icon: 'M2 9l2-2 2 2 4-4', value: 'CLF-C02', label: 'código del examen' },
]
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
