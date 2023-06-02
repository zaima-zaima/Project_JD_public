<template>
  <div class="publish-container">
    <Title title="修改商品" />
    <div class="steps">
      <Steps :steps="state.steps" :current="state.current" />
    </div>
    <div class="form" v-loading="state.dataLoading">
      <el-form
        :model="state.form"
        @onsumit.prevent
        label-width="120px"
        :rules="rules"
        ref="form"
        v-if="+state.current === 1"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="state.form.name" />
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="state.form.price" />
        </el-form-item>
        <el-form-item label="库存" prop="store">
          <el-input v-model="state.form.store" />
        </el-form-item>

        <el-form-item label="免运费">
          <el-switch v-model="state.form.deliver" />
        </el-form-item>
        <el-form-item label="七天无理由退货">
          <el-switch v-model="state.form.back7day" />
        </el-form-item>
        <el-form-item label="支持白条支付">
          <el-switch v-model="state.form.baitiaoPay" />
        </el-form-item>
        <el-form-item label="服务支持">
          <el-checkbox-group v-model="state.form.serviceSupport">
            <el-checkbox label="放心购" name="type" />
            <el-checkbox label="免费上门取退" name="type" />
            <el-checkbox label="急速审核" name="type" />
            <el-checkbox label="运费险" name="type" />
          </el-checkbox-group>
        </el-form-item>

        <div class="uploads">
          <el-form-item label="封面上传" prop="thumbs">
            <Uploads
              :limit="3"
              sigle="goods"
              @upload="uploadHandle"
              :data="state.form.thumbs"
              :accepts="state.accepts"
            />
          </el-form-item>
          <el-form-item label="商品描述图片" prop="desc">
            <Uploads
              :limit="8"
              sigle="production"
              @upload="uploadProduction"
              :data="state.form.desc"
              :accepts="state.accepts"
            />
          </el-form-item>
        </div>

        <div class="tag_keyword">
          <h3>标签和关键词</h3>
          <div class="tip">
            提示：提供准确的关键词和标签有助于提高用户搜索的相关性，最多可提交5个标签，20个关键词
          </div>
        </div>

        <el-form-item label="标签">
          <Tag :limit="5" :data="state.form.tags" @update="updateTags" />
        </el-form-item>

        <el-form-item label="关键词">
          <Tag
            :limit="20"
            :data="state.form.keywords"
            @update="updateKeywords"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="nextStep">下一步</el-button>
        </el-form-item>
      </el-form>

      <el-form
        :model="state.form"
        @onsumit.prevent
        label-width="120px"
        :rules="rules"
        ref="form2"
        v-if="+state.current === 2"
      >
        <el-form-item label="品牌" prop="brand">
          <el-input v-model="state.form.brand" />
        </el-form-item>
        <el-form-item label="商品编号" prop="no">
          <el-input v-model="state.form.no" />
        </el-form-item>
        <el-form-item label="重量(kg)" prop="weight">
          <el-input v-model="state.form.weight" />
        </el-form-item>

        <el-form-item label="成分" prop="ingradient">
          <el-input v-model="state.form.ingradient" />
        </el-form-item>
        <el-form-item label="适用人群" prop="approperate">
          <el-select
            v-model="state.form.approperate"
            placeholder="please select your zone"
          >
            <el-option label="通用" value="normal" />
            <el-option label="婴儿" value="baby" />
            <el-option label="儿童" value="child" />
            <el-option label="成人" value="adult" />
          </el-select>
        </el-form-item>
        <el-form-item label="国产/进口" prop="region">
          <el-select
            v-model="state.form.region"
            placeholder="please select your zone"
          >
            <el-option label="国产" value="internal" />
            <el-option label="进口" value="external" />
          </el-select>
        </el-form-item>
        <el-form-item label="规格" prop="specification">
          <el-select
            v-model="state.form.specification"
            placeholder="please select your zone"
          >
            <el-option label="张" value="zhang" />
            <el-option label="个" value="ge" />
            <el-option label="瓶" value="ping" />
            <el-option label="片" value="pian" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="state.loading" @click="submit"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <Success v-if="state.current === 3 && state.success" />
    <Failed v-if="state.current === 3 && state.failed" :error="state.error" />
  </div>
</template>

<script lang="ts" setup>
import Title from "../../../components/Title.vue";
import { reactive, watchEffect, ref } from "vue";
import Steps from "../../../components/Prograss/index.vue";
import Success from "./success.vue";
import { updateGoods, getGoodsById } from "../../../api/goods";
import { Goods } from "../../../types/Goods";
import { ErrorResponse } from "../../../types/Error";
import Failed from "./Failed.vue";
import Tag from "../../../components/Tag.vue";
import Uploads from "../../../components/Uploads/Uploads.vue";
import { useRoute } from "vue-router";
import rules from "../../../utils/validators/rulers";

const state = reactive({
  form: {
    name: "",
    price: "",
    store: "",
    deliver: false,
    back7day: false,
    baitiaoPay: false,
    serviceSupport: [],
    brand: "",
    no: "",
    weight: "",
    ingradient: "",
    approperate: "",
    region: "",
    specification: "",
    keywords: [] as string[],
    tags: [] as string[],
    thumbs: [] as string[],
    desc: [] as string[],
    jdStore: true,
    owner: "",
  } as Goods,
  steps: ["填写商品基本资料", "完善产品信息", "订单创建完毕"],
  current: 1,
  loading: false,
  success: false,
  failed: false,
  error: {} as ErrorResponse,
  accepts: ["jpeg", "png", "gif"],
  dataLoading: false,
});

const route = useRoute();

watchEffect(async () => {
  state.dataLoading = true;
  state.form = (await getGoodsById(
    route.params.id as string
  )) as unknown as Goods;
  state.dataLoading = false;
});

const form = ref();
const form2 = ref();

function nextStep() {
  form.value.validate((valid: any) => {
    if (valid) {
      state.current = 2;
    } else {
      return false;
    }
  });
}

async function submit() {
  form2.value.validate(async (valid: any) => {
    if (valid) {
      state.loading = true;
      const resp = (await updateGoods(
        route.params.id as string,
        state.form
      )) as unknown as Goods | any;
      if (!resp.code) {
        state.loading = false;
        state.success = true;
        state.current = 3;
      } else {
        state.loading = false;
        state.failed = true;
        state.current = 3;
        state.error = resp;
      }
    } else {
      return false;
    }
  });
}

function uploadProduction(fileList: string[]) {
  state.form.desc = fileList;
}

function uploadHandle(fileList: string[]) {
  state.form.thumbs = fileList;
}

function updateKeywords(keywords: string[]) {
  state.form.keywords = keywords;
}

function updateTags(tags: string[]) {
  state.form.tags = tags;
}
</script>

<style scoped lang="less">
.publish-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .steps {
    width: 500px;
    margin-top: 30px;
  }
}

.form {
  width: 700px;
  margin-top: 30px;
}

.tag_keyword {
  .tip {
    margin: 10px 0px;
  }
}
</style>
