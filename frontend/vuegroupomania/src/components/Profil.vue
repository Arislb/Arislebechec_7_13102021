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
                <v-btn outlined rounded text> Supprimer</v-btn>
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
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="newemail"
                      :placeholder="[[getemail]]"
                      label="E-mail"
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
      newname: "",
      newemail: "",
      hidden: false,
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
