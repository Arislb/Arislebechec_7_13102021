<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center dense">
          <v-col cols="12" sm="8" md="4" lg="4">
            <div>Bienvenue sur le mur {{ username }}</div>
            <v-textarea
              outlined
              name="input-7-4"
              label="Ecris un message"
              value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["username"]),
  },
};
</script>