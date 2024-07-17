import { createRouter, createWebHistory } from 'vue-router';

// import Home from '@/pages/PageHome.vue';
import Welcome from '@/pages/PageWelcome.vue';
import MarkdownEditor from '@/pages/PageMemo.vue';
import NotFound from '@/pages/Page404.vue';
import TOU from '@/pages/PageTermsOfUse.vue';
import Privacy from '@/pages/PagePrivacyPolicy.vue';
import Settings from '@/components/WebStorageSettings.vue';

/** 
 * @type {{
*  path:string, 
*  name:string,
*  showInNav:boolean,
*  component:string, 
* }} 
* path: param to specify route path for router-view, router-link.
* name: param to specify route name for router-link navigation.
* showInNav: flag param to specify display or non-display, assumed the use in <nav>tag with router-link.
* component: param to specify the vue component file for router-view mapping. 
*/
export const routes
  :Array<{
    path: string;
    name: string;
    showInNav: boolean;
    component: any;
  }> 
  = [
    {
      path: '/',
      name: 'Home',
      showInNav: true,
      component: Welcome,
    },
    {
      path: '/welcome',
      name: 'welcome',
      showInNav: false,
      component: Welcome,
    },
    {
      path: '/editor',
      name: 'Edit',
      showInNav: true,
      component: MarkdownEditor,
    },
    {
      path: '/tou',
      name: 'Terms of Use',
      showInNav: false,
      component: TOU,
    },
    {
      path: '/privacy',
      name: 'Privacy Policy',
      showInNav: false,
      component: Privacy,
    },
    {
      path: '/Settings',
      name: 'Web Storage Settings',
      showInNav: false,
      component: Settings,
    },
    {
      path: '/:pathMatch(.*)*', 
      name: 'NotFound',
      showInNav: false,
      component: NotFound,
    }
  ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
