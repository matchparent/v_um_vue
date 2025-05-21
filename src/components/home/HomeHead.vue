<template>
    <div class="home-head">
        <div class="content clearfix">
            <img src="@/assets/images/logo/logo-home-head.png" class="fl cp" alt="" @click="router.push('/')">
            <div class="middle fl">
                <form class="search" @submit.prevent="search">
                    <input type="text" placeholder="Search for products" v-model="kw" @keyup.enter="search"/>
                    <button type="submit">Search</button>
                </form>
                <!-- <div class="search">
                    <input type="text" placeholder="Search for products" v-model="kw" @keyup.enter="search"/>
                    <button @click="search">Search</button>
                </div> -->

                <div class="words">
                    <a v-for="(item, key) in hords" :key="key" :href="item.link">{{ item.word }}</a>
                </div>
            </div>
            <Cartbutton></Cartbutton>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import Cartbutton from '../Cartbutton.vue'

const router = useRouter()
const route = useRoute()
const kw = ref(route.params.keyword)
const hords = ref([
    { "link": "/commodities/Samsung/1", "word": "Samsung" },
    { "link": "/commodities/iPhone/1", "word": "iPhone" },
    { "link": "/commodities/Panasonic/1", "word": "Panasonic" },
    { "link": "/commodities/Philips/1", "word": "Philips" },
])

function search(){
    if(!kw.value){
        router.push("/")
    }else{
        router.push("/commodities/" + kw.value + "/1")
    }
}
</script>

<style scoped lang="less">


.home-head {
    height: 76px;
    width: var(--content-width);

    .content {
        // border: 2px solid red;
        margin: 0 auto;

        img {
            width: 170px;
            height: 52px;
        }

        .middle {
            margin-left: 60px;
        }

        .cart-button{
            float: left;
        }
    }
}

.search {
    border: 2px solid var(--main-red);
    background-color: #fff;
    border-radius: 8px;

    height: 40px;
    width: 710px;

    input {
        width: 560px;
        height: 32px;
        font-size: 14px;
        line-height: 32px;
        // margin-top: 3px;
        padding: 2px 44px 2px 19px;
    }

    button {
        width: 80px;
        height: 38px;
        background-color: var(--main-red);
        color: #fff;
        font-size: 16px;
        border-radius: 6px;
        margin-top: 1px;
        margin-left: 6px;
    }
}

.words {
    margin-top: 10px;

    a {
        color: #666;
        font-size: 14px;
        margin-left: 10px;

        &:hover {
            color: var(--main-red);
        }
    }
}
</style>