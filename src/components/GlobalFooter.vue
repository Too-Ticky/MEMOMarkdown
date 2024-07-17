<script setup>
  import { RouterLink, } from 'vue-router';

  /* Pinia Store for the Show Status Controll */
  import { storeToRefs } from 'pinia';
  import { useStoreShowStatus } from '@/stores/piniaShowStatus';
  const showStatus = useStoreShowStatus();
  const { langJa, langEn } = storeToRefs(showStatus);
</script>

<template>
  <div class="footer-wrapper">
    <div class="center-wrapper">
      <router-link :to="{ name:'Terms of Use' }" class="link en" v-if="langEn">Terms of Use</router-link>
      <router-link :to="{ name:'Privacy Policy' }" class="link en" v-if="langEn">Privacy Policy</router-link>
      <router-link :to="{ name:'Terms of Use' }" class="link ja" v-if="langJa">利用規約</router-link>
      <router-link :to="{ name:'Privacy Policy' }" class="link ja" v-if="langJa">プライバシーポリシー</router-link>
    </div>
    <div class="right-wrapper">
      <p class="footer-content">&copy; 2024 </p>
      <p class="footer-content">&#x2756;Soulfree</p>  
    </div>
  </div>
</template>

<style scoped>
  div.footer-wrapper {
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 3rem;
  }
  div.center-wrapper {
    height: 100%;
    display: flex;
    text-align: left;
  }
  div.right-wrapper {
    height: 100%;
    display: flex;
    text-align: right;
  }
  .link {
    margin-right: 1rem;
    font-size: small;
    color: var(--brand3);
    &:hover {
      cursor: pointer;
      color: var(--line);
    }
  }
  .footer-content {
    width: 100%;
    font-size: small;
    margin-left: 1rem;
  }
  router-link {
    color: var(bland-color-rvs); 
  }
</style>
