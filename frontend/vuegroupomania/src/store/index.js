import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    email: "",
    token: "",
    isAdmin: false,
  },
  mutations: {
    POST_PROFIL(state, response) {
      state.username = response.username;
      state.email = response.email;
      state.token = response.token;
      state.isAdmin = response.isAdmin;
    },
  },
  actions: {},
  modules: {},
  getters: {
    username: (state) => state.username,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
