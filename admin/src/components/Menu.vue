<template>
  <div class="menu-container">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item @click="goPage('Overview')" index="1">
        <el-icon><Histogram /></el-icon>
        <span>统计</span>
      </el-menu-item>

      <el-sub-menu index="2">
        <template #title>
          <el-icon>
            <User />
          </el-icon>
          <span>用户</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item
            @click="goPage('User', { query: { page: 1, limit: 10 } })"
            index="2-1"
          >
            用户管理
          </el-menu-item>
          <el-menu-item @click="goPage('Roler')" index="2-2">角色</el-menu-item>
          <el-menu-item
            @click="goPage('Admin', { query: { page: 1, limit: 10 } })"
            index="2-3"
            >管理员</el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <span class="production-notify" v-if="state.productionNotify"></span>
          <el-icon>
            <ShoppingCartFull />
          </el-icon>
          <span>商品</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="3-1" @click="goPage('Publish')"
            >发布商品</el-menu-item
          >
          <el-menu-item
            index="3-2"
            @click="goPage('Manage', { query: { page: 1, limit: 15 } })"
            >商品管理</el-menu-item
          >

          <el-menu-item
            index="3-3"
            @click="goPage('Order', { query: { page: 1, limit: 15 } })"
            >订单
            <div>
              <span
                ><span class="order-notify" v-if="state.orderNotify"
                  >20</span
                ></span
              >
            </div></el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>

      <el-menu-item @click="goPage('Department')" index="4">
        <el-icon><icon-menu /></el-icon>
        <span>部门管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import {
  Menu as IconMenu,
  Setting,
  User,
  Histogram,
  ShoppingCartFull,
} from "@element-plus/icons-vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const state = reactive({
  productionNotify: false,
  orderNotify: false,
});

const router = useRouter();
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

function goPage(name: string, config?: object) {
  if (config) {
    router.push({
      name,
      ...config,
    });
  } else {
    router.push({
      name,
    });
  }
}
</script>

<style scoped lang="less">
.menu-container {
  width: 200px;
  height: 100%;
  overflow-y: scroll;
  background-color: #131b29;
}

.production-notify {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: red;
  margin-right: 10px;
}

.order-notify {
  padding: 1px 5px;
  border-radius: 10px;
  background-color: red;
  color: #fff;
  margin-left: 20px;
}
</style>
