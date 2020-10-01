<template>
  <form
    @submit="sendData"
    class="newProp"
  >
    <label>
      <input
        class="newProp__input"
        type="text"
        placeholder="What do you wanna add?"
        maxlength="20"
        v-model.trim="newProperty.key"
      >
    </label>
    <label>
      <input
        class="newProp__input"
        type="text"
        placeholder="Enter value"
        maxlength="35"
        v-model.trim="newProperty.value"
      >
    </label>
    <button
      class="newProp__addBtn"
    >
      Add
    </button>
  </form>
</template>

<script>

export default {
  name: 'AddNewProperty',

  props: {
    closeModal: Function,
    submitAdding: Function,
  },

  data() {
    return {
      newProperty: {
        key: '',
        value: '',
      },
    };
  },

  methods: {
    sendData() {
      const { key, value } = this.newProperty;
      if (!key.length || !value.length) {
        return;
      }
      this.submitAdding(key, value);
      this.closeModal();
    },
  },
};
</script>

<style scoped lang="scss">
  .newProp {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 280px;
    padding: 10px;
    margin: 0 auto;
    background: whitesmoke;
    border: 1px solid whitesmoke;
    border-radius: 20px;
    z-index: 1000;

    &__input {
      width: 100%;
      padding: 5px;
      margin-bottom: 10px;
      background: #e2e2e2;
      border: 1px solid whitesmoke;
      border-radius: 10px;
      transition: 0.3s;

      @include inputActive;

      &:hover {
        background: #d3d3d3;
      }
    }

    &__addBtn {
      padding: 5px;
      font-weight: 700;
      cursor: pointer;
      border-radius: 20px;
      background: #e0e0e0;
      color: $mainBlueColor;
      transition: 0.2s;
      border: 1px solid gray;

      &:hover {
        background: #4fcc64;
      }
    }
  }
</style>
