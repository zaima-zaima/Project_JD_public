<template>
  <div class="navigator-container">
    <div class="navigator-bar">
      <div class="left hover-base">
        <div class="icon">
          <Icon :type="StyleType.local" />
        </div>
        <div class="locate">广东</div>
      </div>
      <div class="right">
        <div class="navigator-item" v-if="!store.state.user">
          <router-link
            :to="{
              name: 'Login',
              query: {
                sign: configure.user,
              },
            }"
          >
            <span class="hover-base"> 你好，请登录 </span>
          </router-link>
        </div>

        <div class="navigator-item hover-base" v-if="!store.state.user">
          <router-link
            class="sideLine"
            :to="{
              name: 'Register',
              query: {
                step: 1,
                type: 'personal',
                sign: configure.user,
              },
            }"
          >
            <span class="base"> 免费注册 </span>
          </router-link>
        </div>

        <div
          class="navigator-item hover-base f user-box underWhite"
          v-if="store.state.user"
        >
          <div class="user">
            <div class="username">{{ store.state.user.username }}</div>
            <span
              class="plus-sign"
              :style="{
                backgroundColor:
                  store.state.user.vip === false
                    ? 'rgb(202, 187, 103)'
                    : 'rgb(202, 187, 103)',
              }"
              >PLUS</span
            >
            <div class="icon">
              <Icon :type="StyleType.arrowUp" />
            </div>
          </div>
          <div class="model">
            <UserModel />
          </div>
        </div>

        <div class="navigator-item hover-base">
          <div>
            <router-link
              :to="{
                name: 'OrderList',
                query: { status: 'all', page: 1, limit: 10 },
              }"
            >
              <span class="hover-base"> 我的订单 </span>
            </router-link>
          </div>
        </div>

        <div class="navigator-item hover-base user-box underWhite">
          <a>
            <span class="hover-base title-normal"> 我的京东 </span>
          </a>
          <div class="model">
            <MyJDModel />
          </div>
        </div>

        <div class="navigator-item hover-base user-box underWhite">
          <router-link :to="{ path: '/' }">
            <span class="base title-normal"> 企业采购 </span>
          </router-link>
          <div class="model">
            <EnterpriseCollection />
          </div>
        </div>
        <div class="navigator-item hover-base user-box underWhite">
          <router-link :to="{ path: '/' }">
            <span class="hover-base title-normal"> 商家服务 </span>
          </router-link>
          <div class="model">
            <BussinsService />
          </div>
        </div>
        <div class="navigator-item navigator hover-base user-box underWhite">
          <router-link :to="{ path: '/' }">
            <span class="hover-base title-normal"> 网站导航 </span>
          </router-link>
          <div class="model">
            <WebSiteRouter />
          </div>
        </div>
        <div class="navigator-item hover-base">
          <router-link :to="{ path: '/' }">
            <span class="hover-base"> 手机京东 </span>
          </router-link>
        </div>
        <div class="navigator-item hover-base">
          <router-link :to="{ path: '/' }">
            <span class="hover-base"> 网站无障碍 </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Icon from "./Icon.vue";
import { StyleType } from "../types/enum";
import { useStore } from "vuex";
import UserModel from "./UserModel.vue";
import MyJDModel from "./MyJDModel.vue";
import EnterpriseCollection from "./EnterpriseCollection.vue";
import BussinsService from "./BussinsService.vue";
import WebSiteRouter from "./WebSiteRouter.vue";
import configure from "../../../server/configure/roler";

const store = useStore();
</script>

<style scoped lang="less">
.navigator-container {
  width: 100%;
  height: 30px;
  background-color: #eceaea;
  display: flex;
  justify-content: center;
  color: #999;

  .navigator-bar {
    width: 1200px;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .left {
      width: 50px;
      height: 100%;
      // background-color: #fc4;
      display: flex;
      align-items: center;
      cursor: pointer;

      .icon {
        margin-right: 10px;
        color: inherit;
      }

      .locate {
        color: inherit;
      }
    }

    .right {
      width: 60%;
      height: 100%;
      // background-color: #ff0;
      display: flex;
      align-items: center;

      .navigator-item {
        flex: 1;
        flex-shrink: 0;
        box-sizing: border-box;
        text-align: center;

        &.navigator {
          .model {
            margin-left: -1000px;
          }
        }

        .title-normal {
          display: flex;
          height: 100%;
          align-items: center;
          justify-content: center;
        }

        &.user-box {
          height: 100%;
          position: relative;

          &.f {
            flex: 0 0 150px;
          }

          &:hover {
            background-color: #fff;
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
            box-sizing: border-box;

            .model {
              display: block;
            }
          }

          .user {
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: flex-end;
            height: 100%;
            .icon {
              margin-right: 5px;
            }

            .plus-sign {
              padding: 3px 5px;
              border-radius: 5px;
              color: #fff;
              margin: 0px 10px;
            }
          }

          .model {
            display: none;
            box-sizing: border-box;
            background-color: #fff;
            box-shadow: 0px 5px 5px #ccc;
            z-index: 3;
            position: absolute;
          }
        }

        .sideLine {
          padding: 0 3px;
        }
      }
    }
  }
}
</style>
