/* Vue Packages */
import router from './router/index.js'; /* Vue-router */
import floatingVue from 'floating-vue'; /* FloatingVue (Tooltips & Dropdowns) */
// import vue3GoogleLogin from 'vue3-google-login'; /* 'Sign In With Google' of Google Identity authentication */

/* CSS Packages */
import './assets/css/github-markdown.css'; /* CSS for Markdown Preview Part */
import './assets/css/floating-vue-optimized.css'; /* CSS for Floating Vue (Tooltips & Dropdowns) */

/* Pinia */
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
const pinia = createPinia();
pinia
  .use(createPersistedState({
    /* createPersistedState is the pinia plug-in to make persistence of Pinia stores */
    auto: true,
    storage: sessionStorage,
  }));  

/* Vue App */
import App from './App.vue';
import { createApp } from 'vue';
const app = createApp(App);
app
  .use(floatingVue)
  .use(pinia)
  .use(router)
  // .use(vue3GoogleLogin, {
  //    clientId: import.meta.env.VITE_GC_CLIENT_ID,
  //    scope: 'email profile openid',
  // })
  .mount('#app');
