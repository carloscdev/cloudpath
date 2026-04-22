# ☁️ CloudPath — Guías de repaso y simulacros para certificaciones cloud.

[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Vue 3](https://img.shields.io/badge/Vue.js-35495E?style=flat&logo=vuedotjs&logoColor=4FC08D)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**CloudPath** es una plataforma de código abierto diseñada para ayudar a estudiantes y profesionales a dominar los conceptos clave de las certificaciones cloud más importantes. Sin registros, sin muros de pago, 100% gratuito.

![Preview de la App](https://via.placeholder.com/1200x600/0ea5e9/ffffff?text=CloudPath+Interface+Preview)

## ✨ Características Principales

- 📚 **Guías de Repaso Detalladas**: Contenido estructurado basado en los dominios oficiales de cada examen.
- 🎯 **Simulador de Examen Inteligente**: 
  - Banco de más de 60 preguntas para AWS y Azure.
  - Aleatorización de preguntas y alternativas (opciones) en cada intento.
  - Retroalimentación instantánea con explicaciones detalladas.
- 🌓 **Modo Oscuro/Claro**: Interfaz minimalista inspirada en los estándares de diseño más modernos.
- 🚀 **Performance Extrema**: Construido con Vite y Vue 3 para una carga instantánea.

## 🛠️ Tecnologías

- **Frontend**: Vue 3 (Composition API)
- **Estilos**: Tailwind CSS 4.0
- **Routing**: Vue Router 4
- **Analytics**: Vercel Analytics
- **Despliegue**: Vercel

## 📖 Cómo funciona

El proyecto está diseñado para ser **Data-Driven**. Todo el contenido de los cursos y los exámenes se gestiona a través de archivos JSON en la carpeta `src/data/`, lo que permite:
1. Actualizar contenidos sin tocar el código fuente.
2. Añadir nuevas certificaciones en minutos.
3. Facilitar la contribución de la comunidad.

## 🤝 Contribuciones

¡Tu ayuda es bienvenida! Si quieres mejorar el banco de preguntas o corregir algún contenido:

1. Haz un **fork** del proyecto.
2. Crea una rama para tu cambio (`git checkout -b feature/mejora-examenes`).
3. Edita los archivos correspondientes en `src/data/`.
4. Envía un **Pull Request**.

## 🚀 Despliegue Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

---

Hecho con ❤️ por [Carlos Cordova](https://carlosc.dev)
