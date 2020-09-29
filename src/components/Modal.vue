<template>
  <transition name="modal-zoom">
    <div class="modal">
        <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
};
</script>

<style scoped lang="scss">
  .modal {
    cursor: default;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(44, 62, 80, 0.3);
    z-index: 999;

    &-zoom-enter-active,
    &-zoom-leave-active {
      animation-duration: 0.21s;
      animation-fill-mode: both;
      animation-name: zoom;
    }

    &-zoom-leave-active {
      animation-direction: reverse;
    }
  }

</style>
