<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center dense">
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0" class="displaylogin">
              <v-img src="@/assets/icon.png" alt="Jsp" target="_blank"></v-img>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Your email"
                    name="Email"
                    prepend-inner-icon="mdi-mail"
                    type="email"
                    class="rounded-0"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    name="Password"
                    prepend-inner-icon="mdi-lock"
                    type="password"
                    suffix="| Forgot?"
                    class="rounded=0"
                    outlined
                  ></v-text-field>
                  <v-btn class="rounded-0" color="#000000" x-large block dark
                    >Login</v-btn
                  >
                  <v-card-action class="text--secondary">
                    <v-spacer></v-spacer>
                    No account?
                    <a
                      href="#"
                      class="pl-2"
                      style="color: #000000"
                      @click="clicksignup"
                      >Sign Up</a
                    >
                  </v-card-action>
                </v-form>
              </v-card-text>
            </v-card>
            <v-card elevation="0" class="displayform backlogin">
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Your email"
                    name="Email"
                    prepend-inner-icon="mdi-mail"
                    type="email"
                    class="rounded-0"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    name="Password"
                    prepend-inner-icon="mdi-lock"
                    type="password"
                    class="rounded=0"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Your name"
                    name="name"
                    prepend-inner-icon="mdi-mail"
                    type="name"
                    class="rounded-0"
                    outlined
                  ></v-text-field>
                  <v-btn class="rounded-0" color="#000000" x-large block dark
                    >Sign up</v-btn
                  >
                  <v-card-action class="text--secondary">
                    <v-spacer></v-spacer>
                    <a
                      href="#"
                      class="pl-2"
                      style="color: #000000"
                      @click="clicklogin"
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
  methods: {
    clicksignup() {
      let formSignup = document.querySelector(".backlogin");
      let formLogin = document.querySelector(".displaylogin");
      formSignup.classList.remove("displayform");
      formLogin.classList.add("displayform");
    },

    clicklogin() {
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
</style>
