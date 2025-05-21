<template>
    <div class="home-sub-menu pr">
        <div class="top">
            <a href="#" v-for="(item, index) in channel" :key="index">{{ item.sub_menu_name }}</a>
        </div>
        <!-- ==={{ channel }} -->
        <div class="main">
            <div v-for="(item, index) in dt" :key="index">
                <a href="#" class="head">{{ item.sub_menu_name }} </a>

                <img src="@/assets/images/menu/arrows-black.png" />

                <div style="display: flex;flex-wrap: wrap;">
                    <a v-for="d in dd.filter(e => e.sub_menu_id === item.sub_menu_id)" :key="d.sub_menu_id" :href='"/commodities/" + d.sub_menu_name + "/1"'
                        class="tail">
                        {{ d.sub_menu_name }}
                    </a>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup>
import { req } from '@/network/RequestConfig.js'
import { watch,ref } from 'vue'
const props = defineProps(['subMenuId'])
let channel = ref([]);
let dt = ref([]);
let dd = ref([]);

function onSMidChanged(id) {
    req({ url: '/sub_menu?main_menu_id=' + id }).then(res => {
        channel.value = []
        dt.value = []
        dd.value = []

        if (res.status == 200) {

            for (const obj of res.data) {
                const jo = JSON.parse(obj)
                if (jo.sub_menu_type == "channel") {
                    channel.value.push(jo)
                } else if (jo.sub_menu_type == "dt") {
                    dt.value.push(jo)
                } else {
                    dd.value.push(jo)
                }
            }
        }

    })
}

watch(() => props.subMenuId, (n) => {
    onSMidChanged(n)
})





</script>
<style lang="less" scoped>
.home-sub-menu {
    padding: 20px;
    height: 100%;
}

.top {
    a {
        background-color: #f5f6fa;
        padding: 7px 12px;
        color: #1a1a1a;
        font-size: 12px;
        font-weight: 600;
        margin-right: 12px;

        &:hover {
            color: var(--main-red);
        }
    }
}

.main {
    position: absolute;
    top: 70px;

    >div {
        min-height: 22px;
        display: flex;
    }

    .head {
        flex-shrink:0;
        box-sizing: border-box;
        width: 45px;
        font-weight: 600;
        white-space: nowrap;
        margin-right: 10px;
    }

    img {
        width: 15px;
        height: 15px;
        margin-right: 10px;
    }

    .tail {
        height: 16px;
        line-height: 16px;
        padding: 0 5px;

        &:hover {
            color: var(--main-red)
        }
    }
}
</style>