<template>
  <ul class="contactsList">
    <vue-confirm-dialog class="left"></vue-confirm-dialog>
    <li
      v-for="(contact, index) in contacts"
      :key="contact.id"
      :title="contact.name"
    >
      <router-link
        :to="{ name: 'Details', params: { id: contact.id } }"
      >
        <div class="contactsList__item">
          <div class="contactsList__info">
            <h3 class="contactsList__info__name">
              {{ contact.name }}
            </h3>
          </div>

          <div class="contactList__btn">
            <button
              class="contactsList__btn__del"
              @click.prevent="askDelete(index)"
            >
              Delete contact
            </button>
          </div>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
import Vue from 'vue';
import { mapMutations } from 'vuex';
import store from '../store';

export default {
  name: 'ContanctsList',
  data() {
    return {
      showConfirm: false,
      selectedContact: null,
    };
  },
  computed: {
    contacts() {
      return store.getters.getContacts;
    },
  },
  methods: {
    ...mapMutations({
      removeContact: 'removeContact',
    }),

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
          }
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
  .contactsList {
    width: 100%;

    & a {
      text-decoration: none;
      color: inherit;
    }

    &__item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fffafa;
      padding: 10px;
      cursor: pointer;
      transition: 0.3s;
      margin-bottom: 5px;
      border-radius: 5px;

      &:hover {
        background: #efeded;
      }
    }

    &__info {
      height: content-box;
      display: flex;
      align-items: center;
      width: 50%;

      &__name {
        text-align: left;
        width: 100px;
        margin: 0;
      }

      &__tel {
        margin: 0 0 0 40px;
      }
    }

    &__btn__del {
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
  }
</style>
