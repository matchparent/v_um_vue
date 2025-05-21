<template>
    <div class="home-flash">
        <img src="@/assets/images/find-goods.png" alt="">

        <vue3ScrollSeamless class="scroll-wrap" :classOptions="classOptions" :dataList="flashData" v-if="flashData.length > 0">
            <!-- <img src="@/assets/images/banner/banner1.png" alt=""> -->
            <div class="banner_div">
                <div v-for="(item, i) of flashData" :key="i" @click="toDetail(item.sku_id)">
                    <div :class="i % 2 === 0 ? 'top' : 'bottom'">
                        <span class="dian2">{{ item.name }}</span>
                    </div>
                    <img :src="item.image">
                </div>
            </div>
        </vue3ScrollSeamless>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { req } from '@/network/RequestConfig.js'
import { toDetail } from '@/router/windowOpen';

const classOptions = reactive({
    limitMoveNum: 6,
    direction: 2,
    hoverStop: true,
    singleLine:true,//???
    step: 0.5,
})

const flashData = ref([])

// onMounted(() => {
    req({ url: '/commodity/flash' }).then(res => {
        if (res.status == 200) {
            flashData.value = res.data
        }
    })
// })


</script>

<style scoped lang="less">
.home-flash {
    background-color: #fff;
    display: flex;
    width: var(--content-width);
    border-radius: 1em;
    overflow: hidden;
    height: 260px;

    >img {
        width: 190px;
    }

    .scroll-wrap {
        height: 260px;
        width: 1010px;
        overflow: hidden;

        .banner_div {
            height: 100%;
            display: flex;
            

            >div {
                position: relative;
                width: 260px;
                height: 260px;
                cursor: pointer;

                img {
                    height: 260px;
                }

                >div {
                    padding: 10px;
                    background-color: rgba(0, 0, 0, 0.7);
                    position: absolute;

                    span {
                        width: 100%;
                        z-index: 100;
                        color: white;
                    }
                }

            }
        }
    }
}


.bottom {
    bottom: 0;
}

.top {
    top: 0;
}
</style>