import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    selectedContact: {},
    allContacts: [
      {
        id: 1, name: 'Boris', telephone: '+38096231231312', email: 'hmnbvfe@gmail.com',
      },
      { id: 2, name: 'Alex', telephone: '+38096231231312' },
      { id: 3, name: 'Berta', telephone: '+38096231231312' },
      { id: 4, name: 'Lera', telephone: '+38096231231312' },
      { id: 5, name: 'Nadia', telephone: '+38096231231312' },
    ],
    history: [],
  },
  mutations: {
    saveHistory(state, payload) {
      state.history.push(payload);
    },

    updateAllContacts(state, payload) {
      state.allContacts = state.allContacts.map((contact) => {
        if (contact.id !== payload.id) {
          return contact;
        }

        return { ...payload };
      });
    },

    addNewContact: (state, payload) => {
      state.allContacts.push(payload);
    },

    removeContact: (state, index) => {
      state.allContacts.splice(index, 1);
    },
  },

  actions: {
    updateContact({ commit }, payload) {
      commit('updateAllContacts', payload);
    },

    takeHistory({ commit }) {
      commit('updateAllContacts', this.state.history.pop());
    },
  },
  getters: {
    getContacts: (state) => state.allContacts,
    getContact: (state) => (contactId) => state.allContacts
      .find((contact) => contact.id === contactId),
  },
});

export default store;
