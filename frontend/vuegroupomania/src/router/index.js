import Vue from "vue";
import VueRouter from "vue-router";
import Accueil from "../views/Accueil.vue";
import Wall from "../views/Wall.vue";
import Profil from "../views/Profil.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Accueil",
    component: Accueil,
  },

  {
    path: "/Wall",
    name: "Wall",
    component: Wall,
    beforeEnter(to, from, next) {
      if (sessionStorage.getItem("LogOk")) {
        next();
      } else {
        next({ name: "Accueil" });
      }
    },
  },
  {
    path: "/Profil",
    name: "Profil",
    component: Profil,
    beforeEnter(to, from, next) {
      if (sessionStorage.getItem("LogOk")) {
        next();
      } else {
        next({ name: "Accueil" });
      }
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
