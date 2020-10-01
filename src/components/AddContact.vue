<template>
  <form
    @submit.prevent="addContact"
    class="addContact"
  >
    <h2>Adding new contact</h2>

    <label>
      <input
        class="addContact__input"
        type="text"
        placeholder="Enter name"
        maxlength="20"
        v-model.trim="newContact.name"
        required
      />
    </label>
    <label>
      <input
        class="addContact__input"
        type="tel"
        placeholder="Enter number (+380XXXXXXXXX)"
        pattern="(\+380[0-9]{9})"
        v-model.trim="newContact.number"
        required
      />
    </label>

    <button class="addContact__addBtn">
      Add new contact
    </button>
  </form>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'AddContact',

  props: {
    hideForm: Function,
  },

  data() {
    return {
      newContact: {
        name: '',
        number: '',
        id: +new Date(),
      },
    };
  },

  methods: {
    ...mapMutations({
      addNewContact: 'addNewContact',
    }),

    addContact() {
      this.addNewContact({ ...this.newContact });
      this.newContact.name = '';
      this.newContact.number = '';
      this.hideForm();
    },
  },
};
</script>

<style scoped lang="scss">
  .addContact {
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
