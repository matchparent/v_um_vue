<template>
    <div class="home-mid-left">
        <div @mouseleave="showSub = false">
            <ul>
                <li v-for="(item, index) in dealtedMenuData" :key="index"
                    @mouseenter="subMenuId = item.id; showSub = true;">
                    <span v-for="(item2, index2) in item.data" :key="index2">
                        <a :href='"/commodities/" + item2.name + "/1"'>{{ item2.name }}</a>
                        <span v-if="item.data.length - index2 - 1"> / </span>
                    </span>
                </li>
            </ul>

            <div class="sub-menu" v-show="showSub">
                <HomeSubMenu :subMenuId="subMenuId"></HomeSubMenu>
            </div>
        </div>
    </div>
</template>
<script setup>

import { req } from '@/network/RequestConfig.js'
import { computed, onMounted, ref } from 'vue'
import HomeSubMenu from '@/components/home/HomeSubMenu.vue'

let menuData = ref([])

onMounted(() => {
    req({ url: '/main_menu' }).then(res => {
        for (let i in res.data) {
            menuData.value.push(JSON.parse(res.data[i]))
        }
    })
})

const dealtedMenuData = computed(() => {
    let list = []
    let item = { "id": "", "data": [] }
    for (let i of menuData.value) {
        let id = i.main_menu_id
        let name = i.main_menu_name
        let obj = { "name": name }
        if (id == item.id) {
            item.data.push(obj)
        } else {
            item = { "id": "", "data": [] }
            item.id = id
            item.data.push(obj)
            list.push(item)
        }
    }
    return list
})

let showSub = ref(false)
let subMenuId = ref(0)

</script>
<style lang="less" scoped>
.home-mid-left {
    box-sizing: border-box;
    position: relative;
    width: 230px;
    height: 100%;
    border-radius: 1em;
    background-color: white;
    padding: 20px 0;

    ul {
        li {
            padding: 2px 0 2px 20px;
            cursor: pointer;

            &:hover {
                background-color: #d9d9d9;
            }

            a {
                color: #1a1a1a;
                font-size: 12px;
                font-weight: 400;

                &:hover {
                    color: var(--main-red);
                }
            }
        }
    }

    .sub-menu {
        position: absolute;
        z-index: 500;
        top: 0;
        left: 100%;
        width: 800px;
        height: 100%;
        background-color: white;
        border-radius: 1em;
        border: 1px solid var(--main-red);
    }
}
</style>