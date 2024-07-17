<script setup lang="ts">
  import { computed, } from 'vue';
  import { storeToRefs } from 'pinia';

  /* pinia store for showStatus */
  import { useStoreShowStatus } from '@/stores/piniaShowStatus';
  const showStatus = useStoreShowStatus();
  const { itemsToShow, itemsWidth } = storeToRefs(showStatus);  /* Store "State" */

  /* Pinia Store and it's Composables for the Memo Sentence data  */ 
  import { useMemoStore } from '@/stores/piniaMemoStore';  /* Stores for Memo Sentences */
  const memoStore = useMemoStore(); 
  const { memos, selectedIndex, } = storeToRefs(memoStore);  /* Store "State" */
  const { selectMemo, } = memoStore; /* Store "Actions"  */
  
  //* JS Libraries of Compiler for parsing MarkDown */
  import { Marked } from "marked"; 
  const marked = new Marked();
  
  /* Preview parsed to MarkDown */
  const preview = computed(() => {
    if(memos.value.markdown[selectedIndex.value]) {
      // console.log("md:", marked.parse(memos.value.markdown[selectedIndex.value]));
      return marked.parse(memos.value.markdown[selectedIndex.value]);
    }
    return '';
  });

  /* Tab Titles which are extracted from the beginning of the sentense */
  const displayTitle = (text: string | null) => text ? text.split('\n')[0] : undefined; 

  /* Vue carousel component libraries to use Tab layout */
  import { Carousel, Navigation, Slide, } from 'vue3-carousel';
  import '@/assets/css/vue3-carousel-Optimized.css';
</script>


<template>
  <div class="context main-area" id="tgtEl" ref="el">

  <!-- Tabs of Memo list -->
    <Carousel 
      ref="carousel" 
      class="conteet tab-area flex-item"
      :items-to-show="itemsToShow" 
      :wrap-around="false" 
      :snap-align="'start'"
      :mouse-drag="true"
      :touch-drag="true"
      :transition="500"
    >
      <template #slides>
        <Slide class="flex-item tabs memolist" 
          v-for="(memo, index) in memos.markdown" :key="index"
          @click="selectMemo(index)" :data-selected="index == selectedIndex"
          :style="{ 'max-width': itemsWidth + 'px' }"
        >
          <p class="memoTitle arousel__item"> {{ displayTitle(memo) }} </p>
        </Slide >
      </template>

      <template #addons="{ slidesCount }">
        <Navigation v-if="slidesCount > 1" />
      </template>
    </Carousel>
  <!-- Editor -->
    <div class="edit-area context flex-item  ">
      <!-- Input sentences -->
      <div class="sentence ">
        <h2 class="area-title">Source Sentences</h2>
        <textarea class="source sentence" v-model="memos.markdown[selectedIndex]"
          placeholder="Input any sentences to convert."
          required
          name="Markdown Sentences Area"
        />
      </div>
      <!-- Convered to MarkDown  -->
      <div class="markdown">  
        <h2 class="area-title">Markdown Preview</h2>
        <div class="preview markdown markdown-body" v-html="preview"
          name="Converted Markdown Sentences Area"
        ></div>
      </div> 
    </div>
  </div>
</template>


<style>
  :root {
    --tab-bg-selected: #0c4da2;
    --tab-txt-selected: #ffff00;;;
    --tab-bg-even: #9fcc99;
    --tab-tx-even: #000000;
    --tab-bg-odd: #d0e39b;
    --tab-tx-odd: #000000;
    --font-source: sans-serif;
    --font-preview: sans-serif;

    @media (prefers-color-scheme: dark) {
      --tab-bg-selected: #0c4da2;;
      --tab-txt-selected: #ffff00;
      --tab-bg-even: #9fcc99;
      --tab-txt-even: #000000;
      --tab-bg-odd: #d0e39b;
      --tab-txt-odd: #000000;
    }
  }
</style>

<style scoped lang="scss">
  @import url("@/assets/css/github-markdown.css");

  div.main-area {
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
    background-color: var(--background);
  }
  aside.side-menu {
    background-color: var(--background);
    border: 0;
  }
  div.context.tab-area {
    box-sizing: border-box;
    width: 100%;
    text-align: left;
  }
  div.flex-item.tabs.memolist {
    display: inline-flex;
    flex-wrap: wrap-reverse;
    text-align: left;
    flex-direction: row column-reverse;
    margin: 0 auto 0 0;
    align-items: top;
    gap: 0;
    width: 100%;
    min-width: 10rem;
    height: 4rem;
    box-sizing: border-box;
  }
  p.memoTitle {
    width:100%;
    height: 4rem;

    &[data-selected="true"] {
      color: var(--tab-txt-selected);
    }
    height:100%;
    font-size: 1.4rem;
    padding: 1rem;
    margin: 0;
    margin-block-start: 0;
    margin-block-end: 0;
    line-height: 1;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
  }
  div.edit-area.context.flex-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: calc(100% - 2rem);
    height:calc( 100dvh - 12rem - 5px);
    padding: 0 1rem 1rem 1rem;
    position: relative;
    top: -1rem;
    gap: 1rem;
    border-radius: 1rem;
    background:  linear-gradient(180deg, var(--brand-bg), var(--brand4),var(--brand-bg),var(--brand4),var(--brand-bg));
    z-index: 3;
    overflow: hidden;
  }
  h2.area-title {
    margin-top: 0;
    font-size: 2rem;
    text-align: center;
    color: var(--tab-txt-selected);
  }
  div.sentence {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
  textarea.source.sentence {
    width:100%;
    height:100%;
    border: solid 3px var(--tab-bg-selected);
    padding: 1rem;
    color: var(--color);
    background-color: var(--background);
    box-sizing: border-box;
    font-size: 1.2rem;
    overflow-y: auto;
    border: solid 3px var(--line);
    border-radius: 0.7rem;
    font-family: var(--font-source);
  }
  div.markdown {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    border-radius: 0.7rem;
  }
  div.preview.markdown {
    width: 100%;
    height: 100%;
    text-align: left;
    color: var(--color);
    border: solid 3px var(--tab-bg-selected);
    padding: 1rem;
    background-color: var(--background-preview);
    box-sizing: border-box;
    font-size: 1.2rem;
    overflow: auto;
    font-family: var(--font-preview);
  }
  code {
    color:black;
  }
  @media (prefers-color-scheme: dark) {
    :div.preview.markdown {
      background: #303030;
  }}

  @media (max-width: 480px) { 
  :root {
    div.edit-area.context.flex-item {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
      overflow-y: auto;
    }
    div.sentence, div.markdown {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    div.flex-item.tabs.memolist {
      display: flex;
      flex-wrap: wrap-reverse;
      flex-direction: row column-reverse;
    }
  }}

  table tbody {
    overflow: hidden;
  }
</style>

