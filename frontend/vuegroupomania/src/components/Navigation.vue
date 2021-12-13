<template>
  <nav class="topbar">
    <v-app-bar
      absolute
      color="grey"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
      app
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Groupomania</v-toolbar-title>

      <v-spacer></v-spacer>

      <router-link class="link" to="/Wall"
        ><v-btn text> Tableau </v-btn></router-link
      >

      <router-link class="link" to="/Profil"
        ><v-btn text> Profil </v-btn></router-link
      >

      <v-btn text @click="disconnect"> déconnexion </v-btn>
    </v-app-bar>

    <!-- Navigation pour mobile. -->
    <v-navigation-drawer v-model="drawer" app class="drawer d-flex flex-column">
      <v-list>
        <v-list-item
          ><router-link class="link" to="/Wall"
            ><v-btn text> Tableau </v-btn></router-link
          ></v-list-item
        >

        <v-list-item
          ><router-link class="link" to="/Profil"
            ><v-btn text> Profil </v-btn></router-link
          ></v-list-item
        >
        <v-list-item
          ><v-btn text @click="disconnect"> déconnexion </v-btn></v-list-item
        >
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<style scoped>
.link {
  text-decoration: none;
}
.topbar {
  position: sticky;
  top: 0;
  z-index: 1;
}
.drawer {
  z-index: 2;
}
</style>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    // Methode pour déconnecté l'utilisateur

    disconnect() {
      this.$store.commit("DISCONNECT");
      sessionStorage.clear();
      this.$router.push({ name: "Accueil" });
    },
  },
};
</script>