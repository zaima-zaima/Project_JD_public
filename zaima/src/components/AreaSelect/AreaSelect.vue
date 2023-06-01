<template>
  <div class="area-select-container">
    <div class="province">
      <span>省：</span>
      <select name="province" @change="getCity" v-model="state.ProvinceCur">
        <option :value="province" v-for="province in state.province">
          {{ province.area_name }}
        </option>
      </select>
    </div>

    <div class="city" v-if="state.city && state.city.length !== 0">
      <span>市：</span>
      <select name="city" v-model="state.CityCur" @change="fetchArea">
        <option :value="city" v-for="city in state.city">
          {{ city.area_name }}
        </option>
      </select>
    </div>

    <div class="area" v-if="state.area && state.area.length !== 0">
      <span>区/县：</span>
      <select name="area" v-model="state.areaCur" @change="submitValue">
        <option :value="area" v-for="area in state.area">
          {{ area.area_name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watchEffect, reactive } from "vue";
import { getArea } from "../../api/area";
import Area from "../../types/Area";
const state = reactive({
  province: [] as Area[],
  ProvinceCur: {} as Area,
  city: [] as Area[],
  CityCur: {} as Area,
  area: [] as Area[],
  areaCur: {} as Area,
});

const emits = defineEmits(["value"]);

const init = {
  area_code: "0",
  parent_code: "0",
  area_name: "请选择",
} as Area;

watchEffect(async () => {
  state.province = (await getArea()) as unknown as Area[];
  state.province.unshift(init);
  state.city.unshift(init);
  state.area.unshift(init);
  state.ProvinceCur = state.province[0];
  state.CityCur = state.city[0];
  state.areaCur = state.area[0];
});

async function getCity() {
  state.city = (await getArea(
    state.ProvinceCur.area_code
  )) as unknown as Area[];
  state.CityCur = state.city[0];
  state.area = (await getArea(state.CityCur.area_code)) as unknown as Area[];
  state.areaCur = state.area[0];
  submitValue();
}

async function fetchArea() {
  state.area = (await getArea(state.CityCur.area_code)) as unknown as Area[];
  state.areaCur = state.area[0];
  submitValue();
}

function submitValue() {
  emits("value", {
    province: {
      name: state.ProvinceCur.area_name,
      id: state.ProvinceCur.id,
    },
    city: { name: state.CityCur.area_name, id: state.CityCur.id },
    area: {
      name: state.areaCur && state.areaCur.area_name,
      id: state.areaCur && state.areaCur.id,
    },
  });
}
</script>

<style scoped lang="less">
.area-select-container {
  display: flex;
  .city {
    margin: 0px 20px;
  }
}
</style>
