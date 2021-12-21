<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4" lg="4">
            <div align="center" justify="center">
              Bienvenue sur le mur {{ getusername }}
            </div>
            <!-- Zone carte profil -->
            <v-card class="mx-auto" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-4">Carte {{ getusername }}</div>
                  <v-list-item-title class="text-h5 mb-1">
                    Membre
                  </v-list-item-title>
                  <v-list-item-subtitle
                    >Votre carte membre ! Oui, vous êtes
                    membre</v-list-item-subtitle
                  >
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="80"
                  color="grey"
                ></v-list-item-avatar>
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
                      <v-btn @click="fetchDeleteUser" class="btn_alert"
                        >Passez à l'action</v-btn
                      >
                      <router-link to="Wall" class="btn_home">
                        <v-btn color="green darken-2"
                          >Finalement je reste</v-btn
                        >
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
    /*     name: {
      get: function () {
        return store.state.username;
      },
      set: function (input) {
        this.newname = input;
      },
    },
    email: {
      get: function () {
        return store.state.email;
      },
      set: function (input) {
        this.newemail = input;
      },
    }, */
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
          console.log(response);
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

    testconsole() {
      /* let resultatN = this.newname === "" ? store.state.username : this.newname; */
      /* console.log(resultatN); */
      console.log(
        "résultat name =" + this.newname + "/résultat name =" + this.newemail
      );
    },
  },
};
</script>
