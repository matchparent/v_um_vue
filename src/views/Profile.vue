<template>
    <div class="profile">

        <Shortcut></Shortcut>

        <header class="clearfix">

            <img src="@/assets/images/logo/logo-home-head.png" class="fl cp" @click="router.push('/')">
            <Cartbutton></Cartbutton>
            <div class="search fr">
                <input type="text" placeholder="Start searching" v-model="kw" @keyup.enter="search" />
                <button @click="search">Search</button>
            </div>
        </header>

        <hr>

        <main>
            <aside class="fl">
                <span v-for="(item, index) in leftConfig" :key="index"
                    :class="activeIndex == item.index ? 'active-left' : false" @click="onLeftClicked(item.index)">{{
                        item.name }}</span>
            </aside>

            <article class="fr">
                <component :is="leftConfig.filter(item =>
                    item.index == activeIndex
                )[0].component"></component>
            </article>
        </main>

    </div>
</template>

<script setup>
import Shortcut from '@/components/Shortcut.vue';
import Cartbutton from '@/components/Cartbutton.vue';

import BasicInfo from '@/components/profile/BasicInfo.vue';
import AddressManagement from '@/components/profile/AddressManagement.vue';
import MyOrders from '@/components/profile/MyOrders.vue';
import SafetySettings from '@/components/profile/SafetySettings.vue';

import { markRaw, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const leftConfig = ref([
    { index: 1, name: "Basic Information", component: markRaw(BasicInfo) },
    { index: 2, name: "Address Management", component: markRaw(AddressManagement) },
    { index: 3, name: "My Orders", component: markRaw(MyOrders) },
    { index: 4, name: "Reset Password", component: markRaw(SafetySettings) },
])

const kw = ref("")
const activeIndex = ref(route.query.activeIndex || 1)

function onLeftClicked(index) {
    activeIndex.value = index
    router.push('/profile?activeIndex=' + index)
}

function search() {
    if (!kw.value) {
        router.push("/")
    } else {
        router.push("/commodities/" + kw.value + "/1")
    }
}
</script>

<style scoped lang="less">
.profile {
    header {
        width: var(--content-width);
        margin: 20px auto;

        img {
            width: 170px;
            height: 52px;
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

    >hr {
        height: 5px;
        background-color: var(--main-red);
    }

    main {
        width: var(--content-width);
        margin: 20px auto;

        aside {
            font-size: 14px;
            width: 200px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            color: #999;

            span {
                box-sizing: border-box;
                margin-top: 10px;
                cursor: pointer;
                border-bottom: 1px solid transparent;

                &:hover {
                    color: var(--main-red);
                    border-bottom: 1px solid var(--main-red);
                }
            }

            .active-left {
                color: var(--main-red);
            }
        }

        article{
            width: 1000px;
            background-color: white;
            border-radius: 10px;
        }

    }
}
</style>