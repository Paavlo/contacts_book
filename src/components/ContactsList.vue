<template>
  <ul class="contactsList">
    <vue-confirm-dialog class="left"></vue-confirm-dialog>
    <li
      v-for="contact in contacts"
      :key="contact.id"
      :title="contact.name"
    >
      <router-link
        :to="{ name: 'Details', params: { id: contact.id } }"
      >
        <div class="contactsList__item">
          <img
            src="../assets/avatar.svg"
            alt=""
            class="contactsList__info__avatar"
          >
          <h3 class="contactsList__info__name">
            {{ contact.name }}
          </h3>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
import store from '@/store';

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
};
</script>

<style scoped lang="scss">
  .contactsList {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    grid-gap: 20px;
    justify-content: center;

    & a {
      text-decoration: none;
      color: inherit;
    }

    &__item {
      height: 200px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      background: #fffafa;
      cursor: pointer;
      transition: 0.3s;
      border-radius: 20px;

      &:hover {
        box-shadow: 0 0 2px 2px $mainBlueColor;
        transform: scale(1.04);
        background: #e8e8e8;
      }
    }

    &__info {
      &__name {
        position: relative;
        color: $mainBlueColor;
        text-align: center;
        width: 100%;
        margin: 0;

        &::before {
          content: '';
          position: absolute;
          top: -5px;
          display: block;
          width: 100%;
          height: 1px;
          background: #2c3e50;
        }
      }

      &__avatar {
        margin-bottom: 10px;
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
