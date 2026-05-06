<template>
  <div>
    <TheNavbar />
    <main>
      <HeroSection />
      <CoursesSection />
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import TheNavbar from '../components/TheNavbar.vue'
import HeroSection from '../components/HeroSection.vue'
import CoursesSection from '../components/CoursesSection.vue'
import TheFooter from '../components/TheFooter.vue'
import { useI18n } from '../composables/useI18n.js'

const { initLang } = useI18n()

onMounted(() => {
  initLang()
})
</script>
