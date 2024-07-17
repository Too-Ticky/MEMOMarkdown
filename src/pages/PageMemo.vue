<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { storeToRefs } from 'pinia';

  /* The Pinia composable for Auth State Control */
  import { useAuthStore } from '@/stores/piniaAuthStore'; /* Stores for Authentication State */
  const authStore = useAuthStore();
  const { currentUser, isLoading } = storeToRefs(authStore);

  /* pinia store for showStatus */
  import { useStoreShowStatus } from '@/stores/piniaShowStatus';
  const showStatus = useStoreShowStatus();
  const { showCmd, showMenu,
          windowWidth, fontSize, editAreaWidth, CmdWidth, 
          dispSmall, itemsToShow, itemsWidth, 
        } = storeToRefs(showStatus);
  const { resetWithPageMEMO, layoutBreakPoint } = showStatus;
  resetWithPageMEMO(); /* Initialization of the Show flag */

  /* The pinia composable for the Memo data  */ 
  import { useMemoStore } from '@/stores/piniaMemoStore';  /* Stores for Memo Sentences */
  const memoStore = useMemoStore(); 
  const { memos, selectedIndex, } = storeToRefs(memoStore);  /* Store "State" */
  const { addMemo, deleteMemo, selectMemo, } = memoStore; /* Store "Actions" to assign on buttons/ShortCutKey */

  /* Firestore CRUD composables to assign on buttons/ShortCutKey */
  import { saveMemosToFirestore, getMemosFromFirestore } from '@/composables/firestoreMemosCRUD'
  const saveMemos = () => { 
    if(currentUser.value && currentUser.value.uid) {
      saveMemosToFirestore(currentUser.value.uid,memos.value.markdown);
      console.log("'saveMemosToFirestore' was executed ");
    } else {
      console.log("'saveMemosToFirestore' was not executed ");
    }
  };
  const getMemos = () => { 
    if(currentUser.value && currentUser.value.uid) {
      const memosFromFirestore = getMemosFromFirestore(currentUser.value.uid);
      memosFromFirestore.then((data) => {
        memos.value.markdown = data;
        console.log("'getMemosToFirestore' was executed ");
      }).catch((err) => {
        console.log("'getMemosToFirestore' was not executed. error: ", err);
      });
    }
  };

  /* Short Cut Key 
     Win: "Control + a", Mac: "command + a" - Add New Tab
     Win: "Control + Backspace, Mac: "command + delete" - Delete the selected Tab
     Win: "Control + s", Mac: "command + s" - Store Memos to the Cloud
     Win: "Control + r", Mac: "command + r" - Reload Memos from the Cloud
     Win: "Alt + ←/→", Mac: "option + ←/→" - Move the tab
  */
  onMounted(() => {
    document.onkeydown = (e) => {
    if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
      saveMemos();
      return false;
    } else if(e.key === 'r' && (e.metaKey || e.ctrlKey)) {
      getMemos();
      return false;
    } else if(e.key === 'a' && (e.metaKey || e.ctrlKey)) {
      addMemo();
      return false;
    } else if(e.key === 'Backspace' && (e.metaKey || e.ctrlKey)) {
      deleteMemo();
      return false;
    } else if(e.key === 'ArrowRight' && e.altKey) {
      if (selectedIndex.value < memos.value.markdown.length - 1) {
        selectMemo(selectedIndex.value + 1);
        return false;
      } 
    } else if(e.key === 'ArrowLeft' && e.altKey) {
      if (selectedIndex.value > 0) {
        selectMemo(selectedIndex.value - 1);
        return false;
      }
    }
  }});
  onBeforeUnmount(() => {
    document.onkeydown = null;
  });

  /* Ajuster for Responsive layout */
  import { useEventListener } from '@vueuse/core';
  const CmdEl = ref<HTMLElement|null >(null);
  useEventListener(window,"resize",() => {
    CmdEl.value = document.getElementById('Cmd')
    windowWidth.value = window.innerWidth; 
    fontSize.value = Math.max(16, Math.round(windowWidth.value / 50));
    document.body.style.fontSize = fontSize.value + "px";
    CmdWidth.value= CmdEl.value? CmdEl.value.clientWidth : 0;
    editAreaWidth.value  = window.innerWidth - fontSize.value * 2 - CmdWidth.value;
    itemsWidth.value  = (window.innerWidth < 480)? editAreaWidth.value/itemsToShow.value : 200;
    itemsToShow.value  = Math.floor(editAreaWidth.value / itemsWidth.value * 10 ) / 10;
    layoutBreakPoint();
  });

  /* Vue Components */
  import TheCmd from '@/components/TheCmd.vue'; /* Button Menu */
  import TheMenu from '@/components/TheMenu.vue'; /* Button Menu */
  import MDEditor    from '@/components/MDEditor.vue' /* Markdown editor with Carousel Tabs */
</script>


<template>
  <div class="editor">
    <div class="loading" v-show="isLoading"><h1>now Loading </h1></div>
    <div class="editor-body flex-context" v-show="currentUser">
      
      <aside class="editor-cmd flex-item" id="Cmd" ref="Cmd" >  
        <Transition name="slide-fade">    
          <TheCmd 
            v-show="showCmd && !dispSmall"
            @add="addMemo" 
            @delete="deleteMemo" 
            @save="saveMemos"
            @get="getMemos"
          />
        </Transition>
      </aside>

      <main class="editor-main flex-item">
        <Transition name="slide-fade">    
          <TheMenu
            v-show="showMenu && dispSmall" 
            @add="addMemo" 
            @delete="deleteMemo" 
            @save="saveMemos"
            @get="getMemos"
          />  
        </Transition> 
        <MDEditor />
      </main>

    </div>
  </div>
</template>


<style scoped lang="scss">
  html {
    @media screen and (max-width: 767px) {
    font-size: 50%; 
  } }

  div.editor {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--background);
    overflow-y: hidden;
  }
  div.editor-body {
    display: flex;
    height: 100%;
  }
  aside.editor-cmd.flex-item {
    background-color: var(--background); 
  }
  main.editor-main.flex-item {
    display: flex;
    background-color: var(--background-area); 
    height: 100%;
    width: 100%;
    overflow-y: hidden;
  }
</style>