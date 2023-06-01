<template>
  <div class="search-container">
    <div class="input-box">
      <div class="inputInner">
        <div class="input">
          <input
            type="text"
            v-model="state.keyword"
            @focus="state.historyShow = true"
            @blur="onBlur"
            @keyup.enter="goSearch"
            @input="onInput"
            ref="input"
          />
          <History
            @onSearch="onSearch"
            v-if="state.historyShow"
            @reopen="reopen"
            @close="close"
            @cancelDelete="cancelDelete"
          />
        </div>

        <div class="camera">
          <Icon :type="StyleType.camera" :size="16" />
        </div>
      </div>

      <div class="search-button" @click="goSearch">
        <Icon :type="StyleType.search" :size="20" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Icon from "../../../../components/Icon.vue";
import { StyleType } from "../../../../types/enum";
import { reactive, ref, Ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import History from "./History.vue";
import { setHistory } from "../../../../utils/setHistorySearch";
const state = reactive({
  keyword: "",
  historyShow: false,
  searchOp: false,
});

const router = useRouter();
const route = useRoute();

watchEffect(() => {
  state.keyword = route.query.keyword as string;
});

function goSearch() {
  state.historyShow = false;
  if (!state.keyword) {
    return;
  }

  setHistory(state.keyword);

  router.push({
    name: "Search",
    query: {
      keyword: state.keyword,
      page: 1,
      limit: 10,
    },
  });
}

const input = ref() as Ref<HTMLInputElement>;

function close() {
  state.searchOp = false;
}

function reopen() {
  state.searchOp = true;
  input.value.focus();
}

function onBlur() {
  setTimeout(() => {
    console.log(state.searchOp);

    if (state.searchOp) {
      return;
    }

    state.historyShow = false;
  }, 10);
}

function onSearch(keywords: string) {
  state.keyword = keywords;
  goSearch();
}

function onInput() {
  if (!state.keyword) {
    state.historyShow = true;
  }
}

function cancelDelete() {
  state.searchOp = false;
}
</script>

<style scoped lang="less">
.search-container {
  display: flex;
  height: 40px;
  margin-top: 20px;

  .input-box {
    flex: 1;
    display: flex;
    height: 100%;
    align-items: center;

    .inputInner {
      flex: 1;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      position: relative;

      .input {
        display: flex;
        height: 100%;
        flex: 1 0 auto;
        flex-direction: column;
        position: relative;
      }

      input {
        width: 100%;
      }

      .camera {
        position: absolute;
        right: 20px;
        cursor: pointer;

        &:hover {
          color: @baseColor;
        }
      }

      input {
        flex: 1;
        height: 100%;
        box-sizing: border-box;
        padding: 10px;
        border-color: @baseColor;
        outline: none;
        color: #000;
      }
    }

    .search-button {
      width: 60px;
      background-color: @baseColor;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-weight: bold;
      height: 100%;
    }
  }
}
</style>
