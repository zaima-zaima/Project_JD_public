<template>
  <div class="create-deliver-container">
    <table>
      <tr>
        <td>收货人</td>
        <td>
          <input type="text" v-model="state.form.name" @focus="change" />
        </td>
        (必填)
      </tr>
      <tr>
        <td>电话</td>
        <td>
          <input
            v-model="state.form.phone"
            placeholder="请输入手机号"
            @focus="change"
            @blur="checkPhone"
            @input="formatTel"
            maxlength="11"
            class="numberInput"
          />
          <span>(必填)</span>
          <span class="tip" v-if="!state.validate.phone">手机号有误</span>
        </td>
      </tr>
      <tr>
        <td>地址：</td>
        <td>
          <AreaSelect @value="selectedhandle" />
          （必填）
        </td>
      </tr>
      <tr>
        <td>详细地址</td>
        <td>
          <textarea type="text" v-model="state.form.detail" @focus="change" />
        </td>
        （必填）
      </tr>
      <tr>
        <td>设为默认</td>
        <td>
          <input
            type="checkbox"
            :checked="state.form.default"
            @change="changeStatus"
          />
        </td>
      </tr>
    </table>

    <div class="errors" v-show="state.errors">请检查信息是否正确后重试</div>

    <div class="butns">
      <div class="confirm pointer" @click="confirmHandle">
        {{ state.creating ? "请稍等..." : "确认" }}
      </div>
      <div class="cancel">
        <span class="pointer hover-base" @click="cancelHandle"> 取消</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { DeliverSelected } from "../../types/Deliver";
import AreaSelect from "../AreaSelect/AreaSelect.vue";

const state = reactive({
  form: {
    province: "",
    city: "",
    area: "",
    name: "",
    phone: "",
    detail: "",
    default: true,
  },
  validate: {
    all: false,
    phone: true,
  },
  errors: false,
  creating: false,
});

const emits = defineEmits(["confirm", "cancel"]);

function selectedhandle(value: DeliverSelected) {
  change();
  state.form.area = value.area.id;
  state.form.city = value.city.id;
  state.form.province = value.province.id;
}

function change() {
  state.errors = false;
}

function formatTel(event: any) {
  checkPhone();

  state.form.phone = state.form.phone + "";

  if (state.form.phone.length > 11) {
    state.form.phone = state.form.phone.slice(0, 11);
  }
}

function checkPhone() {
  const reg =
    /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;

  if (!reg.test(state.form.phone)) {
    state.validate.phone = false;
  } else {
    state.validate.phone = true;
  }
}

function confirmHandle() {
  if (state.creating) {
    return;
  }

  if (
    !state.form.name ||
    !state.form.phone ||
    !state.form.province ||
    !state.form.detail
  ) {
    state.errors = true;

    return;
  }
  state.creating = true;

  emits("confirm", state.form, () => {
    state.creating = false;
  });
}

function cancelHandle() {
  emits("cancel");
}

function changeStatus(event: any) {
  change();
  state.form.default = event.target.checked;
}
</script>

<style scoped lang="less">
.create-deliver-container {
  margin-top: 20px;

  table {
    width: 100%;
    tr {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      td:nth-of-type(1) {
        width: 100px;
        height: 100%;
        display: flex;
        align-items: center;
      }
      td:nth-of-type(2) {
        display: flex;
        align-items: center;
        height: 100%;
        input:not([type="checkbox"]) {
          width: 200px;
          height: 25px;
          box-sizing: border-box;
          padding: 5px;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          display: none !important;
        }
        // input[type="number"] {
        //   appearance: textfield;
        // }

        .tip {
          margin-left: 10px;
          color: red;
          font-weight: bold;
        }

        textarea {
          width: 370px;
          height: 50px;
          box-sizing: border-box;
          padding: 5px;
          resize: none;
        }
      }
    }
  }

  .butns {
    display: flex;
    margin-top: 10px;
    .confirm,
    .cancel {
      width: 80px;
      height: 30px;
      border-radius: 10px;
      text-align: center;
      line-height: 30px;
    }
    .confirm {
      background-color: @baseColor;
      color: #fff;
    }
  }
}

.errors {
  color: red;
}
</style>
