<script setup>
  import { RouterLink, } from 'vue-router';
  import { routes } from '@/router/index';
  const links = routes; // refer to vue-router route index.

  import { storeToRefs } from 'pinia';
  import { useStoreShowStatus } from '@/stores/piniaShowStatus';
  const showStatus = useStoreShowStatus()
  const { showNav } = storeToRefs(showStatus);
</script>

<template>
    <!-- <transition name="fade"> -->
      <nav class="nav" v-show="showNav">             
        <ul class="nav_list">
          <li v-for="link in links" :key="link.name">
            <router-link v-if="link.showInNav" :to="link.path" class="link">{{ link.name }}</router-link>
          </li>
        </ul>
      </nav>
    <!-- </transition> -->
</template>

<style scoped lang="css">
  nav {
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: 0;
  }
  ul.nav_list  {
    float: right;
    display: flex;
    list-style: none;
  }
  .link {
    margin-left: 1rem;
    font-size: 1.4rem;
    color: var(--brand3)
  }
  .link:hover {
    cursor: pointer;
    color: var(--line);
  }
  router-link {
    color: var(bland-color-rvs); 
  }

</style>
