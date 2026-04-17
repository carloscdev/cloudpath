<template>
  <!-- Render markdown-style bold with ** and normal text -->
  <span v-html="rendered"></span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: { type: String, required: true }
})

const rendered = computed(() => {
  return props.text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
})
</script>
