<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center dense">
          <v-col cols="12" sm="8" md="4" lg="4">
            <!-- Carte de login -->
            <v-card elevation="0" class="displaylogin">
              <v-img
                src="@/assets/icon-left-font-monochrome-black.png"
                alt="Jsp"
                target="_blank"
                class="logo"
              ></v-img>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Your email"
                    name="Email"
                    prepend-inner-icon="mdi-mail"
                    type="email"
                    class="rounded-0"
                    outlined
                    v-model="email"
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    name="Password"
                    prepend-inner-icon="mdi-lock"
                    type="password"
                    class="rounded-0"
                    outlined
                    v-model="password"
                  ></v-text-field>
                  <v-btn
                    class="rounded-0"
                    color="#000000"
                    x-large
                    block
                    dark
                    @click="fetchLogin"
                    >Login</v-btn
                  >
                  <v-card-action class="text--secondary">
                    <v-spacer></v-spacer>
                    No account?
                    <a
                      href="#"
                      class="pl-2"
                      style="color: #000000"
                      @click="clickSignup"
                      >Sign Up</a
                    >
                  </v-card-action>
                </v-form>
              </v-card-text>
            </v-card>
            <!-- Carte de signup -->
            <v-card elevation="0" class="displayform backlogin">
              <v-img
                src="@/assets/icon-left-font-monochrome-black.png"
                alt="Jsp"
                target="_blank"
                class="logo"
              ></v-img>
              <v-card-text>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    label="Your name"
                    name="name"
                    prepend-inner-icon="mdi-mail"
                    type="name"
                    class="rounded-0"
                    outlined
                    v-model="name"
                    :rules="nameRules"
                  ></v-text-field>
                  <v-text-field
                    label="Your email"
                    name="Email"
                    prepend-inner-icon="mdi-mail"
                    type="email"
                    class="rounded-0"
                    outlined
                    v-model="email"
                    :rules="emailRules"
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    name="Password"
                    prepend-inner-icon="mdi-lock"
                    type="password"
                    class="rounded=0"
                    outlined
                    v-model="password"
                    :rules="passwordRules"
                  ></v-text-field>
                  <!-- Bouton SIGNUP -->
                  <v-btn
                    class="rounded-0"
                    color="#000000"
                    x-large
                    block
                    dark
                    :disabled="!valid"
                    @click="fetchSignup"
                    >Sign up</v-btn
                  >
                  <v-card-action class="text--secondary">
                    <v-spacer></v-spacer>
                    I have a account
                    <a
                      href="#"
                      class="pl-2"
                      style="color: #000000"
                      @click="clickLogin"
                      >Login</a
                    >
                  </v-card-action>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "Le nom est requis",
        (v) => v.length <= 10 || "Min. 10 caractères",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "Email est requis",
        (v) => /.+@.+/.test(v) || " L'e-mail doit être valide",
      ],
      password: "",
      passwordRules: [
        (v) => !!v || "Le mot de passe est requis",
        (v) =>
          (v && v.length >= 5) || "Le mot de passe doit avoir 5+ caractères",
        //v => /(?=.*[AZ])/.test(v) || 'Doit avoir un caractère majuscule',
        //v => /(?=.*\d)/.test(v) || 'Doit avoir un numéro',
        //v => /([!@$%])/.test(v) || 'Doit avoir un caractère spécial [!@#$%]'
      ],
    };
  },
  methods: {
    //Fetch permettant de renvoyer les info a la connexion
    fetchLogin() {
      const datalog = {
        email: this.email,
        password: this.password,
      };
      fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify(datalog),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then((response) => {
          if (response.token) {
            sessionStorage.setItem("LogOk", JSON.stringify("1"));
            this.$store.commit("POST_PROFIL", response);
            this.$router.push("Wall");
          }
        });
    },
    //Fetch permettant de créer un compte
    fetchSignup() {
      const datasign = {
        username: this.name,
        email: this.email,
        password: this.password,
      };

      fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(datasign),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then((response) => {
          if (response.userId) {
            sessionStorage.setItem("LogOk", JSON.stringify("1"));
          }
          this.$store.commit("POST_PROFIL", response);
          window.location.href = "#/wall";
        });
    },
    //Vérification du formulaire
    validate() {
      this.$refs.form.validate();
    },
    // fonction pour changer le login en signup
    clickSignup() {
      let formSignup = document.querySelector(".backlogin");
      let formLogin = document.querySelector(".displaylogin");
      formSignup.classList.remove("displayform");
      formLogin.classList.add("displayform");
    },
    // fonction pour changer le signup en login
    clickLogin() {
      let formLogin = document.querySelector(".displaylogin");
      let formSignup = document.querySelector(".backlogin");
      formLogin.classList.remove("displayform");
      formSignup.classList.add("displayform");
    },
  },
};
</script>

<style lang="scss" scoped>
.displayform {
  display: none;
}
.logo {
  height: 150px;
}
</style>
