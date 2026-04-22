// Composable for translations (Spanish only)
import { reactive } from 'vue'

const t = reactive({
  nav: {
    courses: 'Repaso',
    about: 'Acerca de',
    free: '100% Gratuito',
  },
  hero: {
    badge: 'Plataforma de repaso gratuita',
    title: 'Domina las certificaciones',
    titleHighlight: 'con el mejor repaso',
    subtitle: 'El complemento ideal para tu certificación. Guías rápidas, puntos clave y simuladores de examen diseñados para ayudarte a aprobar.',
    cta: 'Ir a los cursos',
    ctaSecondary: 'Sobre el proyecto',
    stat1: 'Rutas de repaso',
    stat2: 'Totalmente gratis',
    stat3: 'Sin complicaciones',
  },
  courses: {
    sectionLabel: 'Certificaciones disponibles',
    title: 'Prepárate para el examen',
    subtitle: 'Selecciona la certificación que estás estudiando para acceder a guías de repaso optimizadas y simulacros de examen.',
    startCourse: 'Empezar repaso',
    comingSoon: 'Próximamente',
    free: 'Gratis',
    level: 'Nivel',
    duration: 'Tiempo de repaso',
    topics: 'secciones',
    questions: 'preguntas',
  },
  footer: {
    description: 'El complemento de estudio gratuito para certificaciones cloud. Todo el contenido clave en un solo lugar.',
    links: 'Contenido',
    madeWith: 'Hecho con',
    by: 'por',
    rights: 'Todos los derechos reservados.',
  }
})

export function useI18n() {
  const initLang = () => {
    // No-op kept for compatibility
  }

  return { t, currentLang: 'es', toggleLang: () => {}, initLang }
}
