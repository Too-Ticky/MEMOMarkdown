<script setup lang="ts">
  import { reactive, onMounted, onBeforeUnmount, ref } from 'vue';
  import { storeToRefs, } from 'pinia';
  import router from '@/router';

  /*  FirebaseAuth Composables */
  import { useGooglelSignIn } from '@/composables/firebaseAuthComposables';
  const googleLogin = useGooglelSignIn;
  
  /* Pinia Store for Auth State Control */
  import { useAuthStore } from '@/stores/piniaAuthStore'; /* Stores for Authentication State */
  const authStore = useAuthStore();
  const { currentUser, isLoading } = storeToRefs(authStore);
  
  /* pinia store for showStatus flag */
  import { useStoreShowStatus } from '@/stores/piniaShowStatus';
  const showStatus = useStoreShowStatus();
  const { langEn, langJa } = storeToRefs(showStatus);
  showStatus.resetWithPageInNotSignIn(); /* Initialization of the Show flag */

  /* Responsive layout Optimization  */
  function resizeHandler() {
    const fontSize = Math.max(16, Math.round(window.innerWidth / 50));
    document.body.style.fontSize = fontSize + "px";
  }
  onMounted(() => { 
    resizeHandler()
    window.addEventListener('resize', resizeHandler);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeHandler);
  })

  const startGoogle = () => {
      googleLogin();
      if(currentUser) {router.push({name:'Edit'})}
    };
  const restartEdit = () => router.push({name:'Edit'});

  /* The Browser's Web Storage Enable Cheker */ 
  import { isSessionStorageAvailable } from '@/composables/webStrorageChecker';
  const showModal = ref<boolean>(false);
  if (!isSessionStorageAvailable) {
    showModal.value = true;
  }
  import Modal from '@/components/TheModal.vue';
  import Settings from '@/components/WebStorageSettings.vue'; /* The discription of Web Storage Settings */
 
  /* Packages of the message text according to the language  */
  const sentencesJa :string[] = [     
    "<span class='logolike' style='color:var(--brandcolor2); background:var(--brandcolor1); padding:0 1rem 0 1rem;'>MEMO MarkDown</span> にようこそ", //[0]
    "サインインして始めてください。",  //[1]
    "Googleで続ける",  //[2]
    "登録の際は <a href='/tou' class='tou' Style=''>利用規約</a>と<a href='/privacy' class='tou' Style=''>プライバシーポリシー</a>に同意したものとします。",  //[3]
    "<strong style='color:var(--brand3);'>シンプル</strong> × <strong style='color:var(--brand3);'>マークダウン</strong>",  //[4]
    "<strong style='color:var(--brand1);'>簡単</strong>、<strong style='color:var(--brand1);'>軽快</strong>な メモApp ",  //[5]
    "編集を再開",  //[6]
    "ブラウザのセッションストレージが無効です。ブラウザの設定を変更してください。", //[7]
  ];
  const sentencesEn :string[] = [
    "Welcome to <span class='logolike' style='color:var(--brandcolor2); background:var(--brandcolor1); padding:0 1rem 0 1rem;'>MEMO Markdown</span>", //[0]
    "Please Sign-In/Up to start.", //[1]
    "Sign-In/Up with Google", //[2]
    "By registering, you agree to <a href='/tou' class='tou' Style=''>Terms of Use</a>. and <a href='/privacy' class='tou' Style=''>Privacy Policy</a>.", //[3]
    "<strong style='color:var(--brand3);'>Simple</strong> × <strong style='color:var(--brand3);'>Markdown</strong>", //[4]
    "The MEMO App <strong style='color:var(--brand1);'>easily</strong> and <strong style='color:var(--brand1);'>lightly</strong>", //[5]
    "Restart Edit", //[6]
    "The session storage of the browser is disabled. Please change the setting of the browser.", //[7]
  ];
  let sentences :string[] = reactive([...sentencesEn]);
  if(langJa.value && !langEn.value) {
    sentences = [...sentencesJa];
  } else if(!langJa.value && langEn.value) {
    sentences = [...sentencesEn];
  }
</script>


<template>
  <!-- Loading -->
  <div v-show="isLoading">
    <h1>loading....</h1>
    <div class="circle-rotate-1-horizontal"></div>
  </div>
  <!-- Body of 'Welcome'  -->
  <div class="home welcome" v-show="!isLoading">
    <!-- Logo and Catch Phrase -->
    <div class="og wrapper">
      <div class="logo">
        <h1 class="logo"><strong class="memo">MEMO</strong><span class="md">Markdown</span></h1>
      </div> 
      <div class="catch wrapper">
        <h2 class="catch"><span class="text1" v-html="sentences[4]"></span></h2>
        <h2 class="catch"><span class="text2" v-html="sentences[5]"></span></h2>
      </div>
    </div>
    <!-- Start Google Signing-In/Up -->
    <div class="signin wrapper" v-if="!currentUser">
      <h2 class="signin">{{ sentences[1] }}</h2>
      <div class="btn signin" >
        <button type="button" class="ui btn google firebaseauth" v-on:click="startGoogle" >
          <img class="firebase-auth-icon" alt="Google" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg">
          <span class="ui btn google firebaseauth left">{{ sentences[2] }}</span>
        </button>
      </div>
      <h3 class="tou privacy signin" v-html="sentences[3]"></h3>
    </div>
    <!-- ReStart Editting -->
    <div class="pageTransition wrapper" v-if="currentUser">
      <div class="btn pageTransition" >
        <button type="button" class="ui btn pageTransition brandcolor" @click="restartEdit" >
          <span class="ui btn router center brandcolor">{{ sentences[6] }}</span>
        </button>
      </div>
    </div>
  </div>
  <!-- Warning - Sesstion Storage is disabled - -->
  <Teleport to="main">
    <modal :show="showModal" @close="showModal = false">
      <template #title>
        <h3>{{ sentences[7] }}</h3>
      </template>
      <template #body>
        <Settings />
      </template>
    </modal>
  </Teleport>

</template>


<style scoped lang="scss">
  .welcome {
    margin-top: 60px;
    text-align: center;
  }
  h2,h3.signin {
    color: var(--color);
  }
  modal {
    margin: auto;
  }
  .btn.google {
    color:black;
    background-color: white;
  }
  button.firebaseauth, 
  button.pageTransition {
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: inline-block;
    box-sizing: border-box;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
    border-radius: 0.2rem;
    border: none;
    position: relative;
    width: 100%;
    min-width: 6.5rem;
    max-width: 25rem;
    height: auto;
    line-height: normal;
    min-height: 4rem;
    background: rgba(158,158,158,.2); 
    font-family: Roboto,Helvetica,Arial,sans-serif;
    font-size: 1.6rem;
    font-weight: 500;
    text-decoration: none;
    vertical-align: middle;
    /* text-transform: uppercase; */
    letter-spacing: 0;
    padding: 1rem 2rem;
    list-style: none;
    overflow: hidden;
    cursor: pointer;
    transition: box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1);
    will-change: box-shadow;
    outline: 0;
    direction: ltr;
    .left {
      text-align: left;
    }
    .center {
      text-align: center
    }
    o.brandcolor {
      color: var(--brand3);
      padding: 0.5rem;
      border-radius: 0.2rem;
    }
  }
  img.firebase-auth-icon{
    margin-right: 2rem;
    width: 2rem;
    height: 2rem;
  }
  div.og.wrapper {
    margin-top: 8rem;
    margin-bottom: 8rem;
  }
  div.logo {
    display: flex;
    h1.logo {
      font-size: 5rem;
      color: var(--brand4);
      background-color: var(--brand-bg);
      padding: 0.5rem 1rem;
      margin: 0rem auto 8rem auto;
      border-radius: 1rem;
      font-weight: 100;
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

  div.catch.wrapper {
    margin: 3rem 0 7rem 0;
    font-weight: 100;
    font-family: Arial;
    text-align: center;
    display: inline-block;
    margin-right: auto;
    max-width: 30rem;
    
  }
  }
  h2.catch {
    line-height: 4rem;
    color: var(--color);
    
    span.text1, 
    span.text2 {
      display: inline;
      font-size: 2rem;
      padding:0.5rem 0.5rem 0 0.5rem;
      margin:0;
      background: linear-gradient(transparent 50%, var(--brand2) 95%);  /* ラインマーカーを付ける  */
    }
  }
  div.signin.wrapper {
    margin-top: 6rem;
  }

  .circle-rotate-1-horizontal {
  --size: 24px;
  --color: currentColor;
  --animation-timing-function: linear;
  --animation-duration: 1s;
  width: var(--size);
  height: var(--size);
  background-color: var(--color);
  border-radius: 50%;
  transform: rotateY(0deg);
  animation: var(--animation-timing-function) var(--animation-duration) infinite circle-rotate-1-horizontal-animation;
}

@keyframes circle-rotate-1-horizontal-animation {
  from {
    transform: rotateY(0deg);
  }

  to {
    transform: rotateY(180deg);
  }
}
  </style>