<template>
  <div class="history-container">
    <div class="history-box">
      <div class="history-none" v-if="state.history.length === 0">
        暂无历史记录
      </div>
      <div
        class="history-item"
        @click="onSearch(item)"
        v-for="item in state.history"
      >
        <div class="text">{{ item }}</div>
        <div class="delete hover-base" @click.stop="deleteHistory(item)">
          删除
        </div>
      </div>
      <div class="footer">
        <span
          class="hover-base pointer"
          v-if="state.history.length !== 0"
          @click="deleteAll"
          >清空历史记录</span
        >
      </div>
    </div>
    <Modal :show="state.show">
      <Alert
        :text="state.deleteTip"
        title="删除"
        @cancel="cancelHandler"
        @comfirm="remove"
      />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Modal from "../../../../components/Modal.vue";
import { getHistory } from "../../../../utils/setHistorySearch";

import Alert from "../../../../components/Alert.vue";

const state = reactive({
  show: false,
  currentKeywords: "",
  deleteTip: "",
  deleteType: "",
  history: [] as string[],
});

state.history = getHistory();

const emits = defineEmits(["onSearch", "reopen", "close", "cancelDelete"]);

function onSearch(keywords: string) {
  emits("onSearch", keywords);
}

function deleteHistory(history: string) {
  state.show = true;
  state.deleteTip = "确定要删除此搜索历史吗";
  state.currentKeywords = history;
  state.deleteType = "item";
  emits("reopen");
}

function remove() {
  if (state.deleteType === "item") {
    let history = getHistory();

    history = history.filter((ele) => ele !== state.currentKeywords);

    localStorage.setItem("history", JSON.stringify(history));

    state.history = history;

    state.show = false;
  } else {
    clear();
  }

  emits("close");
}

function deleteAll() {
  state.show = true;
  state.deleteTip = "确定要清空历史记录吗？";
  state.deleteType = "all";
  emits("reopen");
}

function clear() {
  localStorage.setItem("history", JSON.stringify([]));
  state.history = [];
  state.show = false;
  emits("close");
}

function cancelHandler() {
  state.show = false;
  emits("cancelDelete");
}
</script>

<style scoped lang="less">
.history-container {
  position: absolute;
  top: 40px;
  width: 100%;
  //   height: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-sizing: border-box;
  z-index: 2333;
  max-height: 300px;
  overflow: scroll;
  .history-box {
    width: 100%;
    .history-none {
      width: 100%;
      box-sizing: border-box;
      padding: 5px;
    }
    .history-item {
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 5px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        background-color: #ccc;
      }
    }
    .footer {
      height: 40px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>
