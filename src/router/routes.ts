import { RouteRecordRaw } from "vue-router";
import { RouteNames } from "./const";

import Login from "@/pages/login/index.vue";
import Home from "@/pages/home/index.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: RouteNames.LOGIN,
    component: Login,
    meta: {
      isPublic: true,
      noLayout: true,
    },
  },
  {
    path: "/",
    name: RouteNames.HOME,
    component: Home,
    meta: {
      dontCheckPermission: true,
    },
  },
  {
    path: "/users",
    name: RouteNames.USERS,
    component: () => import("@/pages/user/index.vue"),
  },
  {
    path: "/roles",
    name: "Role",
    component: () => import("@/pages/role/index.vue"),
  },
  {
    path: "/permissions",
    name: "Permission",
    component: () => import("@/pages/permission/index.vue"),
  },
  {
    path: "/update_password",
    name: RouteNames.UPDATE_USER_PASSWORD,
    meta: { dontCheckPermission: true },
    component: () => import("@/pages/user/update-password.vue"),
  },
];
