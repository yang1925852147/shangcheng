import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Public from "../views/public/Public.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    component: Public,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/Classification",
        name: "Classification",
        component: () =>
          import("../components/classification/Classification.vue"),
      },
      {
        path: "/Shopping",
        name: "Shopping",
        component: () => import("../components/Shopping/Shopping.vue"),
      },
      {
        path: "/My",
        name: "My",
        component: () => import("../components/My/My.vue"),
      },
    ],
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
  {
    path: "/Lend",
    name: "Lend",
    component: () => import("../components/Lend/Lend.vue"),
  },
  {
    path: "/Details",
    name: "Details",
    component: () => import("../components/Details/Details.vue"),
  },
  {
    path: "/Settlement",
    name: "Settlement",
    component: () => import("../components/Settlement/Settlement.vue"),
  },
  {
    path: "/Personal",
    name: "Personal",
    component: () => import("../components/Personal/Personal.vue"),
  },
  {
    path: "/Address",
    name: "Address",
    component: () => import("../components/address/Address.vue"),
  },
  {
    path: "/Add",
    name: "Add",
    component: () => import("../components/address/Add.vue"),
  },
  {
    path: "/Collection",
    name: "Collection",
    component: () => import("../components/My/Collection/Collection.vue"),
  },
  {
    path: "/Browse",
    name: "Browse",
    component: () => import("../components/My/Browse/Browse.vue"),
  },
  {
    path: "/Order",
    name: "Order",
    component: () => import("../components/My/Order/Order.vue"),
  },
  {
    path: "/Evaluate",
    name: "Evaluate",
    component: () => import("../components/My/Evaluate/Evaluate.vue"),
  },
  {
    path: "/Comment",
    name: "Comment",
    component: () => import("../components/My/Evaluate/Comment/Comment.vue"),
  },
  {
    path: "/Position",
    name: "Position",
    component: () => import("../components/Position/Position.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
