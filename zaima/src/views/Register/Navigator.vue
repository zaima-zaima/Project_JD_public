<template>
    <div class="navigator-container">
        <div class="brand">
            <div class="logo">
                <img src="../../assets/logo.png" alt="">
            </div>
            <div class="register_text">欢迎注册</div>
        </div>
        <div class="login">
            <span>已有账号？</span>
            <span class="goLogin" @click="goLogin">请登录&gt;</span>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goLogin() {
    router.push({
        name: "Login"
    })
}

</script>


<style scoped lang="less">
.navigator-container {
    width: 1200px;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .brand {
        width: 300px;
        height: 100%;
        // background-color: aqua;
        display: flex;
        align-items: center;

        .logo {
            width: 160px;
            height: 100%;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .register_text {
            margin-left: 10px;
            font-size: 20px;
        }
    }

    .login {
        span {
            font-size: 16px;

            &.goLogin {
                color: @baseColor;
                cursor: pointer;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>