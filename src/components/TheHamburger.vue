<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useStoreShowStatus } from '@/stores/piniaShowStatus.js';
  const showStatus = useStoreShowStatus()
  const { showHamburgerBtn, showHamburgerIcon, showXCloseIcon, showMenu, showCmdText} = storeToRefs(showStatus);
  const { switchHamburgerIcon, switchCmdTxtShow, switchMenuShow } = showStatus;
  
  /* Settings of Values in <template>  (Vue Delectives and others ) */
  const btnAction = () => {
    switchHamburgerIcon(); /* To Switch Icon */
      switchMenuShow(); /* To Switch Menu Contents */
      switchCmdTxtShow(); /* To Switch Cmd Text Menu */
    
    console.log('showHamburgerIcon: '+showHamburgerIcon.value);
    console.log('showMenu: '+showMenu.value);
    console.log('showcmdTxt: '+showCmdText.value)
  }

  const vbindClass :string = 'cmd: showHamburgerIcon'; /* Class by v-bind if nessesarry */
  const toolTipTxt :string = 'Open/Close The Menu'; /* "Floating Vue" Tooltip Words */ 
</script>

<template>
    <button
      v-show="showHamburgerBtn"
      class="hamburger menuBtn btn"
      :class="{ vbindClass }"
      @click=btnAction
      v-tooltip="toolTipTxt"
    >
      <img 
        v-show="showHamburgerIcon"
        class="hamburgerBtn menuBtn openBtn" 
        src="@/assets/imgs/menu.svg"
        alt="HamburgerBtn"
      />
      <img 
        v-show="showXCloseIcon"
        class="xCloseBtn menuBtn closeBtn" 
        src="@/assets/imgs/x.svg"
        alt="CloseBtn"
      >
    </button>
</template> 

<style scoped lang="css">
  button.btn {
    height: 3rem;
    border: 0;
    background: var(--brand-bg);
    color: var(--color);
  }
  button:hover {
    transform: rotate(180deg);
    transition: 0.5s;
    cursor : pointer;
  }

  img.menuBtn {
    height: 100%;
    text-align: center;
  }
  img[src*=svg] {
    filter: invert(100%) grayscale(30%);
  }

  /* Black and white inversion of svg icon in Dark Mode */
  @media (prefers-color-scheme: dark) {
  } 

</style>