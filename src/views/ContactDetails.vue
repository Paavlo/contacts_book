<template>
  <section class="details">
    <router-link
      to="/"
      v-show="!editing"
      class="goBackBtn"
      title="Contacts Book"
    ></router-link>

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

      <button
        class="detailsList__undoBtn"
        v-if="this.$store.state.history.length && !editing"
        @click="undo"
      >
      </button>

        <div v-if="!editing">
          <h2>{{ contact.name }}</h2>
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
                class="detailsList__del-btn"
                @click="removeProperty(key)"
              >
                Delete
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
    }),

    undo() {
      this.takeHistory();
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
  .goBackBtn {
    position: absolute;
    left: 10px;
    top: 30px;
    width: 50px;
    height: 50px;
    background-image: url("../assets/contactBook-icon.png");
    background-size: cover;
  }

  .details {
    position: relative;
    background: #e8e8e8;
    max-width: 1024px;
    min-width: 500px;
    min-height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;

    &List {
      width: 100%;

      &__btn {
        width: 150px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
      }

      &__addProp {
        background-image: url("../assets/addValue_icon.png");
      }
      &__undoBtn {
        background-image: url("../assets/undo_icon.png");
      }
      &__editBtn {
        background-image: url("../assets/editContact_icon.jpg");
      }

      &__addProp,
      &__undoBtn,
      &__editBtn {
        width: 50px;
        height: 50px;
        border-radius: 20px;
        border: 1px solid lightgrey;
        background-size: cover;

        &:hover {
          background-color: lightgrey;
        }
      }

      &__undoBtn {
        position: absolute;
        left: 80px;
        top: 30px;
      }

      &__del-btn {
        border: none;
        padding: 5px;
        font-weight: 700;
        cursor: pointer;
        border-radius: 20px;
        background: #fc3d39;
        transition: 0.2s;
        z-index: 5;

        &:hover {
          background: #e03633;
        }
      }

      &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        padding: 10px;
        background: snow;
        border-radius: 10px;
        text-align: left;
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
