<template>
  <section class="details">

    <modal v-show="addProperty" @click.native.self="addPropertyStatus">
      <add-new-property
        :closeModal="addPropertyStatus"
        :submitAdding="submitAdding"
        v-if="addProperty"
      ></add-new-property>
    </modal>

    <vue-confirm-dialog></vue-confirm-dialog>

    <div v-if="!contact">
      <h1>
        User not found!
      </h1>
    </div>
    <div class="detailsList">

        <div v-if="!editing">
          <h2 class="detailsList__name">{{ contact.name }}</h2>
          <template v-for="(value, key) in contact">
            <div
              v-if="key !== 'id' && key !== 'name'"
              :key="key"
              class="detailsList__item"
            >
              <div class="detailsList__keys">
                <h3 class="detailsList__keys-key">{{ key === 'tel' ? 'Number' : key }}</h3>
                <p class="detailsList__keys-value">{{ value }}</p>
              </div>

              <button
                class="detailsList__delProp"
                @click="removeProperty(key)"
              >
              </button>
            </div>
          </template>
        </div>

      <div
        class="detailsList__btn"
        v-if="!editing"
      >
        <button
          class="detailsList__addProp"
          @click="addPropertyStatus"
        >
        </button>
        <button
          class="detailsList__editBtn"
          @click="editContactInfo"
        >
        </button>

        <button
          class="detailsList__delContact"
          @click.prevent="askDelete(contact.id)"
        >
          Delete contact
        </button>

        <button
          class="detailsList__undoBtn"
          v-if="this.$store.state.history.length && !editing"
          @click="undo"
        >
        </button>
      </div>
    </div>

    <edit-contact
      v-if="editing"
      :contact="contact"
      :editContactInfo="editContactInfo"
    ></edit-contact>

  </section>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapMutations } from 'vuex';

import EditContact from '@/components/EditContact.vue';
import AddNewProperty from '@/components/AddNewProperty.vue';
import Modal from '@/components/Modal.vue';

import store from '@/store';

export default {
  name: 'ContactDetails',

  title() {
    return `${this.contact.name}'s number`;
  },

  components: {
    Modal,
    AddNewProperty,
    EditContact,
  },

  data() {
    return {
      currentContact: this.contact,
      editing: false,
      addProperty: false,
      editedValues: {},
    };
  },

  computed: {
    contactId() {
      return this.$route.params.id;
    },

    contact() {
      return store.getters.getContact(+this.contactId);
    },
  },

  methods: {
    ...mapActions({
      updateContact: 'updateContact',
      takeHistory: 'takeHistory',
    }),

    ...mapMutations({
      saveHistory: 'saveHistory',
      deleteKey: 'deleteKey',
      removeContact: 'removeContact',
    }),

    undo() {
      this.takeHistory();
    },

    askDelete(index) {
      Vue.$confirm({
        title: 'Are you sure?',
        message: 'Are you sure to delete the contact?',
        button: {
          yes: 'Yes',
          no: 'Cancel',
        },
        callback: (confirm) => {
          if (confirm) {
            this.removeContact(index);
            this.$router.push({ path: '/' });
          }
        },
      });
    },

    removeProperty(key) {
      Vue.$confirm({
        title: 'Are you sure?',
        message: `Are you sure to delete the ${key}?`,
        button: {
          yes: 'Yes',
          no: 'Cancel',
        },

        callback: (confirm) => {
          if (confirm) {
            this.saveHistory({ ...this.contact });
            this.$delete(this.contact, key);
            this.updateContact(this.contact);
          }
        },
      });
    },

    submitAdding(key, value) {
      this.saveHistory({ ...this.contact });
      this.$set(this.contact, key, value);
      this.updateContact({ ...this.contact });
    },

    editContactInfo() {
      this.editing = !this.editing;
    },

    addPropertyStatus() {
      this.addProperty = !this.addProperty;
    },
  },
};
</script>

<style lang="scss">

  .details {
    @include contentBox;
    position: relative;
    background: $mainSectionsBackground;
    display: flex;
    flex-direction: column;
    align-items: center;

    &List {
      width: 100%;

      &__name {
        color: $mainBlueColor;
      }

      &__btn {
        width: 300px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
      }

      &__delContact {
        border: 1px solid lightgrey;
        border-radius: 20px;
        transition: 0.2s;
        font-weight: 700;
        font-size: 1rem;
        cursor: pointer;

        &:hover {
          transform: scale(1.1);
          background-color: lightgrey;
        }

        &:active {
          box-shadow: 0 0 2px 2px $mainBlueColor;
        }
      }

      &__addProp {
        background-image: url("../assets/addValue_icon.png");
      }
      &__undoBtn {
        background-image: url("../assets/undo_icon.png");
      }
      &__editBtn {
        background-image: url("../assets/edit.svg");
      }
      &__delProp {
        background-image: url("../assets/garbage.svg");
      }
      &__addProp,
      &__undoBtn,
      &__editBtn,
      &__delProp {
        @include btnIconsStyle;
      }

      &__delProp {
        width: 40px;
        height: 40px;
      }

      &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding: 10px;
        background: snow;
        color: black;
        border-radius: 10px;
        text-align: left;
        transition: 0.2s;

        &:hover {
          box-shadow: 0 0 10px 0 $mainBlueColor;
        }
      }

      &__keys {
        width: 50%;
        display: flex;
        align-items: center;
        flex-direction: row;

        &-key {
          min-width: 200px;
          margin: 0;
          text-transform: capitalize;
        }

        &-value {
          margin: 0;
        }
      }
    }
  }
</style>
