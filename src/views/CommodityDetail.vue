<template>
    <div class="commodity-detail">
        <Shortcut></Shortcut>
        <HomeHead></HomeHead>

        <div class="detail clearfix">
            <img :src="detailData.image" class="fl">
            <div class="fl desc">
                <p class="detail-name">{{ detailData.name }}</p>
                <div class="detail-price">
                    <small>$</small> <span>{{ detailData.p_price }}</span>
                </div>

                <div class="buy-num">
                    <el-input-number v-model="num" :min="1" :max="10" @change="handleChange" size="large" />
                </div>

                <div class="add-cart cp" @click="addCart(route.params.cid, num)">add to cart</div>
            </div>
        </div>

        <Comments v-if="commentCount >= 0" :count="commentCount"></Comments>

    </div>
</template>

<script setup>
import { req } from '@/network/RequestConfig.js'
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { addCart } from '@/router/windowOpen.js'
const Shortcut = defineAsyncComponent(() => import('@/components/Shortcut.vue'))
const HomeHead = defineAsyncComponent(() => import('@/components/home/HomeHead.vue'))
const Comments = defineAsyncComponent(() => import('@/components/commodity_detail/Comments.vue'))

const detailData = ref("")

const commentCount = ref(-1)

const route = useRoute()
onMounted(() => {
    req({ url: '/commodity/' + route.params.cid }).then(res => {

        if (res.status == 200) {
            detailData.value = res.data.list
            commentCount.value = res.data.comment_count
        }
    })
})

const num = ref(1)
const handleChange = (value) => {
}
</script>

<style scoped lang="less">
.commodity-detail {
    .home-head {
        margin: 32px auto;
    }

    .detail {
        width: var(--content-width);
        margin: 0 auto;
        // border: 1px solid red;

        img {
            width: 350px;
            height: 350px;

        }

        >div {
            padding: 10px;
            width: 600px;
            margin-left: 30px;
            box-sizing: border-box;
            height: 350px;
            background-color: #fff;

            .detail-name {
                font-size: 16px;
                color: #666;
            }

            .detail-price {
                margin-top: 150px;
                color: var(--main-red);

                span {
                    font-size: 22px;
                }

                small {
                    font-size: 14px;
                }
            }

            .buy-num {
                // border: 1px solid red;
                margin-top: 10px;
                // display: inline-block;
                float: left;
            }

            .add-cart {
                float: left;
                width: 150px;
                margin-top: 10px;
                margin-left: 10px;
                height: 40px;
                background-color: var(--main-red);
                color: white;
                font-weight: bold;
                font-size: 18px;
                text-align: center;
                line-height: 40px;
            }

        }
    }

    .comments {
        margin: 32px auto;
    }
}
</style>