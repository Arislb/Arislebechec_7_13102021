<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4" lg="4">
            <div align="center" justify="center">
              Bienvenue sur ton Profil {{ getusername }}
            </div>
            <!-- Zone carte profil -->
            <v-card class="mx-auto" max-width="500" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-4">Carte {{ getusername }}</div>
                  <v-list-item-title class="text-h5 mb-1">
                    Membre Groupomania
                  </v-list-item-title>
                  <v-list-item-subtitle
                    >Votre carte membre est liée à cet email:
                    {{ getemail }}</v-list-item-subtitle
                  >
                </v-list-item-content>

                <v-avatar size="100">
                  <v-icon size="100" color="pink lighten-2">
                    mdi-account-circle
                  </v-icon>
                </v-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn outlined rounded text @click="hidden = !hidden">
                  Modifier
                </v-btn>
                <v-btn
                  plain
                  text
                  @click="alert()"
                  v-if="noAlert"
                  depressed
                  color="error"
                  class="btn-delete"
                >
                  Supprimer le compte
                </v-btn>
                <v-alert
                  v-if="alertProfil"
                  prominent
                  type="error"
                  class="container-alert"
                >
                  <v-row align="center">
                    <v-col class="grow">
                      La suppression du compte est définitive
                    </v-col>
                    <v-col class="shrink d-flex">
                      <v-btn @click="fetchDeleteUser" class="btn-alert"
                        >Confirmer</v-btn
                      >
                      <router-link to="Wall" class="btn-home">
                        <v-btn color="green darken-2">Annuler</v-btn>
                      </router-link>
                    </v-col>
                  </v-row>
                </v-alert>
              </v-card-actions>
            </v-card>
            <!-- Zone fin carte profil ^^-->
            <!-- Formulaire de modification du profil -->
            <v-form v-show="hidden">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="newname"
                      :placeholder="[[getusername]]"
                      label="Username"
                      :rules="nameRules"
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="newemail"
                      :placeholder="[[getemail]]"
                      label="E-mail"
                      :rules="emailRules"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-btn @click="fetchModifyUser">Valider</v-btn>
              </v-container>
            </v-form>
            <!-- Formulaire de modification du profil Fin-->
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
/* import store from "../store"; */
export default {
  data() {
    return {
      valid: true,
      newname: "",
      nameRules: [
        (v) => !!v || "Le nom est requis",
        (v) => v.length <= 10 || "Min. 10 caractères",
      ],
      newemail: "",
      emailRules: [
        (v) => !!v || "Email est requis",
        (v) => /.+@.+/.test(v) || " L'e-mail doit être valide",
      ],
      hidden: false,
      alertProfil: false,
      noAlert: true,
    };
  },
  computed: {
    ...mapGetters(["getusername", "getemail"]),
  },
  methods: {
    alert() {
      (this.alertProfil = true), (this.noAlert = false);
    },
    fetchModifyUser() {
      fetch("http://localhost:3000/api/auth", {
        method: "PUT",
        body: JSON.stringify({ username: this.newname, email: this.newemail }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.state.token,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          this.$store.commit("POST_PROFIL", response);
          this.$router.push({ name: "Wall" });
        });
    },

    //Suppression d'un utilisateur
    fetchDeleteUser() {
      fetch("http://localhost:3000/api/auth/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.state.token,
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(() => {
          this.$store.commit("DISCONNECT");
          sessionStorage.clear();
          this.$router.push({ name: "Accueil" });
        });
    },
  },
};
</script>

<style scoped>
.btn-home {
  margin-left: 0.5vw;
}
</style>