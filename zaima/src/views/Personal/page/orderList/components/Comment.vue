<template>
  <div class="comment-container">
    <div class="title">
      <div class="header">
        <span>感谢评论!</span>
        <div class="close pointer" @click="closeModel">
          <Icon :type="StyleType.close" :size="30" />
        </div>
      </div>
      <div class="tip">真实的评论可以有效的帮助其他买家哦！</div>
    </div>
    <div class="goods">
      <div class="thumb"><img :src="props.order.goods.thumbs[0]" alt="" /></div>
      <div class="goods-content">
        <div class="name">{{ props.order.goods.name }}</div>
        <div class="order-createdAt">
          订单创建日期 {{ formatDate(props.order.createdAt, false, "-", true) }}
        </div>
      </div>
    </div>
    <div class="comment-content">
      <div class="star">
        满意度： <StarGroup :count="5" @star-recive="getStar" />
        <span class="base" v-if="state.errors.star.show">请选择星级</span>
      </div>
      <div class="upload">
        <div class="upload-area">
          <div class="title">上传附件(最多{{ state.uploadLimit }}张)</div>
          <div class="upload-button">
            <Upload
              name="comments"
              url="/api/uploads/comments"
              @upload-path="getFilePath"
              :limit="state.uploadLimit"
              :current-count="state.currentCount"
              :types="['jpeg', 'jpg', 'png', 'gif']"
            />
          </div>
          <div class="upload-show">
            <div class="img-item" v-for="(item, index) in state.form.thumbs">
              <img :src="item" alt="" />
              <div class="close" @click="onDelete(index)">x</div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-area">
        <textarea
          v-model="state.form.content"
          @input="
            state.errors.content.show = false;
            state.errors.content.msg = '';
          "
        ></textarea>
        <span class="base" v-if="state.errors.content.show"
          >请输入评论内容</span
        >
      </div>
      <div class="submit" @click="submit">
        {{ state.submiting ? "提交中...." : "提交" }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Order } from "../../../../../types/order";
import formatDate from "../../../../../utils/formatDate";
import StarGroup from "../../../../../components/StarGroup.vue";
import Upload from "../../../../../components/Upload.vue";
import { reactive } from "vue";
import Icon from "../../../../../components/Icon.vue";
import { StyleType } from "../../../../../types/enum";

interface PropsType {
  order: Order;
}

const emits = defineEmits(["close", "submit"]);
const props = defineProps<PropsType>();

const state = reactive({
  form: {
    star: 0,
    thumbs: [] as string[],
    content: "",
    goodsid: "",
    oid: "",
  },
  errors: {
    star: {
      show: false,
      msg: "",
    },
    content: {
      show: false,
      msg: "",
    },
  },
  uploadLimit: 3,
  currentCount: 0,
  submiting: false,
});

function getFilePath(path: string) {
  state.form.thumbs.push(path);
}

function getStar(star: number) {
  state.form.star = star;
  state.errors.star.show = false;
  state.errors.star.msg = "";
}

function closeModel() {
  emits("close");
}

function submit() {
  if (state.submiting) {
    return;
  }

  if (state.form.star < 1 || !state.form.content) {
    if (state.form.star < 1) {
      state.errors.star.show = true;
      state.errors.star.msg = "请选择星级";
    } else {
      state.errors.star.show = false;
    }

    if (!state.form.content) {
      state.errors.content.show = true;
      state.errors.content.msg = "请填写评论内容";
    } else {
      state.errors.content.show = false;
    }

    return;
  }

  state.form.goodsid = props.order.goods.id as string;
  state.form.oid = props.order.id as string;
  emits(
    "submit",
    state.form,
    () => {
      state.submiting = true;
    },
    () => {
      state.submiting = false;
    }
  );
}

function onDelete(index: number) {
  state.form.thumbs = state.form.thumbs.filter(
    (ele) => ele !== state.form.thumbs[index]
  );

  state.currentCount = state.form.thumbs.length;
}
</script>

<style scoped lang="less">
.comment-container {
  width: 900px;
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  > .title {
    width: 100%;
    // height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .header {
      font-size: 30px;
      display: flex;
      width: 100%;
      justify-content: center;
      position: relative;
      span {
        font-size: inherit;
      }
      .close {
        position: absolute;
        right: 0px;
      }
    }
  }
  .goods {
    width: 100%;
    height: 100px;
    align-items: center;
    display: flex;
    margin-top: 30px;
    .thumb {
      width: 80px;
      height: 60px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .goods-content {
      margin-left: 10px;
      .order-createdAt {
        margin-top: 20px;
      }
    }
  }

  .comment-content {
    width: 100%;
    .star {
      display: flex;
      align-items: center;
    }
    .upload {
      width: 100%;

      .upload-area {
        height: 130px;
        display: flex;
        align-items: center;
        .upload-button {
          width: 100px;
          height: 100px;
          flex-shrink: 0;
          margin: 0px 20px;
        }
        .upload-show {
          flex: 1;
          box-sizing: border-box;
          padding: 10px;
          height: 100%;
          display: flex;
          align-items: center;
          .img-item {
            width: 80px;
            height: 60px;
            margin: 0px 10px;
            position: relative;
            .close {
              position: absolute;
              top: -10px;
              left: 75px;
              width: 10px;
              height: 10px;

              text-align: center;
              line-height: 10px;
              border-radius: 50%;

              &:hover {
                background-color: @baseColor;
                color: #fff;
                cursor: pointer;
              }
            }
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .text-area {
      width: 600px;
      textarea {
        width: 100%;
        min-height: 200px;
        box-sizing: border-box;
        padding: 10px;
        outline: none;
        resize: none;
      }
    }
    .submit {
      width: 50px;
      height: 25px;
      background-color: @baseColor;
      text-align: center;
      line-height: 25px;
      color: #fff;
      cursor: pointer;
      margin-top: 10px;
    }
  }
}
</style>
