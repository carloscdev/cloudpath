<template>
  <div id="exam-section" class="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">

    <!-- Exam not started -->
    <div v-if="state === 'idle'" class="p-8 text-center">
      <div class="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 flex items-center justify-center mx-auto mb-5">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-amber-500">
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9 12h6M9 16h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Simulador de Examen</h3>
      <p class="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto mb-6 leading-relaxed">
        Recibirás <strong class="text-neutral-700 dark:text-neutral-300">10 preguntas aleatorias</strong> de un banco de <strong class="text-neutral-700 dark:text-neutral-300">{{ totalQuestions }} preguntas</strong> que cubren los 4 dominios del examen CLF-C02. Recibirás retroalimentación inmediata en cada respuesta.
      </p>
      <!-- Domain distribution -->
      <div class="flex flex-wrap justify-center gap-2 mb-8">
        <span class="px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
          Dominio 1: 24%
        </span>
        <span class="px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
          Dominio 2: 30%
        </span>
        <span class="px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
          Dominio 3: 34%
        </span>
        <span class="px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
          Dominio 4: 12%
        </span>
      </div>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          @click="startExam"
          class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-medium text-sm hover:bg-neutral-700 dark:hover:bg-neutral-100 active:scale-95"
          style="transition: background-color 200ms ease, transform 200ms cubic-bezier(0.34,1.56,0.64,1);"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 2l8 5-8 5V2Z" fill="currentColor"/>
          </svg>
          Iniciar examen
        </button>
        <button
          @click="shuffleQuestions"
          class="inline-flex items-center justify-center gap-2 px-6 py-3 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-xl font-medium text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 active:scale-95"
          style="transition: background-color 200ms ease, transform 200ms cubic-bezier(0.34,1.56,0.64,1);"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4h2.5L5 6M13 4h-2.5L9 6M1 10h2.5l4-6h3M8 10h5M11 8l2 2-2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Recargar preguntas
        </button>
      </div>
    </div>

    <!-- Active exam -->
    <div v-else-if="state === 'active'" class="p-6 sm:p-8">
      <!-- Progress header -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            Pregunta {{ currentIndex + 1 }} de {{ activeQuestions.length }}
          </span>
          <span class="px-2.5 py-0.5 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 rounded-full">
            {{ currentQuestion.domainName }}
          </span>
        </div>
        <span class="text-sm font-semibold text-neutral-900 dark:text-white">
          {{ correctCount }}/{{ answeredCount }} correctas
        </span>
      </div>

      <!-- Progress bar -->
      <div class="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-8 overflow-hidden">
        <div
          class="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-500"
          :style="{ width: progressWidth + '%', transition: 'width 500ms cubic-bezier(0.4,0,0.2,1)' }"
        ></div>
      </div>

      <!-- Question -->
      <Transition name="slide-q" mode="out-in">
        <div :key="currentIndex" class="space-y-5">
          <h3 class="text-base sm:text-lg font-medium text-neutral-900 dark:text-white leading-snug">
            {{ currentQuestion.question }}
          </h3>

          <!-- Options -->
          <div class="space-y-3">
            <button
              v-for="(option, i) in currentQuestion.options"
              :key="i"
              @click="selectAnswer(i)"
              :disabled="selectedAnswer !== null"
              class="w-full text-left flex items-start gap-3 p-4 rounded-xl border text-sm leading-relaxed"
              :class="getOptionClass(i)"
              style="transition: all 200ms ease;"
            >
              <!-- Option letter -->
              <span
                class="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                :class="getLetterClass(i)"
              >
                {{ String.fromCharCode(65 + i) }}
              </span>
              <span>{{ option }}</span>
              <!-- Result icon -->
              <span v-if="selectedAnswer !== null" class="ml-auto shrink-0 mt-0.5">
                <svg v-if="i === currentQuestion.correct" width="16" height="16" viewBox="0 0 16 16" fill="none" class="text-emerald-500">
                  <path d="M3 8l3 3 7-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg v-else-if="i === selectedAnswer" width="16" height="16" viewBox="0 0 16 16" fill="none" class="text-red-400">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
              </span>
            </button>
          </div>

          <!-- Feedback -->
          <Transition name="fade-up">
            <div
              v-if="selectedAnswer !== null"
              class="rounded-xl p-4 border"
              :class="isCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50'
                : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/50'"
            >
              <p class="text-sm font-semibold mb-1" :class="isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">
                {{ isCorrect ? '✓ ¡Correcto!' : '✗ Incorrecto' }}
              </p>
              <p class="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">{{ currentQuestion.explanation }}</p>
            </div>
          </Transition>

          <!-- Next button -->
          <Transition name="fade-up">
            <div v-if="selectedAnswer !== null" class="flex justify-end pt-2">
              <button
                @click="next"
                class="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-medium text-sm hover:bg-neutral-700 dark:hover:bg-neutral-100 active:scale-95"
                style="transition: background-color 200ms ease, transform 200ms cubic-bezier(0.34,1.56,0.64,1);"
              >
                {{ currentIndex < activeQuestions.length - 1 ? 'Siguiente' : 'Ver resultado' }}
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2.5 6.5h8M7 3l3.5 3.5L7 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </Transition>
        </div>
      </Transition>
    </div>

    <!-- Results -->
    <div v-else-if="state === 'results'" class="p-8 text-center">
      <!-- Score circle -->
      <div class="relative w-28 h-28 mx-auto mb-6">
        <svg class="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke-width="8" stroke="#e5e7eb" fill="none" class="dark:stroke-neutral-800"/>
          <circle
            cx="50" cy="50" r="40" stroke-width="8" fill="none"
            :stroke="scorePercent >= 70 ? '#22c55e' : '#ef4444'"
            stroke-linecap="round"
            :stroke-dasharray="`${2 * Math.PI * 40}`"
            :stroke-dashoffset="`${2 * Math.PI * 40 * (1 - scorePercent / 100)}`"
            style="transition: stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1);"
          />
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="text-2xl font-bold" :class="scorePercent >= 70 ? 'text-emerald-500' : 'text-red-500'">{{ scorePercent }}%</span>
          <span class="text-xs text-neutral-400 dark:text-neutral-500">{{ correctCount }}/{{ activeQuestions.length }}</span>
        </div>
      </div>

      <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
        {{ scorePercent >= 70 ? '¡Excelente resultado! 🎉' : 'Sigue practicando 💪' }}
      </h3>
      <p class="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
        Respondiste <strong class="text-neutral-700 dark:text-neutral-300">{{ correctCount }} de {{ activeQuestions.length }}</strong> preguntas correctamente.
      </p>
      <p class="text-xs text-neutral-400 dark:text-neutral-500 mb-8">
        {{ scorePercent >= 70
          ? 'Superaste el umbral del 70% necesario para aprobar el examen real.'
          : 'El puntaje mínimo para aprobar el examen real es del 70%. ¡Revisa los dominios y vuelve a intentarlo!' }}
      </p>

      <!-- Domain breakdown -->
      <div class="grid grid-cols-2 gap-3 mb-8 text-left">
        <div
          v-for="d in domainBreakdown"
          :key="d.domain"
          class="rounded-xl border border-neutral-100 dark:border-neutral-800 p-3"
        >
          <p class="text-xs text-neutral-400 dark:text-neutral-500 mb-1">Dominio {{ d.domain }}</p>
          <div class="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden mb-1">
            <div class="h-full rounded-full" :class="d.pct >= 70 ? 'bg-emerald-500' : 'bg-red-400'" :style="{ width: d.pct + '%' }"></div>
          </div>
          <p class="text-xs font-medium text-neutral-600 dark:text-neutral-400">{{ d.correct }}/{{ d.total }} — {{ d.pct }}%</p>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          @click="restart"
          class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-medium text-sm hover:bg-neutral-700 dark:hover:bg-neutral-100 active:scale-95"
          style="transition: background-color 200ms ease, transform 200ms cubic-bezier(0.34,1.56,0.64,1);"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7a5 5 0 1 1 1.5 3.5M2 11V7h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Reiniciar examen
        </button>
        <button
          @click="shuffleAndRestart"
          class="inline-flex items-center justify-center gap-2 px-6 py-3 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-xl font-medium text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 active:scale-95"
          style="transition: background-color 200ms ease, transform 200ms cubic-bezier(0.34,1.56,0.64,1);"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 4h2.5L5 6M13 4h-2.5L9 6M1 10h2.5l4-6h3M8 10h5M11 8l2 2-2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Nuevas preguntas
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  examData: { type: Object, required: true }
})

const allQuestions = props.examData.questions
const totalQuestions = props.examData.totalQuestions
const EXAM_SIZE = props.examData.questionsPerExam

// State
const state = ref('idle') // idle | active | results
const activeQuestions = ref([])
const currentIndex = ref(0)
const selectedAnswer = ref(null)
const answers = ref([]) // { questionId, selected, correct }

// Computed
const currentQuestion = computed(() => activeQuestions.value[currentIndex.value])
const isCorrect = computed(() => selectedAnswer.value === currentQuestion.value?.correct)
const answeredCount = computed(() => answers.value.length)
const correctCount = computed(() => answers.value.filter(a => a.isCorrect).length)
const progressWidth = computed(() => ((currentIndex.value) / activeQuestions.value.length) * 100)

const scorePercent = computed(() => {
  if (!activeQuestions.value.length) return 0
  return Math.round((correctCount.value / activeQuestions.value.length) * 100)
})

const domainBreakdown = computed(() => {
  const domains = [1, 2, 3, 4]
  return domains.map(d => {
    const dAnswers = answers.value.filter(a => a.domain === d)
    const total = dAnswers.length
    const correct = dAnswers.filter(a => a.isCorrect).length
    const pct = total ? Math.round((correct / total) * 100) : 0
    return { domain: d, total, correct, pct }
  }).filter(d => d.total > 0)
})

// Shuffle utility
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickQuestions() {
  const rawQuestions = shuffle(allQuestions).slice(0, EXAM_SIZE)
  
  // Create a copy and shuffle options for each question
  activeQuestions.value = rawQuestions.map(q => {
    const originalCorrectOption = q.options[q.correct]
    const shuffledOptions = shuffle([...q.options])
    const newCorrectIndex = shuffledOptions.indexOf(originalCorrectOption)
    
    return {
      ...q,
      options: shuffledOptions,
      correct: newCorrectIndex
    }
  })
}

function startExam() {
  if (!activeQuestions.value.length) pickQuestions()
  state.value = 'active'
  currentIndex.value = 0
  selectedAnswer.value = null
  answers.value = []
}

function shuffleQuestions() {
  pickQuestions()
}

function selectAnswer(i) {
  if (selectedAnswer.value !== null) return
  selectedAnswer.value = i
  answers.value.push({
    questionId: currentQuestion.value.id,
    domain: currentQuestion.value.domain,
    selected: i,
    isCorrect: i === currentQuestion.value.correct
  })
}

function next() {
  if (currentIndex.value < activeQuestions.value.length - 1) {
    currentIndex.value++
    selectedAnswer.value = null
  } else {
    state.value = 'results'
  }
}

function restart() {
  // Re-shuffle options for current active questions on restart
  activeQuestions.value = activeQuestions.value.map(q => {
    // Get the actual text of the correct answer before reshuffling
    const correctText = q.options[q.correct]
    const shuffledOptions = shuffle([...q.options])
    const newCorrectIndex = shuffledOptions.indexOf(correctText)
    
    return {
      ...q,
      options: shuffledOptions,
      correct: newCorrectIndex
    }
  })

  state.value = 'active'
  currentIndex.value = 0
  selectedAnswer.value = null
  answers.value = []
}

function shuffleAndRestart() {
  pickQuestions()
  state.value = 'idle'
}

// Option styling
function getOptionClass(i) {
  if (selectedAnswer.value === null) {
    return 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 cursor-pointer'
  }
  if (i === currentQuestion.value.correct) {
    return 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 text-neutral-800 dark:text-neutral-200 cursor-default'
  }
  if (i === selectedAnswer.value) {
    return 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/40 text-neutral-800 dark:text-neutral-200 cursor-default'
  }
  return 'border-neutral-100 dark:border-neutral-800 text-neutral-400 dark:text-neutral-600 cursor-default opacity-60'
}

function getLetterClass(i) {
  if (selectedAnswer.value === null) {
    return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
  }
  if (i === currentQuestion.value.correct) {
    return 'bg-emerald-500 text-white'
  }
  if (i === selectedAnswer.value) {
    return 'bg-red-400 text-white'
  }
  return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600'
}

// Init
pickQuestions()
</script>

<style scoped>
.slide-q-enter-active {
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-q-leave-active {
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-q-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-q-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-up-enter-active {
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
</style>
