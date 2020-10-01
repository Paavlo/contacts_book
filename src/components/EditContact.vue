<template>
  <form class="edit"
        @submit.prevent="updateUser"
  >
    <h1>Editing contact</h1>
    <label
      class="edit__label"
      v-for="(value, key) in oldContact"
      :key="key"
    >

      <span class="edit__key">
        {{ key !== 'id' ? key : null }}
      </span>

      <input
        class="edit__item"
        v-if="key !== 'id'"
        :placeholder="key"
        maxlength="35"
        v-model="oldContact[key]"
      />
    </label>

    <div class="edit__holder-btn">
      <button
        class="edit__btn edit__btn-yes"
        @click="cancelEditing"
        type="button"
      >
        Cancel
      </button>
      <button
        class="edit__btn edit__btn-no"
        type="submit"
        :disabled="JSON.stringify(this.contact) === JSON.stringify(this.oldContact)"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import Vue from 'vue';
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'EditContact',

  props: {
    contact: Object,
    editContactInfo: Function,
  },

  data() {
    return {
      oldContact: { ...this.contact },
    };
  },

  methods: {
    ...mapMutations({
      saveHistory: 'saveHistory',
    }),

    ...mapActions({
      updateContact: 'updateContact',
    }),

    cancelEditing() {
      Vue.$confirm({
        message: 'Are you sure to cancel editing the contact?',
        button: {
          yes: 'Yes',
          no: 'Discard',
        },

        callback: (confirm) => {
          if (confirm) {
            this.editContactInfo();
          }
        },
      });
    },

    updateUser() {
      if (JSON.stringify(this.contact) !== JSON.stringify(this.oldContact)) {
        this.saveHistory({ ...this.contact });
      }

      this.updateContact(this.oldContact);
      this.editContactInfo();
    },
  },
};
</script>

<style scoped lang="scss">
 .edit {
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;

   &__label {
     width: inherit;
     text-align: left;
   }

   &__key {
     text-transform: capitalize;
     font-weight: 500;
   }

   &__item {
     display: flex;
     justify-content: space-between;
     width: 100%;
     align-items: center;
     margin-bottom: 15px;
     padding: 10px;
     background: snow;
     border-radius: 10px;
     text-align: left;

     @include inputActive;
   }

   &__holder-btn {
     width: 100%;
   }

   &__btn {
     width: 50%;
     padding: 10px;
     font-weight: 700;
     cursor: pointer;
     background: #e1e1e1;
     color: $mainBlueColor;
     transition: 0.2s;
     border: 1px solid gray;

     &-no {
       border-radius: 0 10px 10px 0;

       &:hover {
         background: #4fcc64;
       }
     }

     &-yes {
       border-radius: 10px 0 0 10px;

       &:hover {
         background: #e03633;
       }
     }
   }
 }
</style>
