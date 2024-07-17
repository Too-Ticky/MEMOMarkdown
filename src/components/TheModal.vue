<script setup>
  import { ref } from 'vue';
  const { show } = defineProps({
    show: Boolean
  });

  /* When the outside of the element is clicked, an element is closed */
  import { onClickOutside } from '@vueuse/core'; /* Listen for clicks outside of an element.  */
  const targetModal = ref(null)
  const isModalVisible = ref(show);
  onClickOutside(
    targetModal, 
    (event) => {
      console.log(event,"click outside of Account menu @TheAccountMenu.vue");
      isModalVisible.value = false;
    },
  );
  const onClickOK = () => {
    isModalVisible.value = false;
  };

</script>

<template>
  <Transition name="modal">
    <div v-if="isModalVisible" class="modal-mask">
      <div class="modal-container"  ref="targetModal">
        <div class="modal-header">
          <slot name="title">default header</slot>
        </div>

        <div class="modal-body">
          <slot name="body">default body</slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button
              class="modal-default-button"
              @click="onClickOK"
            >OK</button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-mask {
  display: flex;
  justify-content: center;
  position: absolute;
  top: calc(3rem + 3px);
  width: calc(100vw - 2rem);
  height: calc(100dvh - 7rem);
  margin: auto;
  transition: opacity 0.3s ease;
  padding: 0;
  text-align: center;
  z-index: 12;
}

.modal-container {
  box-sizing: border-box;
  box-shadow: inset 0px 0px 5px 3px var(--line);
  border-radius: 0.5rem;
  background: var(--background);
  overflow: auto;
  margin: 1rem auto auto auto;
  padding: 20px 30px;
  transition: all 0.3s ease;
}

.modal-header h3 {
  border-bottom: solid 3px var(--line);
  margin-top: 0;
}

.modal-body {
  margin: 20px 0;
}

button.modal-default-button {
  display: inline-block;
  padding: 1rem;
  width: 10rem;
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
  &:hover { cursor : pointer; }

}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>