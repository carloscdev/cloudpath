// Composable for i18n (language) management
import { ref, computed } from 'vue'

const currentLang = ref('es')

const translations = {
  es: {
    nav: {
      courses: 'Cursos',
      about: 'Acerca de',
      free: '100% Gratuito',
    },
    hero: {
      badge: 'Plataforma de estudio gratuita',
      title: 'Certifícate en la nube',
      titleHighlight: 'sin costo alguno',
      subtitle: 'Estudia para las certificaciones cloud más reconocidas con guías, flashcards y simuladores de examen. Todo libre, sin registros, sin límites.',
      cta: 'Explorar cursos',
      ctaSecondary: 'Ver cómo funciona',
      stat1: 'Cursos disponibles',
      stat2: 'Completamente gratis',
      stat3: 'Sin registro requerido',
    },
    courses: {
      sectionLabel: 'Cursos disponibles',
      title: 'Elige tu certificación',
      subtitle: 'Selecciona el curso que deseas estudiar. Todos son completamente gratuitos y están diseñados para ayudarte a pasar tu examen.',
      startCourse: 'Comenzar curso',
      comingSoon: 'Próximamente',
      free: 'Gratis',
      level: 'Nivel',
      duration: 'Duración',
      topics: 'temas',
      questions: 'preguntas',
    },
    footer: {
      description: 'Plataforma gratuita de preparación para certificaciones cloud. Aprende a tu ritmo, cuando quieras.',
      links: 'Cursos',
      madeWith: 'Hecho con',
      by: 'por',
      rights: 'Todos los derechos reservados.',
    }
  },
  en: {
    nav: {
      courses: 'Courses',
      about: 'About',
      free: '100% Free',
    },
    hero: {
      badge: 'Free study platform',
      title: 'Get cloud certified',
      titleHighlight: 'at no cost',
      subtitle: 'Study for the most recognized cloud certifications with guides, flashcards, and exam simulators. All free, no sign-up, no limits.',
      cta: 'Explore courses',
      ctaSecondary: 'How it works',
      stat1: 'Available courses',
      stat2: 'Completely free',
      stat3: 'No sign-up required',
    },
    courses: {
      sectionLabel: 'Available courses',
      title: 'Choose your certification',
      subtitle: 'Select the course you want to study. All are completely free and designed to help you pass your exam.',
      startCourse: 'Start course',
      comingSoon: 'Coming soon',
      free: 'Free',
      level: 'Level',
      duration: 'Duration',
      topics: 'topics',
      questions: 'questions',
    },
    footer: {
      description: 'Free cloud certification preparation platform. Learn at your own pace, whenever you want.',
      links: 'Courses',
      madeWith: 'Made with',
      by: 'by',
      rights: 'All rights reserved.',
    }
  }
}

export function useI18n() {
  const t = computed(() => translations[currentLang.value])

  const toggleLang = () => {
    currentLang.value = currentLang.value === 'es' ? 'en' : 'es'
    localStorage.setItem('cloudpath-lang', currentLang.value)
  }

  const initLang = () => {
    const stored = localStorage.getItem('cloudpath-lang')
    if (stored && translations[stored]) {
      currentLang.value = stored
    }
  }

  return { t, currentLang, toggleLang, initLang }
}
