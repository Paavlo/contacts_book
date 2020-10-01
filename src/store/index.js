import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    selectedContact: {},
    allContacts: [],
    history: [],
  },

  mutations: {
    saveHistory(state, payload) {
      state.history.push(payload);
    },

    loadStorage(state, payload) {
      state.allContacts.push(payload);
    },

    updateAllContacts(state, payload) {
      state.allContacts = state.allContacts
        .map((contact) => {
          if (contact.id !== payload.id) {
            return contact;
          }

          return { ...payload };
        });
      localStorage.setItem('contacts', JSON.stringify(state.allContacts));
    },

    addNewContact: (state, payload) => {
      state.allContacts
        .push(payload);
      localStorage.setItem('contacts', JSON.stringify(state.allContacts));
    },

    removeContact: (state, target) => {
      state.allContacts
        .splice(
          state.allContacts
            .indexOf(target), 1,
        );
      localStorage.setItem('contacts', JSON.stringify(state.allContacts));
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
