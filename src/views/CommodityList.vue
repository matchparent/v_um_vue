<template>

    <div class="commodity-list">
        <Shortcut></Shortcut>
        <HomeHead></HomeHead>

        <hr>

        <div class="cl-top">
            <span>All commodities > </span><span>"{{ keyword }}"</span>

            <div class="order clearfix">
                <a href="#" v-for="(item, index) in orderTypes" :key="index"
                    @click="onOrderChanged(item.order, item.index)" :class="item.selected ? 'a_selected' : 'a_norm'">
                    {{ item.name }}

                    <!-- <img :src="item.selected ? require('@/assets/images/goods-list/down3.png') : require('@/assets/images/goods-list/down1.png')"> -->
                    <img>
                </a>
            </div>
        </div>

        <div class="commodities">

            <div class="item cp" v-for="(item, index) in listData" :key="index" @click="toDetail(item.sku_id)">
                <img :src="item.img" alt="">
                <div class="price">
                    <small>$</small>&nbsp;<span>{{ item.p_price }}</span>
                </div>
                <p class="dian2">{{ item.name }}</p>

                <div class="comments">
                    <span>{{ item.comment_count == null ? 0 : item.comment_count }}</span> comments
                </div>
                <div class="shopname">
                    {{ item.shop_name }}
                </div>

                <div class="cart" @click.stop="addCart(item.sku_id, undefined)">
                    <img src="@/assets/images/cart/add-cart1.png">add to cart
                </div>
            </div>
        </div>
    </div>

    <div class="pages">
        <el-pagination layout="prev, pager, next" :total="itemCount" :page-size="15"
            @current-change="onCurrentChange" />
    </div>

</template>

<script setup>
import { req } from '@/network/RequestConfig.js'
import { toDetail } from '@/router/windowOpen'
import { defineAsyncComponent, onMounted, ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { addCart } from "@/router/windowOpen"
// global router object
const router = useRouter()
// local router object
const route = useRoute()
const listData = ref([])

const Shortcut = defineAsyncComponent(() => import('@/components/Shortcut.vue'))
const HomeHead = defineAsyncComponent(() => import('@/components/home/HomeHead.vue'))

let keyword = computed(() => {
    return route.params.keyword
})
// let page = computed(() => {
//     return route.params.page
// })
const page = ref(1)
let orderby = computed(() => {
    return route.params.orderby
})

const itemCount = ref(1)

function getSearchData() {
    listData.value = []
    req({ url: '/commodity/search/' + keyword.value + '/' + page.value + '/' + orderby.value }).then(res => {

        if (res && res.status == 200) {
            itemCount.value = res.data.count
            for (const obj of res.data.list) {
                listData.value.push(JSON.parse(obj))
            }
        }
    })
}

watch(keyword, () => {
    getSearchData()
})
// watch(page, () => {
//     getSearchData()
// })
watch(orderby, () => {
    getSearchData()
})

onMounted(() => {
    getSearchData()
})

const orderTypes = ref([
    { index: 1, order: 1, name: "Comprehensive", selected: (1 == orderby.value) },
    { index: 2, order: 2, name: "Comments", selected: (2 == orderby.value) },
    { index: 3, order: 3, name: "Price", selected: (3 == orderby.value) },
])

function onOrderChanged(order, index) {
    router.push("/commodities/" + keyword.value + "/" + order)
    for (let i of orderTypes.value) {
        i.selected = (i.order == order)
    }
}

function onCurrentChange(p) {
    page.value = p
    getSearchData()
}


</script>

<style scoped lang="less">
.commodity-list {
    .home-head {
        margin: 32px auto;
    }

    hr {
        height: 5px;
        background-color: var(--main-red);
    }

    .cl-top {
        width: var(--content-width);
        margin: 20px auto;
        font-size: 12px;

        >span:first-of-type {
            color: #999;
        }

        >span:last-of-type {
            color: #333;
            font-weight: bold;
        }

        .order {
            background-color: #f1f1f1;
            height: 40px;
            padding-top: 10px;
            padding-left: 10px;
            // border: 1px solid red;

            a {
                display: block;
                width: 150px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                border: 1px solid #ddd;
                float: left;
            }

            img {
                height: 14px;
                width: 14px;
            }

            .a_selected {
                background-color: var(--main-red);
                border: 1px solid var(--main-red);
                color: white;

                img {
                    content: url('@/assets/images/goods-list/down3.png')
                }
            }

            .a_norm {
                background-color: #fff;
                color: #333;

                img {
                    content: url('@/assets/images/goods-list/down1.png')
                }

                &:hover {
                    border: 1px solid var(--main-red);
                    color: var(--main-red);

                    img {
                        content: url('@/assets/images/goods-list/down2.png')
                    }
                }
            }
        }
    }

    .commodities {
        width: var(--content-width);
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;


        .item {
            @item-width: 190px;
            width: 232px;
            height: 330px;
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

            .price {
                width: @item-width;
                color: var(--main-red);
                margin-top: 10px;

                small {
                    position: relative;
                    top: -2px;
                    font-size: 12px;
                }

                span {
                    font-weight: bold;
                    font-size: 20px;
                }

            }

            .comments {
                width: @item-width;
                color: #a7a7a7;

                span {
                    color: #646fb0;
                    font-weight: bold;
                }
            }

            .shopname {
                width: @item-width;
                color: #999;
            }

            .cart {
                // width: @item-width;
                margin-top: 20px;
                color: #999;

                img {
                    width: 20px;
                    height: 20px;
                }
            }

        }
    }
}

.pages {
    margin-left: 75%;
}
</style>