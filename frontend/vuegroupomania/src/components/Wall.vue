<template>
  <div>Bienvenue sur le mur {{ username }}</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["username"]),
  },
};
</script>