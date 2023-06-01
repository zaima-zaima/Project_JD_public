<template>
  <div class="deliver-managerment-container">
    <div class="title">收货地址管理</div>
    <div class="add pointer" v-if="!state.edit" @click="openCreator">
      新建地址
    </div>
    <div class="add-title" v-else>新建地址</div>
    <div class="content" v-if="!state.edit">
      <div
        class="content-item pointer"
        @click="selected(item, index)"
        :class="{ active: state.current && state.current.id === item.id }"
        v-for="(item, index) in props.data"
      >
        <div class="info">
          <span v-if="item.default" class="default">默认</span>
          <span class="name">{{ item.name }} </span>
          <span class="phone">{{ item.phone }}</span>
          <div class="address">
            {{
              item.province.name +
              (item.city ? item.city.name : "") +
              (item.area ? item.area.name : "") +
              item.detail
            }}
          </div>
        </div>
        <div class="setDefault center">
          <span
            class="hover-base setup"
            v-if="!item.default"
            @click="setDefault(item)"
            >设为默认</span
          >
          <span
            class="delete pointer hover-base"
            @click.stop="deleteDeliverModal(item)"
            >删除</span
          >
        </div>
      </div>
    </div>
    <div class="footer" v-if="!state.edit">
      <div class="tip" v-if="state.tip">请选择一个收货地址</div>
      <div class="cancel hover-base pointer" @click="cancelHandle">取消</div>
      <div class="confirm pointer" @click="confirmHandle">确定</div>
    </div>
    <CreateDeliver
      @cancel="createCancelHandel"
      @confirm="submitDeliver"
      v-else
    />
    <Modal :show="state.deleteDeliver">
      <Alert
        text="确定要删除此条送达地址？"
        @cancel="state.deleteDeliver = false"
        @comfirm="deleteDeliver"
      />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from "vue";
import { useStore } from "vuex";
import { setDeliver } from "../../api/deliver";
import { Deliver } from "../../types/Deliver";
import CreateDeliver from "./CreateDeliver.vue";
import Modal from "../Modal.vue";
import Alert from "../Alert.vue";

interface PropsType {
  data: Deliver[];
  initDefault?: Deliver;
}

const emits = defineEmits([
  "setDefault",
  "cancel",
  "confirm",
  "submitSuccess",
  "delete",
]);

const props = defineProps<PropsType>();

const state = reactive({
  cur: 0,
  current: {} as Deliver,
  currentDelete: {} as Deliver,
  edit: false,
  deleteDeliver: false,
  tip: false,
});

const store = useStore();

watchEffect(() => {
  if (props.initDefault) {
    state.current = props.initDefault;
    return;
  }
});

function openCreator() {
  state.edit = true;
}

function selected(item: Deliver, index: number) {
  state.tip = false;
  state.cur = index;
  state.current = item;
}

async function submitDeliver(form: Deliver) {
  form.user = store.state.user.id;
  const data = await setDeliver(form);
  console.log(data);

  emits("submitSuccess", data);
  state.edit = false;
}

function setDefault(item: Deliver) {
  emits("setDefault", item);
}

function cancelHandle() {
  emits("cancel");
}

function confirmHandle() {
  if (!state.current) {
    state.tip = true;
    return;
  }
  emits("confirm", state.current);
}

function createCancelHandel() {
  console.log("dsf");
  console.log(state.current);

  state.edit = false;
}

function deleteDeliverModal(item: Deliver) {
  state.deleteDeliver = true;
  state.currentDelete = item;
}

function deleteDeliver() {
  emits("delete", state.currentDelete, () => {
    state.deleteDeliver = false;
    if (state.current && state.currentDelete.id === state.current.id) {
      state.current = {} as Deliver;
    }
  });
}
</script>

<style scoped lang="less">
.deliver-managerment-container {
  width: 1200px;
  height: 600px;
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
  position: relative;
  .title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 26px;
    font-weight: bold;
    color: #000;
  }
  .add-title {
    font-size: 20px;
    font-weight: bold;
  }
  .add {
    width: 100px;
    height: 30px;
    font-size: 15px;
    margin-top: 10px;
    border-radius: 10px;
    text-align: center;
    line-height: 30px;
    background-color: @baseColor;
    color: #fff;
  }
  .content {
    width: 100%;
    height: 400px;
    // background-color: red;
    margin-top: 10px;
    overflow-y: scroll;
    .content-item {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0px 10px;
      justify-content: space-between;
      &.active {
        background-color: rgb(239, 193, 84);

        span:not(.delete, .setup),
        .address {
          color: #000;
          font-size: 20px;
        }
      }
      .info {
        display: flex;
        // width: 100%;
        height: 100%;
        align-items: center;
        white-space: nowrap;
        max-width: 100%;
        overflow: hidden;
        .name,
        .phone {
          margin-right: 10px;
        }

        .address {
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .setDefault {
        width: 100px;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        flex-shrink: 0;
        .setup {
          margin-right: 5px;
        }
      }
      &:hover {
        &:not(.active) {
          background-color: rgb(230, 226, 226);
        }
      }
      .default {
        box-sizing: border-box;
        margin-right: 10px;
        padding: 2px 5px;
        border-radius: 5px;
        color: #fff !important;
        background-color: @baseColor;
      }
    }
  }

  .footer {
    width: 100%;
    height: 60px;
    position: absolute;
    bottom: 0;
    display: flex;
    left: 0;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    padding: 10px;

    .tip {
      color: @baseColor;
    }

    .cancel,
    .confirm {
      width: 70px;
      height: 30px;
      text-align: center;
      line-height: 30px;
    }
    .confirm {
      background-color: @baseColor;
      color: #fff;
    }
  }
}
</style>
