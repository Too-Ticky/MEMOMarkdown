<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  /* Pinia Store for Auth State Control */
  import { useAuthStore } from '@/stores/piniaAuthStore'; /* Stores for Authentication State */
  const authStore = useAuthStore();
  const { currentUser, } = storeToRefs(authStore);
    
  /*  Auth State Listener */
  import { authStateListener } from '@/composables/firebaseAuthComposables';
  authStateListener();  /* Mount of the Firebase Auth State Observer */

  /* Vue-router */
  import { RouterView, } from 'vue-router';

  /* Vue Components */
  import Layout       from '@/components/LayoutApp.vue'; /* Named Slot Outlet */
  import Header       from '@/components/GlobalHeader.vue';
  import Footer       from '@/components/GlobalFooter.vue';
  import AccountMenu  from '@/components/TheAccountMenu.vue';
</script>

<template>
  <Layout>
    <template #header>
      <Header class="header-area" />
      <AccountMenu v-if="currentUser" />
    </template>
    <template #main>
      <RouterView class="routerview" /> 
    </template>
    <template #footer>
      <Footer class="footer-area" />
    </template>
  </Layout>
</template>

<style>
  .routerview {
    width: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>