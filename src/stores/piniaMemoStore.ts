/*
This Pinia store is selected 'setup function' syntax that is similar to the Vue Composition API.
*/
import { defineStore, } from 'pinia';
import { ref, reactive, computed, } from 'vue';
import type { ComputedRef } from 'vue';
import { getMemosFromFirestore, } from '@/composables/firestoreMemosCRUD' /* Composable for firestore */
import { useAuthStore } from '@/stores/piniaAuthStore'; /* Stores for Authentication State */
// const uid: string|undefined = inject('userID');

interface MemoState {
  markdown: string[];
}

export const useMemoStore = defineStore('memoStore', () => 

  { /* Store Definitions Here */
    const authStore :any = useAuthStore();

    /* "States"
      The following reactive variables having ref() or reactive() 
      correspond to "state" in "Option Object" syntax that is similar to the vue Options API. 
    */

    const memos = reactive<MemoState>({
      markdown: ["No Title"],
      // markdown: restoreMemos(uid ?? ''),
    });
    
    const selectedIndex = ref<number>(0);
    
    /* "Getters"
      The following variables having computed()
      coresspoind to "Getters" in "Option Object" syntax that is similar to the vue Options API. 
    */
      // Variables having computed() as needed here. (e.g. const a:number = computed(a*2))
    const uid: ComputedRef<string | null> = computed(() => {
      return authStore.usrinfo.uid
    });

    /* "Actions"
      The following functions correspond to "actions" in "Option Object" syntax. 
    */
   
   function addMemo():void {
      console.log(sessionStorage.memos);
      memos.markdown.push("New");
     // sessionStorage.setItem("memos",memos.markdown);
      sessionStorage.setItem("memos", memos.markdown.join(','));
      // location.reload();
    }
    
    function deleteMemo():void {
      console.log(memos.markdown[selectedIndex.value])
      memos.markdown.splice(selectedIndex.value,1)
      if(selectedIndex.value > 0) { selectedIndex.value--; }
      sessionStorage.setItem("memos", memos.markdown.join(','));
    }
    
    function selectMemo(index:number){ 
      selectedIndex.value = index; 
    }
    
    function restoreMemos(uid:string) { 
      console.log('uid:',uid)
      const restoreFromSessionStore = getSessionMemos()||[];
      const restoreFromFirestore = getMemosFromFirestore(uid);
      if (restoreFromSessionStore.length > 0) {
        console.log("restored from SessionStorage");
        return restoreFromSessionStore;
      }
      else if ( restoreFromFirestore ) {
        console.log("restored from Firestore",restoreFromFirestore);
        return restoreFromFirestore;
      } else {
        return "No Title";
      }
      function getSessionMemos() : string[] {
        const getSessionMemos = sessionStorage.getItem("memos");
        const sentences: string[] = [];
        if(getSessionMemos) {
          getSessionMemos.split(',').forEach((value) => {
            sentences.push(value);
          });
        } 
        return sentences;
      }
    }
    
    return { memos, selectedIndex, uid, addMemo, deleteMemo, selectMemo, restoreMemos };
  },

  { /* "pinia-plugin-persistedstate" Configration Here  */
    // persist: false,
    persist: {
      storage: sessionStorage,
      beforeRestore: (ctx) => {
        console.log(`(persist) about to restore '${ctx.store.$id}'`)
      },
      afterRestore: (ctx) => {
        console.log(`(persist) just restored '${ctx.store.$id}'`)
      },
    }
  }
);


