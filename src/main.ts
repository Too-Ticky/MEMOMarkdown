/* Vue App */
import App from './App.vue';
import { createApp } from 'vue';
const app = createApp(App);

/* libraries */
import router from './router/index.js'; /* vue-router */
import floatingVue from 'floating-vue'; /* Floating Vue (Tooltips & Dropdowns) */
/* libraries' CSS */
import './assets/css/github-markdown.css'; /* CSS for Markdown Preview Part */
import './assets/css/floating-vue-optimized.css'; /* CSS for Floating Vue (Tooltips & Dropdowns) */

/* Pinia */
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
const pinia = createPinia();
pinia.use(createPersistedState({  
  /* pinia.use: give the plugin to pinia, 
     createPersistedState: to make persistence of Pinia stores */
  auto: true,
  storage: sessionStorage,
}));

app
  .use(floatingVue)
  .use(pinia)
  .use(router)
  .mount('#app');
