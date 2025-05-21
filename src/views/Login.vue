<template>
    <div class="login">
        <div class="top">
            <img src="@/assets/images/logo/logo-home-head.png" alt="">
            <span>Welcome, here to login</span>
            <div>
                <span>Questionnaire</span>
            </div>
        </div>
        <div>
            <div class="announcement">
                <img src="@/assets/images/login/warning.png">According to 《Some Act》, you need to verify your phone
                number asap.
                <!-- Beware of money transfer requirements to avoid fraud. -->
            </div>

            <div class="main">
                <div class="main2">
                    <img src="@/assets/images/login/login-muxi.png" alt="">
                    <div class="input-area fr">
                        <div class="announcement">
                            <img src="@/assets/images/login/warning.png">
                            Beware of money transfer requirements to avoid fraud.
                        </div>

                        <div class="username">
                            <label><img src="@/assets/images/login/username.png"></label>
                            <input type="text" id="input-username" placeholder="Username" v-model="user.username"
                                @keyup.enter="login">
                        </div>

                        <div class="password">
                            <label><img src="@/assets/images/login/password.png"></label>
                            <input type="password" id="input-pass" placeholder="Password" v-model="user.password"
                                @keyup.enter="login">
                        </div>

                        <div class="forgot clearfix">
                            <a href="#">Forgot password</a>
                        </div>

                        <button class="but" @click="login">
                            Login
                        </button>

                        <a href="#" class="register">Register</a>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { req } from '@/network/RequestConfig.js'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()

const user = reactive({
    username: "4@qq.com", password: "123456"
})

function login() {
    if (!(user.username && user.password)) {
        alert("username and password can't be empty")
        return
    }
    req({ url: '/user/login/', method: 'post', data: user }).then(res => {
        
        if (res.status === 200) {
        
            window.localStorage.setItem("token", res.data.token)
            window.localStorage.setItem("uname", res.data.username)
            store.commit('setIsLogin', true)
            store.commit('setUName', res.data.username)
            store.dispatch("updateCc")

            router.push("/")
        }else{
            if (res.status != 507) alert(res.data)
        }
    })
}

</script>

<style scoped lang="less">
.login {
    .top {
        width: var(--content-width);
        margin: 30px auto;

        >img {
            width: 170px;
            height: 52px;
        }

        >span {
            position: relative;
            top: 15px;
            left: 20px;
            font-size: 20px;
            color: #333;
        }

        >div {
            float: right;

            >span {
                position: relative;
                top: 50px;
                font-size: 14px;
                color: #999;
            }
        }
    }

    .main {
        background-color: #e93854;
        height: 475px;

        .main2 {
            width: var(--content-width);
            margin: 0 auto;
            // border: 1px solid black;
            height: 100%;
            position: relative;

            >img {
                height: 475px;
            }

            .input-area {
                position: absolute;
                background-color: #fff;
                top: 20px;
                right: 10%;
                z-index: 10;
                width: 350px;
                height: 400px;

                .username,
                .password {
                    border: 1px solid #bdbdbd;
                    margin: 0 auto;
                    width: 310px;
                    height: 40px;

                    label {
                        display: inline-block;
                        width: 40px;
                        background-color: #f4f4f4;
                        height: 40px;
                        line-height: 40px;
                        border-right: 1px solid #bdbdbd;
                        text-align: center;
                        margin-right: 10px;

                        img {
                            width: 20px;
                            height: 20px;
                        }
                    }
                }

                .username {
                    margin-top: 50px;
                    margin-bottom: 20px;
                }

                .forgot {
                    margin: 60px auto 0;
                    width: 310px;

                    a {
                        float: right;
                        font-size: 14px;
                        color: #999;
                    }
                }

                .but {
                    // display: block;
                    width: 310px;
                    height: 40px;
                    background-color: var(--main-red);
                    color: white;
                    font-size: 16px;
                    // margin: 0 auto;
                    margin-left: 20px;
                    margin-top: 10px;
                }

                .register {
                    float: right;
                    margin-right: 20px;
                    margin-top: 40px;
                    size: 14px;
                    color: #999;
                }

            }
        }


    }
}

.announcement {
    background-color: wheat;
    height: 40px;
    color: #999;
    line-height: 40px;
    text-align: center;

    >img {
        width: 15px;
        height: 15px;
        margin-right: 5px;
        position: relative;
        top: -2px;
    }
}
</style>