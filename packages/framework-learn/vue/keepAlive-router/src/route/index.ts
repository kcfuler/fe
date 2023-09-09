import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/aa",
    name: "a",
    component: () => import("../pages/A/index.vue"),
  },
  {
    path: "/bb",
    name: "b",
    component: () => import("../pages/B/index.vue"),
  },
  {
    path: "/cc",
    name: "c",
    component: () => import("../pages/C/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
