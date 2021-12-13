<template>
  <div><Navigation /><Profil /></div>
</template>
<script>
import Navigation from "../components/Navigation.vue";
import Profil from "../components/Profil.vue";

export default {
  components: {
    Profil,
    Navigation,
  },
};
</script>