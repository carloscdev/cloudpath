// Composable for translations (Spanish only)
import { reactive } from 'vue'

const t = reactive({
  nav: {
    courses: 'Repaso',
    about: 'Acerca de',
    free: '100% Gratuito',
  },
  hero: {
    badge: 'Plataforma de práctica y repaso',
    title: 'Practica y repasa para',
    titleHighlight: 'tus exámenes de certificación',
    subtitle: 'El lugar ideal para poner a prueba tus conocimientos. Repasa los conceptos clave que vienen en cada examen y practica con simuladores antes de tu examen.',
    cta: 'Empezar a practicar',
    ctaSecondary: 'Sobre el proyecto',
    stat1: 'Exámenes de práctica',
    stat2: 'Repaso rápido',
    stat3: 'Sin complicaciones',
  },
  courses: {
    sectionLabel: 'Certificaciones disponibles',
    title: 'Pon a prueba tus conocimientos',
    subtitle: 'Selecciona la certificación que estás estudiando para acceder a resúmenes rápidos de los conceptos clave y simuladores de examen.',
    startCourse: 'Empezar a practicar',
    comingSoon: 'Próximamente',
    free: 'Gratis',
    level: 'Nivel',
    duration: 'Tiempo de repaso',
    topics: 'dominios',
    questions: 'preguntas',
  },
  footer: {
    description: 'El complemento de estudio gratuito para certificaciones cloud. Todo el contenido clave en un solo lugar.',
    links: 'Contenido',
    madeWith: 'Hecho con',
    by: 'por',
    rights: 'Todos los derechos reservados.',
  },
  aboutProject: {
    title: 'Sobre el Proyecto',
    description: 'Este proyecto nace con la misión de brindar información y recursos gratuitos para ayudar a las personas a certificarse en la nube. Poco a poco, a medida que voy obteniendo certificaciones, sigo añadiendo contenido, resúmenes clave y exámenes de prueba diseñados para que practiques y ganes confianza antes de presentar el examen oficial.',
    close: 'Cerrar'
  }
})

export function useI18n() {
  const initLang = () => {
    // No-op kept for compatibility
  }

  return { t, currentLang: 'es', toggleLang: () => {}, initLang }
}
