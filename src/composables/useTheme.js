// Composable for theme (dark/light mode) management
import { ref, watch, onMounted } from 'vue'

const isDark = ref(false)

export function useTheme() {
  const initTheme = () => {
    const stored = localStorage.getItem('cloudpath-theme')
    if (stored) {
      isDark.value = stored === 'dark'
    } else {
      // Default: light mode
      isDark.value = false
    }
    applyTheme()
  }

  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem('cloudpath-theme', isDark.value ? 'dark' : 'light')
    applyTheme()
  }

  onMounted(() => {
    initTheme()
  })

  watch(isDark, applyTheme)

  return { isDark, toggleTheme }
}
