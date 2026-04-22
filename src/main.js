import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import { Analytics } from "@vercel/analytics/vue"

createApp(App)
  .use(router)
  .use(Analytics)
  .mount('#app')
