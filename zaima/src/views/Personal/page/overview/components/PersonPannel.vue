<template>
  <div class="person-pannel-container">
    <div class="user-brand">
      <div class="user-info">
        <div class="avatar">
          <div class="img">
            <Upload
              v-if="store.state.user && store.state.user.sym !== 'github'"
              :img-type="true"
              name="avatar"
              :url="`/api/uploads/avatar/${
                store.state.user && store.state.user.id
              }`"
              :types="state.uploadFileTypes"
              @upload-path="getUploadPath"
            >
              <Avatar
                :src="
                  store.state.user
                    ? store.state.user.avatar
                      ? store.state.user.avatar
                      : userDefaultAvatar
                    : userAvatar
                "
                :size="80"
              />
            </Upload>
            <Avatar
              @click="avatarClickHandler"
              v-else
              :src="
                store.state.user
                  ? store.state.user.avatar
                    ? store.state.user.avatar
                    : userDefaultAvatar
                  : userAvatar
              "
              :size="80"
            />
          </div>
          <div class="level">铜牌</div>
        </div>
        <div class="username">
          {{ store.state.user && store.state.user.username }}
        </div>
        <div class="asset">
          <span>京享值 {{ 1000 }}</span>
          <span
            >小白守约 {{ store.state.user && store.state.user.credit }} 分</span
          >
        </div>
      </div>
      <div class="vip-ad">
        <div class="tip">
          <div class="title">开通PLUS会员尊享</div>
          <div class="title-attach">全年360元运费券礼包</div>
        </div>
        <div class="btn">立即开通</div>
      </div>
    </div>
    <div class="user-asset">
      <div class="user">
        <div class="title">
          <span>我的钱包</span>
          <div class="pointer hover-base">
            <Icon :type="StyleType.view" :size="20" />
          </div>
        </div>
        <div class="assets">
          <div class="inner">
            <div class="youhuiquan">
              <div class="count">0</div>
              <span class="title">优惠券</span>
              <div class="link">领券</div>
            </div>
            <div class="jingdou">
              <div class="count">0</div>
              <span class="title">金豆</span>
              <div class="link">赚京豆</div>
            </div>
            <div class="balence">
              <div class="count">0</div>
              <span class="title">余额</span>
              <div class="link"></div>
            </div>
            <div class="baitiao">
              <div class="count">
                {{
                  store.state.user &&
                  (store.state.user.baitiao === null
                    ? "---"
                    : store.state.user.baitiao)
                }}
              </div>
              <span class="title">
                {{
                  store.state.user && store.state.user.baitiao === null
                    ? "暂未开通白条"
                    : "白条"
                }}</span
              >
              <div
                class="link"
                v-if="store.state.user && store.state.user.baitiao === null"
                @click="createBaitiao"
              >
                开通
              </div>
            </div>
            <div class="fit">
              <div class="count">0</div>
              <span class="title">小金库昨日收益</span>
              <div class="link">转入小金库，马上赚钱</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BaiTiaoCreator v-if="state.show" @close="state.show = false" />
    <Modal :show="state.githubAlternative">
      <Alert
        :alert="true"
        text="禁止操作! 因为当前登录的账户是通过github授权登录的"
        @comfirm="state.githubAlternative = false"
      />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useStore } from "vuex";
import Avatar from "../../../../../components/Avatar.vue";
import BaiTiaoCreator from "../../../../../components/BaiTiaoCreator.vue";
import Icon from "../../../../../components/Icon.vue";
import { StyleType } from "../../../../../types/enum";
import Upload from "../../../../../components/Upload.vue";
import userDefaultAvatar from "/src/assets/userDefaultAvatar.jpeg";
import userAvatar from "/src/assets/userAvatar.png";
import Modal from "../../../../../components/Modal.vue";
import Alert from "../../../../../components/Alert.vue";
const store = useStore();

const state = reactive({
  show: false,
  githubAlternative: false,
  uploadFileTypes: ["jpeg", "jpg", "gif", "png"],
});

function createBaitiao() {
  state.show = true;
}

function getUploadPath(path: string) {
  console.log(path);
}

function avatarClickHandler() {
  state.githubAlternative = true;
}
</script>

<style scoped lang="less">
.person-pannel-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  position: relative;
  align-items: center;

  .user-brand {
    width: 240px;
    height: 100%;
    background-color: @baseColor;
    position: absolute;
    transform: scale(1.1);
    background-image: url("/src/assets/userPannelBg.png");
    background-repeat: no-repeat;
    background-size: 100% 50px;
    display: flex;
    flex-direction: column;

    .user-info {
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .avatar {
        width: 100px;
        margin-top: 20px;
        flex: 1 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;

        .img {
          width: 75px;
          height: 75px;
          cursor: pointer;
        }

        .level {
          padding: 1px 5px;
          background-color: #ccc;
          border-radius: 10px;
          margin-top: -10px;
          z-index: 3;
        }
      }

      .username {
        color: #fff;
        font-weight: bolder;
        font-size: 16px;
        flex: 1 0 auto;
        width: 100%;
        text-align: center;
      }

      .asset {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: -10px;
        flex: 1 0 auto;
        box-sizing: border-box;
        padding: 0px 30px;
        align-items: center;

        span {
          padding: 3px;
          color: #fff;
          height: fit-content;
          border: 1px solid #fff;
          border-radius: 10px;
          cursor: pointer;

          &:hover {
            background-color: #fff;
            color: @baseColor;
          }
        }
      }
    }

    .vip-ad {
      width: 100%;
      height: 50px;
      background-color: rgb(20, 18, 54);
      display: flex;
      justify-content: center;
      align-items: center;

      .tip {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-right: 40px;
        color: @dgold;

        .title {
          font-weight: bold;
          font-size: 14px;
        }

        .title,
        .title-attach {
          color: inherit;
        }
      }

      .btn {
        width: 70px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        background-color: @dgold;
        color: rgb(69, 63, 63);
        border-radius: 12px;
        cursor: pointer;

        &:hover {
          background-color: #fff;
        }
      }
    }
  }

  .user-asset {
    flex: 1 1 auto;
    box-sizing: border-box;
    padding-left: 280px;
    height: 100%;

    .user {
      width: 100%;
      height: 100%;
      // background-color: aqua;
      display: flex;
      flex-direction: column;

      > .title {
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #e4e4e4;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 10px;
      }

      .assets {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 40px 10px;
        flex: 1 1 auto;
        align-items: center;

        .inner {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;

          .youhuiquan,
          .jingdou,
          .balence,
          .baitiao,
          .fit {
            height: 100px;
            display: flex;
            flex-direction: column;
            // justify-content: space-between;

            .count {
              margin-bottom: 20px;
              font-size: 20px;
              color: #000;
              font-weight: bold;
            }

            .title {
              // padding: 20px 0px;
              margin-bottom: 50px;
            }

            .link {
              color: @linkColor;
              cursor: pointer;

              &:hover {
                color: @baseColor;
              }
            }
          }
        }
      }
    }
  }
}
</style>
