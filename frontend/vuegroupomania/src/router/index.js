import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Accueil from "../views/Accueil.vue";
import Wall from "../views/Wall.vue";
import Profil from "../views/Profil.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/accueil",
    name: "Home",
    component: Home,
  },

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

  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
