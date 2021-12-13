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
    DISCONNECT(state) {
      state.email = "";
      state.token = "";
      state.username = "";
      state.isAdmin = false;
    },
  },
  actions: {},
  modules: {},
  getters: {
    getusername: (state) => state.username,
    getemail: (state) => state.email,
    gettoken: (state) => state.token,
    getadmin: (state) => state.isAdmin,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
