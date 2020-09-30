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
    @include contentBox;
    background: $mainSectionsBackground;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__showAddForm {
      width: 50px;
      height: 50px;
      border-radius: 20px;
      border: 1px solid lightgrey;
      background-image: url('../assets/addcontact-icon.svg');
      background-size: 80%;
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;
      transition: 0.2s;

      &:hover {
        transform: scale(1.03);
        background-color: lightgrey;
      }
    }
  }
</style>
