<template>
  <div class="space-y-6">
    <div
      v-for="topic in domain.topics"
      :key="topic.id"
      :id="topic.id"
      class="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden"
      style="transition: box-shadow 300ms ease;"
    >
      <!-- Topic header -->
      <button
        @click="toggle(topic.id)"
        class="w-full flex items-center justify-between p-5 text-left group"
        style="transition: background-color 200ms ease;"
        :class="openTopics.has(topic.id) ? 'bg-neutral-50 dark:bg-neutral-800/50' : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/30'"
      >
        <div class="flex items-center gap-3">
          <!-- Icon -->
          <div
            class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            :style="{ backgroundColor: domainColor + '15', border: `1px solid ${domainColor}25` }"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" :style="{ color: domainColor }">
              <path v-if="topic.icon === 'cloud'"      d="M3 10a3 3 0 1 1 2.83-4H8a3 3 0 1 1 0 4H3Z" stroke="currentColor" stroke-width="1.3"/>
              <path v-if="topic.icon === 'server'"     d="M2 4h12v3H2zm0 5h12v3H2z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
              <path v-if="topic.icon === 'globe'"      d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2Zm0 0c0 0-3 3-3 6s3 6 3 6m0-12c0 0 3 3 3 6s-3 6-3 6M2 8h12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <path v-if="topic.icon === 'layers'"     d="M8 2 2 5l6 3 6-3-6-3ZM2 11l6 3 6-3M2 8l6 3 6-3" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round"/>
              <path v-if="topic.icon === 'shield'"     d="M8 2 3 4v4c0 3 2.5 5 5 6 2.5-1 5-3 5-6V4L8 2Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
              <path v-if="topic.icon === 'key'"        d="M10 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM6 10l-4 4M6 10l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <path v-if="topic.icon === 'lock'"       d="M5 7V5a3 3 0 0 1 6 0v2m-7 0h8v7H4V7Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
              <path v-if="topic.icon === 'check-circle'" d="M5 8l2 2 4-4M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
              <path v-if="topic.icon === 'cpu'"        d="M5 3h6v10H5zM3 6h2M3 10h2M11 6h2M11 10h2M6 1v2M10 1v2M6 13v2M10 13v2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <path v-if="topic.icon === 'database'"   d="M8 4C5.79 4 4 4.9 4 6s1.79 2 4 2 4-.9 4-2-1.79-2-4-2ZM4 6v4c0 1.11 1.79 2 4 2s4-.89 4-2V6M4 8c0 1.11 1.79 2 4 2s4-.89 4-2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <path v-if="topic.icon === 'table'"      d="M2 4h12v8H2zM2 7h12M2 10h12M6 4v7M10 4v7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <path v-if="topic.icon === 'network'"    d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM4 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM8 8l-2 3M8 8l2 3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <path v-if="topic.icon === 'sparkles'"   d="M8 2v2M8 12v2M2 8h2M12 8h2M4.22 4.22l1.42 1.42M10.36 10.36l1.42 1.42M4.22 11.78l1.42-1.42M10.36 5.64l1.42-1.42M8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <path v-if="topic.icon === 'dollar'"     d="M8 2v12M5.5 9.5C5.5 10.88 6.62 12 8 12s2.5-1.12 2.5-2.5S9.38 8 8 8s-2.5-.62-2.5-2 1.12-2 2.5-2 2.5.62 2.5 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <path v-if="topic.icon === 'chart'"      d="M2 12h12M5 12V8M8 12V5M11 12V9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <path v-if="topic.icon === 'headset'"    d="M3 9V8a5 5 0 0 1 10 0v1M3 9a2 2 0 0 0 0 4v-4Zm10 0a2 2 0 0 1 0 4v-4ZM13 13v1a2 2 0 0 1-2 2H9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
          </div>
          <h3 class="font-semibold text-neutral-800 dark:text-white text-sm sm:text-base">{{ topic.title }}</h3>
        </div>

        <!-- Chevron -->
        <div
          class="w-6 h-6 flex items-center justify-center rounded-lg text-neutral-400 dark:text-neutral-600 shrink-0"
          style="transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);"
          :style="openTopics.has(topic.id) ? 'transform: rotate(180deg)' : ''"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </button>

      <!-- Topic content — animated expand/collapse -->
      <Transition
        name="expand"
        @enter="onEnter"
        @after-enter="onAfterEnter"
        @leave="onLeave"
      >
        <div v-if="openTopics.has(topic.id)" class="overflow-hidden">
          <div class="px-5 pb-6 pt-1 border-t border-neutral-100 dark:border-neutral-800">
            <!-- Sections -->
            <div class="space-y-5 mt-4">
              <div v-for="(section, si) in topic.sections" :key="si">
                <h4 class="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
                  {{ section.heading }}
                </h4>
                <ul class="space-y-2">
                  <li
                    v-for="(point, pi) in section.points"
                    :key="pi"
                    class="flex gap-2.5 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed"
                  >
                    <span class="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-neutral-300 dark:bg-neutral-600"></span>
                    <RichText :text="point" />
                  </li>
                </ul>
              </div>
            </div>

            <!-- Key Points -->
            <div class="mt-6 rounded-xl p-4 border" :style="{ backgroundColor: domainColor + '08', borderColor: domainColor + '25' }">
              <p class="text-xs font-semibold uppercase tracking-widest mb-3" :style="{ color: domainColor }">
                💡 Puntos clave para el examen
              </p>
              <ul class="space-y-1.5">
                <li
                  v-for="(kp, i) in topic.keyPoints"
                  :key="i"
                  class="flex gap-2 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="mt-0.5 shrink-0" :style="{ color: domainColor }">
                    <path d="M2.5 7l3 3 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <RichText :text="kp" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RichText from './RichText.vue'

const props = defineProps({
  domain: { type: Object, required: true },
  domainColor: { type: String, default: '#FF9900' }
})

const openTopics = ref(new Set([props.domain.topics[0]?.id]))

function toggle(id) {
  if (openTopics.value.has(id)) {
    openTopics.value.delete(id)
  } else {
    openTopics.value.add(id)
  }
  openTopics.value = new Set(openTopics.value)
}

// Smooth height animation helpers
function onEnter(el) {
  el.style.height = '0px'
  el.style.opacity = '0'
  requestAnimationFrame(() => {
    el.style.transition = 'height 350ms cubic-bezier(0.4,0,0.2,1), opacity 300ms ease'
    el.style.height = el.scrollHeight + 'px'
    el.style.opacity = '1'
  })
}
function onAfterEnter(el) {
  el.style.height = 'auto'
  el.style.transition = ''
}
function onLeave(el) {
  el.style.height = el.scrollHeight + 'px'
  el.style.opacity = '1'
  requestAnimationFrame(() => {
    el.style.transition = 'height 300ms cubic-bezier(0.4,0,0.2,1), opacity 250ms ease'
    el.style.height = '0px'
    el.style.opacity = '0'
  })
}
</script>
