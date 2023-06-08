import { RouteRecordRaw } from "vue-router";
import Home from "../views/Home/index.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register/Register.vue";
import Personal from "../views/Personal/Index.vue";
import HomeView from "../views/Home/components/HomeView.vue";
import OverView from "../views/Personal/page/overview/OverView.vue";
import Search from "../views/Search/index.vue";
import GoodsDetail from "../views/Goods/Detail.vue";
import Profile from "../views/Goods/views/Profile.vue";
import PackAndPrice from "../views/Goods/views/PackAndprice.vue";
import Comment from "../views/Goods/views/Comment/Comment.vue";
import AfterSale from "../views/Goods/views/AfterSales.vue";
import Discussion from "../views/Goods/views/Discussion.vue";
import Cart from "../views/Cart/index.vue";
import CashDesk from "../views/CashingDesk/index.vue";
import OrderDetail from "../views/Order/OrderDetail.vue";
import OrderList from "../views/Personal/page/orderList/OrderList.vue";
import NotFoundVue from "../views/NotFound.vue";
import GithubJumping from "../views/LoginByGithubJumping.vue";
import GOChrome from "../views/goChrome.vue";

export default [
  {
    name: "Home",
    path: "/",
    component: Home,
    children: [
      {
        name: "HomeView",
        path: "/",
        component: HomeView,
        meta: { auth: false },
      },
      {
        name: "Personal",
        path: "/home/:uid",
        component: Personal,
        meta: { auth: true },
        children: [
          {
            name: "OverView",
            path: "/home/OverView/:uid",
            meta: { auth: true },
            component: OverView,
          },
          {
            name: "OrderList",
            path: "/home/orderList",
            component: OrderList,
            meta: { auth: true },
          },
          {
            name: "OrderDetail",
            path: "/orderDetail",
            meta: { auth: true },
            component: OrderDetail,
          },
        ],
      },
      {
        name: "Search",
        path: "/search",
        meta: { auth: false },
        component: Search,
      },
      {
        name: "GoodsDetail",
        path: "/goods/detail/:id",

        component: GoodsDetail,
        children: [
          {
            name: "Profile",
            path: "/godds/detail/profile/:id",
            component: Profile,
          },
          {
            name: "PackAndPrice",
            path: "/goods/detail/packandprice/:id",
            component: PackAndPrice,
          },
          {
            name: "Comment",
            path: "/goods/detail/comments/:id",
            component: Comment,
          },
          {
            name: "AfterSale",
            path: "/goods/detail/aftersale/:id",
            component: AfterSale,
          },
          {
            name: "Discussion",
            path: "/goods/detail/Discussion/:id",
            component: Discussion,
          },
        ],
      },
      {
        name: "Cart",
        path: "/cart",
        component: Cart,
        meta: { auth: true },
      },
      {
        name: "CashDesk",
        path: "/cashDesk",
        component: CashDesk,
        meta: { auth: true },
      },
    ],
  },
  { name: "Login", path: "/login", component: Login, meta: { auth: false } },
  {
    path: "/cb/github",
    component: GithubJumping,
    meta: { auth: false },
  },
  {
    name: "Register",
    meta: { auth: false },
    path: "/register",
    component: Register,
  },
  {
    path: "/:pathMatch(.*)",
    component: NotFoundVue,
    meta: { auth: false },
  },
  {
    name: "goChrome",
    path: "/goChrome",
    component: GOChrome,
    meta: { auth: false },
  },
] as RouteRecordRaw[];
