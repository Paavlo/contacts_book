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
      @include btnIconsStyle;
      background-image: url('../assets/addcontact-icon.svg');
      cursor: pointer;

      &:hover {
        transform: scale(1.03);
        background-color: lightgrey;
      }
    }
  }
</style>
