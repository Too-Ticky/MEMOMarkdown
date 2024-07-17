<script setup lang="ts">  
  /* pinia store for showStatus */
  import { useStoreShowStatus } from '@/stores/piniaShowStatus';
  const showStatus = useStoreShowStatus();
  const { resetWithPageAgree,  } = showStatus;
  resetWithPageAgree(); /* Initialization of the show Flag */

  import router from '@/router';
  const accept = () => {
    router.back();
  }
</script>

<template>
  <!--  One-Page Web-App template by using Named slot  -->
  <div class="wrapper">
    <div class="mainText">
      <slot name="mainText" />
    </div>
    <div class="btn">  
      <button class="btn agree" @click="accept">
        <slot name="agreeButton" />
      </button>
    </div>
  </div>
</template>



<style scoped>
  html {
    font-size: 62.5%; /* In case of 1rem, It become 10px. */
    line-height: 1.5; /* Change the line height in all browsers */
    color: var(--color);
    scroll-behavior: smooth;
    background: var(--background);
    overflow-x: hidden;
    word-break: break-word;
    -webkit-font-smoothing: antialiased; /* Enable Font Smoothing in Webkit  */
    -moz-osx-font-smoothing: grayscale; /* Enable Font Smoothing in Mozilla  */ 
    -moz-tab-size: 4; tab-size: 4; /* Change the line height in all browsers */
    -webkit-tap-highlight-color: transparent; /* Remove the grey highlight on links in iOS */
  }
  body { font-size: 1.0rem;
    font-family: "Helvetica Neue",
      Arial,
      "Hiragino Kaku Gothic ProN",
      "Hiragino Sans",
      Meiryo,
      sans-serif;
    background: var(--background);
    margin: 0 1rem 0 1rem;  
  }
  h1   { font-size: 2.5rem; } 
  h2   { font-size: 2.0rem; } 
  h3   { font-size: 1.5rem; } 
  a {
    text-decoration: none;
  }
  a:hover,
  button:hover {
    cursor: pointer;
  } 

  div.wrapper {
    max-width: 1024px;
    transition: opacity 0.3s ease;
  }
  div.mainText {
    font-size: 1.0rem;
    font-family: Meiryo,serif;
    color:var(--color);
    background-color: var(--background);
    margin-bottom: 5rem;
    overflow-y: hidden;
  }
  div.btn {
    /* z-index: 2; */
    width: 100%;
    padding: 1rem 0 1rem 0;
    max-width: 1024px;
    text-align: center;
    background-color: var(--background);
    box-shadow: inset 1rem 1rem var(--background);
    opacity: 0.75;
    position: absolute;
    bottom: 3.8rem;
  }
  button.agree {
    /* z-index: 3; */
    /* height: 0.75rem; */
    padding: 1rem;
    opacity: 1;
    font-weight: bold;
    font-size: 1.5rem;
    color: var(--color);
    text-shadow: 0 2px 2px var(--background);
    background-color: var(--background);
    
    border-radius: 1.5rem;
    border: solid 3px var(--line);
    display: inline-block;
    box-sizing: border-box;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 4px 2px -3px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
    background    : linear-gradient(transparent 0%, var(--line) 65%);  /* ラインマーカーを付ける  */
  }
</style>


