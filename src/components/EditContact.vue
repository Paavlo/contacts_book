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

      {{ key !== 'id' ? `New value for ${key}` : null }}

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
   background: #e8e8e8;
   display: flex;
   flex-direction: column;
   align-items: center;

   &__label {
     width: inherit;
     text-align: left;
   }

   &__item {
     display: flex;
     justify-content: space-between;
     width: 100%;
     align-items: center;
     margin-bottom: 10px;
     padding: 10px;
     background: snow;
     border-radius: 10px;
     text-align: left;
   }

   &__holder-btn {
     width: 100%;
   }

   &__btn {
     width: 50%;
     border: none;
     padding: 10px;
     font-weight: 700;
     cursor: pointer;
     transition: 0.2s;

     &-no {
       border-radius: 0 10px 10px 0;
       background: #53d769;

       &:hover {
         background: #4fcc64;
       }
     }

     &-yes {
       border-radius: 10px 0 0 10px;
       background: #fc3d39;

       &:hover {
         background: #e03633;
       }
     }
   }
 }
</style>
