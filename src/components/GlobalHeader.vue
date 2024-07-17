<script setup>
  import { watchEffect } from 'vue'
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/stores/piniaAuthStore'; /* Stores for Authentication State */

  /* The pinia composable for the Authentication State controll */ 
  const authStore = useAuthStore();  
  const { currentUser } = storeToRefs(authStore);  /* State */
  
  /* pinia store for showStatus flag */
  import { useStoreShowStatus } from '@/stores/piniaShowStatus';
  const showStatus = useStoreShowStatus();
  const { showHamburgerBtn, showNav, showAccountBtn, dispSmall, dispMiddle } = storeToRefs(showStatus);
  const { resetWithPageInSignIn, resetWithPageInNotSignIn } = showStatus;

  watchEffect(() => {
    if (currentUser.value) {
      resetWithPageInSignIn(); /* To show MenuIcon,NavBar,AccountIcon */
    } else {
      resetWithPageInNotSignIn(); /* To Not show MenuIcon,NavBar,AccountIcon */
    }
  });

  /* Vue Component */
  import Nav from '@/components/TheNav.vue'
  import Hamburger from '@/components/TheHamburger.vue';
  import AccountIcon from '@/components/TheAccountBtn.vue';

</script>

<template>
  <div class="header-wrapper">
    <div class="left-wrapper">
      <span class="hamburger" v-show="showHamburgerBtn"><Hamburger /></span>
      <div class="logo">
        <h2 class="logo"><a href="/" title="MEMOMarkdown"><strong class="memo">MEMO</strong></a><span class="md">Markdown</span></h2>
      </div> 
    </div>
    <div class="center-wrapper">
      <span class="site-title"></span>
    </div>
    <div class="right-wrapper" v-show="!dispSmall">
      <span class="Nav" v-show="showNav && !dispMiddle"><Nav /></span>
      <span class="AccountIcon"><AccountIcon v-show="showAccountBtn" /></span>
    </div>
  </div>
</template>

<style scoped lang="scss">

  div.header-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 3rem;
    vertical-align: middle;
    // background: var(--brand-bg);
  }
  div.left-wrapper {
    display: flex;
    height: 100%;
    background: linear-gradient(to right, var(--background) 0%, var(--brand-bg) 5%, var(--brand-bg) 95%, var(--background) 100%);
  }
  div.center-wrapper {
    background: linear-gradient(90deg, var(--brand-bg), var(--brand-bg), var(--background),var(--background));
    height: 100%;
    width: 100%;
    display:flex;
    text-align: left;
  }  
  div.right-wrapper {
    height: 100%;
    display:flex;
    text-align: right;
  }
  div.logo {
    display: flex;
    h2.logo {
      font-size: 2.5rem;
      color: var(--brand4);
      background-color: var(--brand-bg);
      font-weight: 100;
      align-items: baseline;
      padding: 0 1rem;
      strong.memo {
        transform: scale(1.5, 1);
        font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        color: var(--brand-color);
        font-weight: 900;
      }
      span.md {
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        transform: scale(0.2rem, 1);
      }
    }    
  }
  span.hamburger {
    height: 3rem;
    width: 3rem;
    margin-right: 0.5rem;
    align-items: center;
    background: var(--brand-bg);
  }
  span.site-title { 
    font-size: 3rem;
    margin: 0;
  } 
  span.Nav {
    margin-right: 0;
    margin-left: auto;
    text-align: right;
    height: 100%;
  }
  span.AccountIcon {
    height: 3rem;
    width: 3rem;
    margin-left: 1rem;
    box-shadow: none;
  }
</style>