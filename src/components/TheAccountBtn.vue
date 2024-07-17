<script setup>
  import { storeToRefs } from 'pinia';
  import { useStoreShowStatus } from '@/stores/piniaShowStatus';
  const showStatus = useStoreShowStatus();
  const { showAccountBtn } = storeToRefs(showStatus);
</script>

<template>
    <button
      @click="showStatus.switchAccountMenuShow"
      v-show="showAccountBtn"
      class="account icon btn"
      v-tooltip="'User Account Menu'"
    >
      <img 
        class="account icon" 
        src="@/assets/imgs/User-Circle.svg"
        alt="UserIcon"
      />
    </button>

</template> 

<style scoped>
  button.btn {
    height: 3rem;
    border: 0;
    background: var(--background);
    color: var(--color);
    &:hover {
      transform: rotate(360deg);
      transition: 0.5s;
      cursor : pointer;
    }
  }
  img.icon {
    height: 100%;
    text-align: center;
  }
  
  @media (prefers-color-scheme: dark) {
    img.icon {
        filter: invert(100%) grayscale(30%);
    }
  } 
</style>