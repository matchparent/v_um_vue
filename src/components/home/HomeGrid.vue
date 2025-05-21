<template>
    <div class="home-grid">
        <!-- {{ goods }} -->
        <div class="item cp" v-for="(item, index) in goods" :key="index" @click="toDetail(item.sku_id)">
            <img :src="item.image" alt="">
            <p class="dian2">{{ item.name }}</p>
            <div>
                <small>$</small>&nbsp;<span>{{ item.mk_price }}</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { req } from '@/network/RequestConfig.js'
import { watch, ref } from 'vue';
import { toDetail } from '@/router/windowOpen';

const goods = ref([])
const page = ref(1)
function onCatIdChanged() {
    req({ url: '/commodity/category/' + props.catId + '/' + page.value }).then(res => {
        // goods.value = res.data.map(obj => JSON.parse(obj));
        if (res.status == 200) {
            for (let i of res.data) {
                goods.value.push(JSON.parse(i))
            }
        }
    })
}

const props = defineProps(['catId'])
onCatIdChanged()
watch(() => props.catId, (n) => {
    goods.value = []
    page.value = 1
    onCatIdChanged()
})

window.addEventListener("scroll", () => {
    if (document.documentElement.clientHeight +
        document.documentElement.scrollTop >=
        document.body.scrollHeight) {
        page.value++
        onCatIdChanged()
    }
})
</script>
<style scoped lang="less">
.home-grid {
    width: var(--content-width);
    height: 600px;
    display: flex;
    flex-wrap: wrap;

    .item {
        width: 232px;
        height: 300px;
        background-color: #fff;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        flex-direction: column;
        margin-bottom: 10px;

        &:hover p {
            color: var(--main-red)
        }

        &:not(:nth-child(5n)) {
            margin-right: 10px;
        }

        img {
            width: 150px;
            height: 150px;
        }

        p {
            font-size: 12px;
            color: #666;
            width: 190px;
            height: 40px;
            margin-top: 10px;
            line-height: 20px;
            overflow: hidden;
        }

        div {
            width: 190px;
            color: var(--main-red);
            margin-top: 10px;

            small {
                position: relative;
                top: -2px;
            }

            span {
                font-weight: bold;
                font-size: 20px;
            }

        }


    }
}
</style>