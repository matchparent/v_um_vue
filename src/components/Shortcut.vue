<template>
    <div class="shortcut">
        <div class="content">
            <a href="/login" @click="first">{{ $store.state.user.isLogin ? $store.state.user.name : 'Login' }}</a>
            <a href="#" @click="second">{{ $store.state.user.isLogin ? 'Logout' : "Register" }}
            </a>
            <a class="cn">|</a>
            <a href="/profile?activeIndex=3">Orders</a>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()
function first(e){
    if (store.state.user.isLogin) {
        e.preventDefault()    
        router.push("/profile")
    }
}

function second(e) {
    e.preventDefault()
    if (store.state.user.isLogin) {
        // logout
        window.localStorage.setItem("token", "")
        window.localStorage.setItem("uname", "")
        store.commit('setIsLogin', false)
        store.commit('setUName', "")
        router.push("/")
    } else {
        // register
        alert('register')
    }
}
</script>

<style lang="less" scoped>
.shortcut {
    background-color: white;
    height: 36px;

    .content {
        width: var(--content-width);
        margin: 0 auto;
        height: 100%;
        text-align: right;
        line-height: 36px;
        user-select: none;

        a {
            margin-left: 10px;
            color: #505259;

            &:hover {
                color: var(--font-red);
            }
        }


    }
}
</style>