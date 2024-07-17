<script setup>
  import { ref, onMounted } from 'vue';
  import { storeToRefs } from 'pinia';

  /* The pinia composable for the Authentication State controll */ 
  import { useAuthStore } from '@/stores/piniaAuthStore'; /* Stores for Authentication State */
  const authStore = useAuthStore();  
  const { currentUser } = storeToRefs(authStore);  /* State */
  
  /* The pinia composable for the flag variables using display */
  import { useStoreShowStatus } from '@/stores/piniaShowStatus';
  const showStatus = useStoreShowStatus();
  const { showAccountMenu, langJa, langEn } = storeToRefs(showStatus);
  const { switchAccountMenuShow, switchLang } = showStatus;

  /* The Composables for FirebaseAuthentication */
  import { useSignOut } from '@/composables/firebaseAuthComposables'; 
  import router from '@/router';

  const signOutFromGoogle = () => {
    useSignOut();   /* UseSignOut is the composable's function using Firebase/Auth  */
    showAccountMenu.value = false;
    router.push({path:'/welcome'});
  }

  onMounted(() => {
    showStatus.showAccountMenu = false;  /* reset at the reloading */
  });

  /* When the outside of the element is clicked, an element is closed */
  import { onClickOutside } from '@vueuse/core'; /* Listen for clicks outside of an element.  */
  const target = ref(null)
  onClickOutside(
    target,
    (event) => {
      console.log(event,"click outside of Account menu @TheAccountMenu.vue");
      showAccountMenu.value = false;
    },
  )

  const googleAccountConsole = () => {
    const googleAccountUrl = "https://myaccount.google.com/?hl=ja&authuser=0&utm_source=OGB&utm_medium=act";
    window.open(googleAccountUrl, '_blank');
  }
</script>


<template>
  <div 
    v-if="showAccountMenu" 
    class="account baloon wrapper"
    @click.self="showStatus.switchAccountMenuShow"
  >
    <div ref="target" class="account menu">

      <div class="accout info">
        <div class="account info-item displayName">
          <span v-if="currentUser" class="displayName usr">{{ currentUser.displayName }}</span>
        </div>
        <div class="account info-item email">
          <img 
              class="email icon" 
              src="@/assets/imgs/Mail-Send.svg"
              alt="E-mail"
            />
          <span class="email usr">{{ currentUser && currentUser.email }}</span>
        </div>
      </div>

      <div class="btn account commands">
        <!-- Google Account Console -->
        <button @click="googleAccountConsole" class="command-item btn account-console" >
          <img 
              class="account-console icon" 
              src="@/assets/imgs/Link.svg"
              alt="Google Account Console"
          />
          <span class="btn"></span> 
          <span class="btn text" v-show="langJa">Google アカウント</span> 
          <span class="btn text" v-show="langEn">Google Account Console</span> 
        </button>
        <button @click="switchLang" class="command-item btn switchLang" >
          <img 
              class="switchLang icon" 
              src="@/assets/imgs/Language.svg"
              alt="Google Account Console"
          />
          <span class="btn text" v-show="langJa">言語:>>英語</span> 
          <span class="btn text" v-show="langEn">Lang:>>Japanese</span> 
        </button>
        <button @click="signOutFromGoogle" class="command-item btn signout" >
          <img 
              class="signout icon" 
              src="@/assets/imgs/log-out.svg"
              alt="Sign-out"
          />
          <span class="btn">Sign Out</span> 
        </button>
      </div>
      <div class="btn account close">
        <button @click="switchAccountMenuShow" class="command-item btn close" >
          <img 
              class="close icon" 
              src="@/assets/imgs/x.svg"
              alt="Google Account Console"
          />
          <span class="btn text" v-show="langJa">閉じる</span> 
          <span class="btn text" v-show="langEn">Close</span> 
        </button>

      </div>
      
    </div>

  </div>
</template>

<style scoped lang="scss">
  div.account.menu {
    box-sizing: border-box;
    padding: 0;
    border-radius: 0.5rem;
    background: var(--background);
    box-shadow: inset 0px 0px 5px 3px var(--line);
    text-align: center;
    position: absolute;
    top: 4rem;
    right: 1rem;
    margin-left: auto;
    z-index: 10;
    transition: all 0.3s ease;
  }

  div.info {
    display: grid;
    grid-template-columns: 1fr;
    margin: 0 1rem ; 
    gap: 1rem;
    border-bottom: solid 3px var(--line);
    padding: 1.5rem;

    div.info-item {
      display: inline;
      padding: 0.5rem;
      text-align: center;
      margin-right: auto;
      color: var(--color);
      &.displayName {
        font-size: 1.5rem;
      }
      &.email {
        display: inline-flex;
        height: 1.5rem;
        font-size: 1.0rem;
        :is(img.icon) {
          height: 100%;
          text-align: center;
          margin-right: 1rem;
        }
      }
    }
  }

  div.btn.commands {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin: 0 1rem ; 
    padding: 1.5rem 1rem ;

    button.command-item {
      height: 1.5rem;
      display: inline;
      text-align: left;
      margin-left: 0;
      margin-right: auto;
    }
  }

  div.btn.close {
    display: grid;
    grid-template-columns: 1fr;
    margin: 0 1rem ; 
    gap: 1rem;
    border-bottom: solid 3px var(--line);
    padding: 0 1.5rem 1.5rem 1.5rem;

    button.command-item {
      height: 1.5rem;
      display: inline;
      text-align: left;
      margin-left: auto;
      margin-right: 0;
    }
  }
  
  button.command-item {
    background: var(--background);
    color: var(--color);
    height: 1.5rem;
    &:hover { 
      cursor : pointer;
      color: var(--line);
      transition: 0.5s;
    }
    span.text {
      font-size: 1rem;
      vertical-align: super;
      white-space: nowrap;
    }
    :is(img.icon) {
      height: 100%;
      text-align: center;
      margin-right: 0.5rem;
    }
  }

  @media (prefers-color-scheme: dark) {
    img.icon {
        filter: invert(100%) grayscale(30%);
    }
  } 
  
</style>