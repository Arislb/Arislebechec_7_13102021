<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center dense">
          <v-col cols="12" sm="8" md="4" lg="4">
            <div>Bienvenue sur le mur {{ getusername }}</div>
            <!-- Zone de texte du mur -->
            <v-textarea
              outlined
              name="input-7-4"
              label="Ecris un message"
              v-model="message"
              :rules="msgrules"
            ></v-textarea>
            <v-btn
              class="rounded-0"
              color="#000000"
              x-large
              block
              dark
              @click="fetchMessage"
              >Send</v-btn
            ><!-- Zone de texte du mur ^^-->
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      message: "",
      msgrules: [(v) => v.length <= 255 || "Max 255 caractères"],
    };
  },
  methods: {
    // Fetch permettant l'envois d'un message.
    fetchMessage() {
      const datamessage = {
        content: this.message,
      };
      fetch("http://localhost:3000/api/message", {
        method: "POST",
        body: JSON.stringify(datamessage),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.state.token,
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then((response) => {
          console.log(response);
          this.message = "";
        });
    },
  },
  computed: {
    ...mapGetters(["getusername"]),
  },
};
</script>