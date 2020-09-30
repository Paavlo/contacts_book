<template>
  <section class="contacts">
    <button
      @click="showAddContact"
      class="contacts__showAddForm"
      title="Add contact"
    >
    </button>
    <modal
      @click.native.self="showAddContact"
      v-show="addNewContact"
    >
      <add-contact
        :hideForm="showAddContact"
      ></add-contact>
    </modal>

    <contacts-list></contacts-list>

  </section>
</template>

<script>
import AddContact from '@/components/AddContact.vue';
import ContactsList from '@/components/ContactsList.vue';
import Modal from '@/components/Modal.vue';

export default {
  name: 'Contacts',

  title: 'Contacts',

  components: {
    Modal,
    ContactsList,
    AddContact,
  },

  data() {
    return {
      addNewContact: false,
    };
  },

  methods: {
    showAddContact() {
      this.addNewContact = !this.addNewContact;
    },
  },
};

</script>

<style scoped lang="scss">
  .contacts {
    background: #e8e8e8;
    max-width: 1024px;
    min-width: 500px;
    min-height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;

    &__showAddForm {
      width: 50px;
      height: 50px;
      border-radius: 20px;
      border: 1px solid lightgrey;
      background-image: url('../assets/addcontact-icon.svg');
      background-size: cover;
      cursor: pointer;

      &:hover {
        background-color: lightgrey;
      }
    }
  }
</style>
