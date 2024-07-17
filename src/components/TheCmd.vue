<script setup lang="ts">
  /* The pinia composable for the flag variables using display */
  import { storeToRefs } from 'pinia';
  import { useStoreShowStatus } from '@/stores/piniaShowStatus';
  const showStatus = useStoreShowStatus();
  const { showCmdIcon, showCmdText, langJa, langEn } = storeToRefs(showStatus);

  defineEmits(['add', 'delete', 'save', 'get', ]);
</script>


<template>
  <div class="side-menu Cmd">
    <div class="btn memo commands">

      <div class="btn memo copmmands browser">
      <!-- 追加ボタン / add button -->
        <button 
          @click="$emit('add')" 
          class="command-item btn add memo" 
        >
          <img 
            v-show="showCmdIcon" 
            class="icon add memo" 
            src="@/assets/imgs/Square-Add.svg"
            alt="Add Memo"
            v-tooltip="'Add Memo (Cmd+a)'"
          />
          <span
            v-show="showCmdText && langEn" 
            class="text add memo en">
            Add Memo
          </span>
          <span
            v-show="showCmdText && langJa" 
            class="text add memo ja">
            メモを追加
          </span> 
        </button>


      <!-- 削除ボタン / delete buton -->
        <button 
          @click="$emit('delete')" 
          class="command-item btn delete memo" 
        >
          <img 
            v-show="showCmdIcon" 
            class="icon add memo" 
            src="@/assets/imgs/Square-Delete.svg"
            alt="Delete Memo"
            v-tooltip="'Delete Selected Memo (Cmd+d)'"
          />
          <span
            v-show="showCmdText && langEn" 
            class="text delete memo en">
            Delete Selected Memo
          </span> 
          <span
            v-show="showCmdText && langJa" 
            class="text delete memo ja">
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
            v-show="showCmdIcon" 
            class="icon add memo cloud" 
            src="@/assets/imgs/Cloud-Upload.svg"
            alt="Save Memos"
            v-tooltip="'Save Memos to Cloud (Cmd+s)'"
          />
          <span
            v-show="showCmdText && langEn" 
            class="text save memo en">
            Save Memos
          </span> 
          <span
            v-show="showCmdText && langJa" 
            class="text save memo ja">
            メモを保存
          </span> 
        </button>

      <!-- 読込みボタン / read button -->
        <button 
          @click="$emit('get')" 
          class="command-item btn get memo" 
        >
          <img 
            v-show="showCmdIcon" 
            class="icon get memo" 
              src="@/assets/imgs/Cloud-Download.svg"
              alt="get Memos cloud"
              v-tooltip="'Reload Memos Saved on Cloud (Cmd+r)'"
          />
          <span
            v-show="showCmdText && langEn" 
            class="text get memo en">
            Reload Saved Memos
          </span> 
          <span
            v-show="showCmdText && langJa" 
            class="text get memo ja">
            メモを読込み
          </span> 
        </button>
        
      </div>

    </div>
  </div>

</template>


<style scoped>
  div.Cmd {
    padding-top: 3rem;
    display: block;
    height: 100%;
    text-align: left;
    z-index: 5;
    /* border: dashed 3px yellowgreen; */
 }
 div.btn.commands {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
 }
div.btn.browser, div.btn.cloud {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
button.command-item {
  display: inline;
  text-align: left;
  margin-left: 0;
  margin-right: 1rem;
  background: var(--background);
  color: var(--color);
  height: 1.5rem;
  white-space: nowrap;
  &:hover { 
    cursor : pointer;
    border-bottom: 3px solid var(--line);
  }
}
span.text {
  font-size: 1rem;
  vertical-align: super;
}
img.icon {
  height: 100%;
  text-align: center;
  margin-right: 0.5rem;
}

@media (prefers-color-scheme: dark) {
  /** svgアイコンを白黒反転 */
  img.icon {
      filter: invert(100%) grayscale(30%);
  }
} 

</style>