<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4" lg="4">
            <div>Bienvenue sur le mur {{ getusername }}</div>
            <!-- Zone de texte du mur -->
            <v-textarea
              outlined
              name="input-7-4"
              label="Ecris un message"
              v-model="areamessage"
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
            <v-container>
              <v-card
                elevation="4"
                shaped
                class="container-messages"
                v-for="message in messages"
                :key="message.id"
              >
                <v-card-title class="message-text">{{
                  message.User.username
                }}</v-card-title>
                <v-card-text v-show="!message.hidden"
                  ><p class="message-text">
                    {{ message.content }}
                  </p></v-card-text
                >
                <!-- carte caché début -->
                <v-card v-show="message.hidden">
                  <v-textarea v-model="message.content"> </v-textarea>
                </v-card>
                <!-- carte caché Fin -->
                <v-card-actions>
                  <v-btn
                    color="primary"
                    @click="message.hidden = message.hidden ? false : true"
                    >{{ message.hidden ? "cacher" : "modifier" }}</v-btn
                  >
                  <v-btn v-show="message.hidden" @click="fetchModify(message)">
                    Envoyer
                  </v-btn>
                  <v-btn v-show="message.hidden" @click="fetchDelete(message)">
                    Supprimer
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-container>
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
      areamessage: "",
      messages: [],
      msgrules: [(v) => v.length <= 255 || "Max 255 caractères"],
    };
  },
  methods: {
    //Modifier les bulles de message via le bouton

    // Fetch permettant de recuperer tt les messages
    fetchAllMessages() {
      fetch("http://localhost:3000/api/message", {
        method: "GET",
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
          //change une liste avec un nouvelle element aka Message => Message.hidden
          response = response.map((item) => {
            item.hidden = false;
            return item;
          });
          this.messages = response;
        });
    },

    // Fetch permettant l'envois d'un message.
    fetchMessage() {
      const datamessage = {
        content: this.areamessage,
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
          //Permet de rendre le text-area vide.
          this.areamessage = "";
        });
    },
    //fetch permettant la modification d'un message.
    fetchModify(message) {
      console.log(message);
      console.log(JSON.stringify(message.content));

      fetch("http://localhost:3000/api/message/" + message.id, {
        method: "PUT",
        body: JSON.stringify({ content: message.content }),
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
        });
    },
    //fetch permettant de supprimer son message.
    fetchDelete(message) {
      fetch("http://localhost:3000/api/message/" + message.id, {
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
          this.messages = this.messages.filter((item) => item != message);
        });
    },

    fetchGetUser() {
      fetch("http://localhost:3000/api/auth", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.state.token,
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then((response) => {
          this.$store.commit("POST_PROFIL", response);
          console.log(response);
        });
    },
  },
  computed: {
    ...mapGetters(["getusername"]),
  },
  mounted: function () {
    this.fetchAllMessages();
    this.fetchGetUser();
  },
};
</script>

<style lang="scss" scoped>
.container-messages {
  background-color: rgb(78, 72, 72);
  border: rgb(46, 45, 45) solid 4px;
  margin-bottom: 0.4vw;
  margin-top: 0.4vw;
}
.message-text {
  color: rgb(250, 249, 249);
}
</style>
