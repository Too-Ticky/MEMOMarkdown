<script setup lang="ts">
  /* The pinia composable for the flag variables using display */
  import { storeToRefs } from 'pinia';
  
  /* The pinia composable for the Authentication State controll */ 
  import { useAuthStore } from '@/stores/piniaAuthStore'; /* Stores for Authentication State */
  const authStore = useAuthStore();  
  const { currentUser } = storeToRefs(authStore);  /* State */

  /* The pinia composable for the flag variables using display */
  import { useStoreShowStatus } from '@/stores/piniaShowStatus';
  const showStatus = useStoreShowStatus();
  const { showMenu, showMenuIcon, showMenuText, langJa, langEn } = storeToRefs(showStatus);
  const { switchLang } = showStatus;

  /* The Composables for FirebaseAuthentication */
  import { useSignOut } from '@/composables/firebaseAuthComposables'; 

  /* Vue-router */
  import { useRouter } from 'vue-router';
  const router = useRouter();

  const signOutFromGoogle = () => {
    useSignOut();   /* UseSignOut is the composable's function using Firebase/Auth  */
    showMenu.value = false;
    router.push({path:'/welcome'});
  }
  const googleAccountConsole = () => {
    const googleAccountUrl = "https://myaccount.google.com/?hl=ja&authuser=0&utm_source=OGB&utm_medium=act";
    window.open(googleAccountUrl, '_blank');
  }

  defineEmits(['add', 'delete', 'save', 'get', ]);
</script>


<template>
  <div class="menubar">
    <div class="btn memo commands menu">

      <div class="btn memo copmmands browser">
      <!-- 追加ボタン / add button -->
        <button 
          @click="$emit('add')" 
          class="command-item btn add memo" 
        >
          <img 
            v-show="showMenuIcon" 
            class="icon add memo" 
            src="@/assets/imgs/Square-Add.svg"
            alt="Add Memo"
            v-tooltip="'Add Memo (Cmd+a)'"
          />
          <span
            v-show="showMenuText && langEn" 
            class="menubar btn text add memo en">
            Add Memo
          </span>
          <span
            v-show="showMenuText && langJa" 
            class="menubar btn text add memo ja">
            メモを追加
          </span> 
        </button>


      <!-- 削除ボタン / delete buton -->
        <button 
          @click="$emit('delete')" 
          class="command-item btn delete memo" 
        >
          <img 
            v-show="showMenuIcon" 
            class="icon add memo" 
            src="@/assets/imgs/Square-Delete.svg"
            alt="Delete Memo"
            v-tooltip="'Delete Selected Memo (Cmd+d)'"
          />
          <span
            v-show="showMenuText && langEn" 
            class="menubar btn text delete memo en">
            Delete Selected Memo
          </span> 
          <span
            v-show="showMenuText && langJa" 
            class="menubar btn text delete memo ja">
            選択したメモを削除
          </span> 
        </button>

      </div>

      <div class="btn memo copmmands cloud">
      <!-- 保存ボタン / save button -->
        <button 
          @click="$emit('save')" 
          class="command-item btn save memo" 
        >
          <img 
            v-show="showMenuIcon" 
            class="icon add memo cloud" 
            src="@/assets/imgs/Cloud-Upload.svg"
            alt="Save Memos"
            v-tooltip="'Save Memos to Cloud (Cmd+s)'"
          />
          <span
            v-show="showMenuText && langEn" 
            class="menubar btn text save memo en">
            Save Memos
          </span> 
          <span
            v-show="showMenuText && langJa" 
            class="menubar btn text save memo ja">
            メモを保存
          </span> 
        </button>

      <!-- 読込みボタン / read button -->
        <button 
          @click="$emit('get')" 
          class="command-item btn get memo" 
        >
          <img 
            v-show="showMenuIcon" 
            class="icon get memo" 
              src="@/assets/imgs/Cloud-Download.svg"
              alt="get Memos cloud"
              v-tooltip="'Reload Memos Saved on Cloud (Cmd+r)'"
          />
          <span
            v-show="showMenuText && langEn" 
            class="menubar btn text get memo en">
            Reload Saved Memos
          </span> 
          <span
            v-show="showMenuText && langJa" 
            class="menubar btn text get memo ja">
            メモを読込み
          </span> 
        </button>
        
      </div>

    </div>
    <div class="btn lang menu">
      <button @click="switchLang" class="command-item btn switchLang" >
        <img 
            class="switchLang icon" 
            src="@/assets/imgs/Language.svg"
            alt="Google Account Console"
        />
        <span class="btn text menubar" v-show="langJa">言語:>>英語</span> 
        <span class="btn text menubar" v-show="langEn">Lang:>>Japanese</span> 
      </button>
    </div>

    <div class="account menu">
      <div class="account info">
      
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
        <div class="copmmands account">
        <!-- Google Account Console -->
          <button @click="googleAccountConsole" class="menu-item btn account console" >
            <img 
                class="account-console icon" 
                src="@/assets/imgs/Link.svg"
                alt="Google Account Console"
            />
            <span class="menubar btn text" v-show="langJa">アカウントコンソール</span> 
            <span class="menubar btn text" v-show="langEn">Account Console</span> 
          </button>

          <button @click="signOutFromGoogle" class="menu-item btn account signout" >
            <img 
                class="signout icon" 
                src="@/assets/imgs/log-out.svg"
                alt="Sign-out"
            />
            <span class="menubar btn text account">Sign-Out</span> 
          </button>
        </div>
      </div>
      
    </div>
  </div>

</template>


<style scoped>
  div.menubar {
    padding: 0rem 1rem 0 1rem;
    display: block;
    height: 100%;
    text-align: left;
    z-index: 99;
    position: absolute;
    top: 3rem + 3px;
    left: 0.25rem;
    height: calc(100dvh - 7rem);
    background: linear-gradient(to right, var(--background) 0%, var(--brand-bg) 5%, var(--brand-bg) 95%, var(--background) 100%);
 }

 div.btn.commands {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin: 0;
    padding: 1rem 1rem 3rem 1rem;
    border-bottom: solid 3px var(--line);

    .btn.browser, .btn.cloud {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;

      .command-item {
        display: inline;
        text-align: left;
        margin-left: 0;
        background-color: rgba(0,0,0,0);
        height: 1.5rem;
        white-space: nowrap;
        &:hover { 
          cursor : pointer;
          border-bottom: 3px solid var(--line);
        }
        :is(span.menubar) {
          font-size: 1rem;
          vertical-align: super;
          color: var(--color);
        }
        :is(img.icon) {
          height: 100%;
          text-align: center;
          margin-right: 0.5rem;
        }
      }
    }
  }

  div.btn.lang {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin: 0;
    padding: 1rem 1rem 1rem 1rem;
    border-bottom: solid 3px var(--line);

    .command-item {
      display: inline;
      text-align: left;
      margin-left: 0;
      background-color: rgba(0,0,0,0);
      height: 1.5rem;
      white-space: nowrap;
      &:hover { 
        cursor : pointer;
        border-bottom: 3px solid var(--line);
      }
      :is(span.menubar) {
        font-size: 1rem;
        vertical-align: super;
        color: var(--color);
      }
      :is(img.icon) {
        height: 100%;
        text-align: center;
        margin-right: 0.5rem;
      }
    }
  }

  div.account {
    display: grid;
    grid-template-columns: 1fr;
    padding: 1rem 1rem 0 1rem;
    text-align: left;

    .displayName {
      height: 3rem;
      font-size: 1.5rem;
      color: var(--color);
    }
    .email {
      display: flex;
      height: 1.5rem;
      font-size: 1.0rem;
      color: var(--color);
      :is(img.icon) {
        height: 100%;
        margin-right: 1rem;
        text-align: center;
      }
    }
    
    .btn.account {
      display: inline;
      background-color: rgba(0,0,0,0);
      height: 1.5rem;
      white-space: nowrap;
      &:hover { 
        cursor : pointer;
        border-bottom: 3px solid var(--line);
      }
      &.console { text-align: left;};
      &.signout { 
        text-align: right;
        margin-top: 3rem;
      };
      :is(span.menubar) {
        font-size: 1rem;
        vertical-align: super;
        color: var(--color);
      }
      :is(img.icon) {
        height: 100%;
        text-align: center;
        margin-right: 1rem;
      }
    }
  }


  @media (prefers-color-scheme: dark) {
    /** svgアイコンを白黒反転 */
    img.icon {
        filter: invert(100%) grayscale(30%);
    }
  } 

</style>