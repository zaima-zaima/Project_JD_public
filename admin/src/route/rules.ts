import { RouteRecordRaw } from "vue-router";
import OverView from "../views/Home/OverView/OverView.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import User from "../views/User/User.vue";
import Roler from "../views/Roler/index.vue";
import Admin from "../views/Admin/Admin.vue";
import Public from "../views/Goods/publish/index.vue";
import Manage from "../views/Goods/manage/index.vue";
import Edit from "../views/Goods/edit/index.vue";
import Success from "../views/registerSuccess.vue";
import LogVue from "../views/Log/Log.vue";
import Order from "../views/Order/index.vue";

import Department from "../views/Department/index.vue";
import NotFoundVue from "../views/NotFound.vue";

export default [
  {
    name: "home",
    path: "/",
    meta: { auth: true },
    component: Home,
    children: [
      { name: "Overview", path: "/", component: OverView },
      { name: "User", path: "/user", component: User },
      { name: "Roler", path: "/user/roler", component: Roler },
      { name: "Admin", path: "/user/admin", component: Admin },
      { name: "Publish", path: "/goods/publish", component: Public },
      { name: "Manage", path: "/goods/manage", component: Manage },
      { name: "Edit", path: "/goods/edit/:id", component: Edit },
      { name: "Log", path: "/log", component: LogVue },
      { name: "Order", path: "/order", component: Order },
      { name: "Department", path: "/department", component: Department },
    ],
  },
  { name: "Login", path: "/login", component: Login },
  { name: "Register", path: "/register", component: Register },
  { name: "RegisterSuccess", path: "/registerSuccess", component: Success },
  {
    path: "/:pathMatch(.*)",
    component: NotFoundVue,
    meta: { auth: false },
  },
] as RouteRecordRaw[];
