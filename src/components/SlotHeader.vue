<template>
    <header class="clearfix">
        <img src="@/assets/images/logo/logo-home-head.png" class="fl cp" @click="router.push('/')">
        <div class="slot">
            <slot></slot>
        </div>
        <Cartbutton></Cartbutton>
        <div class="search fr">
            <input type="text" placeholder="Start searching" v-model="kw" @keyup.enter="search" />
            <button @click="search">Search</button>
        </div>
    </header>
</template>

<script setup>
import Cartbutton from './Cartbutton.vue';
const kw = ref("")

function search() {
    if (!kw.value) {
        router.push("/")
    } else {
        router.push("/commodities/" + kw.value + "/1")
    }
}

</script>

<style scoped lang="less">
header {
    width: var(--content-width);
    margin: 20px auto;

    img {
        width: 170px;
        height: 52px;
    }

    .slot{
        float: left;
        margin-top: 30px;
        margin-left: 20px;
        font-size: 18px;
        color: #333;
    }

    .cart-button {
        float: right;
        margin-top: 5px;
        height: 40px;
        width: 200px;
    }

    .search {
        border: 2px solid var(--main-red);
        background-color: #fff;
        border-radius: 8px;
        margin-top: 5px;
        height: 40px;
        width: 210px;

        input {
            width: 120px;
            height: 32px;
            font-size: 14px;
            line-height: 32px;
            // margin-top: 3px;
            padding: 2px 4px 2px 19px;
        }

        button {
            width: 60px;
            height: 38px;
            background-color: var(--main-red);
            color: #fff;
            font-size: 14px;
            border-radius: 6px;
            margin-top: 1px;
            margin-left: 6px;
        }
    }
}
</style>