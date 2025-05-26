<template>
    <div class="cart">
        <Shortcut></Shortcut>
        <HomeHead></HomeHead>
        <div class="bedside">
            <span>All goods:</span> <span>{{ tcount }}</span>
        </div>

        <table v-if="cartListData && cartListData.length > 0">
            <tr>
                <th colspan="2">
                    <input type="checkbox" :checked="allCheck" @click="onClickAll"> <span>Select All</span>
                </th>
                <th>
                    Commodity
                </th>
                <th>Price</th>
                <th>Count</th>
                <th>Subtotal</th>
                <th>Operations</th>
            </tr>

            <tr v-for="(item, index) in cartListData" :key="index">
                <td>
                    <input type="checkbox" v-model="item.isChecked">
                </td>

                <td>
                    <img :src="item.commodity.image" alt="">
                </td>
                <td>
                    <span class="dian2">{{ item.commodity.name }}</span>
                </td>
                <td>${{ item.commodity.p_price }}</td>
                <td><el-input-number v-model="item.nums" size="small" :min="1"
                        @change="(n, o) => onCountChange(n, o, item.sku_id)" />
                </td>
                <!-- keep 2 digits of decimal -->
                <td>${{ (item.commodity.p_price * item.nums).toFixed(2) }}</td>
                <td><button @click="onDelete(item.sku_id)">delete</button></td>
            </tr>

        </table>

        <div class="empty" v-if="!cartListData || cartListData.length == 0">
            <img src="@/assets/images/cart/cart-empty.png">
        </div>

        <div class="bottom" v-if="cartListData && cartListData.length > 0">
            <div class="fl">
                <input type="checkbox" :checked="allCheck" @click="onClickAll();">
                <label class="usn" @click="onClickAll();">Select all</label>

                <span class="usn" :class="checkedItems.length > 0 ? 'cp' : 'cf'" @click="deleteItems(false)">Delete
                    selected</span>
                <span class="clear usn cp" @click="deleteItems(true);">Clear cart</span>
            </div>

            <div class="fr">
                <span><em>{{ itemCount }}</em> items selected</span>
                <span>Total: $<em>{{ tPrice.toFixed(2) }}</em></span>
                <button @click="oconfirm">Order confirm</button>
            </div>
        </div>

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { defineAsyncComponent, ref, onMounted, watch } from 'vue'
import { req } from '@/network/RequestConfig.js'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Action } from 'element-plus'
const Shortcut = defineAsyncComponent(() => import('@/components/Shortcut.vue'))
const HomeHead = defineAsyncComponent(() => import('@/components/home/HomeHead.vue'))

const store = useStore()
const router = useRouter()

const num = ref(0)
const tcount = ref(0)
const cartListData = ref(null)
const allCheck = ref(false)
const itemCount = ref(0)
const tPrice = ref(0)
const checkedItems = ref([])

// req({ url: '/cart?email=' }).then(res => {
req({ url: '/cart' }).then(res => {
    if (res.status == 200) {
        cartListData.value = res.data
        updateTcount()
    }
})

function updateTcount() {
    let num = 0
    for (const i of cartListData.value) {
        num += i.nums
    }
    tcount.value = num
}

function onDelete(sku_id) {
    cartListData.value = cartListData.value.filter(item => item.sku_id !== sku_id)
    req({ url: '/cart/', method: "post", data: { sku_id: sku_id, is_delete: 1 } }).then(res => {
        store.dispatch("updateCc")
    })
    updateTcount()
}

function onCountChange(n, o, sku_id) {
    req({ url: '/cart/', method: "post", data: { sku_id: sku_id, nums: n } }).then(res => {
        store.dispatch("updateCc")
    })
    updateTcount()
    // tcount.value +=(n-o)
}

const onClickAll = () => {
    allCheck.value = !allCheck.value
    for (const i of cartListData.value) {
        i.isChecked = allCheck.value
    }
}

watch(() => cartListData, (n, o) => {
    itemCount.value = 0
    tPrice.value = 0
    for (const i of cartListData.value) {
        if (i.isChecked) {
            itemCount.value += 1
            tPrice.value += (i.commodity.p_price * i.nums)
        }
        allCheck.value = (itemCount.value == cartListData.value.length)
    }
    checkedItems.value = cartListData.value.filter(item => item.isChecked)
}, {
    deep: true,
})

function deleteItems(all) {
    if (all) {
        checkedItems.value = cartListData.value;
    }
    if (checkedItems.value.length > 0) {
        let checkedIds = checkedItems.value.map(item => item.sku_id)
        cartListData.value = cartListData.value.filter(item => !checkedIds.includes(item.sku_id))
        tcount.value = cartListData.value.length
        if (confirm(all ? "Sure to clean up your cart?" : "Sure to delete selected items?")) {
            req({ url: '/cart/', method: "delete", data: checkedIds }).then(res => {
                store.dispatch("updateCc")
            })
        }
    }
}

const oconfirm = () => {
    if (checkedItems.value.length == 0) {
        ElMessageBox.alert('You have to select at least one item to confirm your order', 'Notice', {
            confirmButtonText: 'Got it',
        })
    } else {
        req({
            url: '/order/', method: "post",
            data: { trade: { order_amount: tPrice.value }, goods: checkedItems.value }
        })
            .then(res => {
                const trade_no = res.data.trade_no
                router.push("/orderConfirm/" + trade_no)
                store.dispatch("updateCc")
            })
    }
}

</script>

<style scoped lang="less">
.cart {
    .home-head {
        margin: 32px auto;
    }

    .bedside {
        width: var(--content-width);
        margin: 0 auto;
        padding-left: 20px;
        font-size: 16px;
        font-weight: bold;
        color: var(--main-red);
    }

    table {
        width: var(--content-width);
        margin: 0 auto;
        background-color: #fff;
        border-collapse: collapse; //remove spaceing between

        tr {
            th {
                background-color: #f3f3f3;
                height: 45px;
                text-align: left;

                &:nth-child(1) {
                    width: 135px;

                    input {
                        position: relative;
                        top: -2px;
                        margin-right: 10px;
                    }
                }

                &:nth-child(3),
                &:nth-child(5),
                &:nth-child(6) {
                    text-align: center;
                    width: 100px;
                }

                &:nth-child(4) {
                    text-align: center;
                    width: 200px;
                }
            }

            td {
                padding: 10px 0;

                &:nth-child(3) {
                    cursor: pointer;

                    &:hover {
                        color: var(--main-red);
                    }
                }

                &:nth-child(4),
                &:nth-child(5),
                &:nth-child(6),
                &:nth-child(7) {
                    text-align: center;
                }
            }
        }

        img {
            width: 80px;
            height: 80px;
            border: 1px solid #eee;
        }
    }

    .empty {
        width: var(--content-width);
        margin: 0 auto;
        // border: 1px solid black;
        background-color: #f8f8f8;
        padding-top: 60px;
        text-align: center;
        // img{
        //     border: 1px solid red;
        // }
    }

    .bottom {
        background-color: #fff;
        width: var(--content-width);
        height: 50px;
        line-height: 50px;
        margin: 0 auto;

        .fl {
            input {
                margin-right: 10px;
            }

            span {
                padding: 0 10px;
                // cursor: pointer;
                font-size: 14px;

                &:hover {
                    color: var(--main-red);
                }
            }

            .clear {
                font-weight: bold;
            }
        }

        .fr {

            font-size: 14px;

            span {
                color: #acacac;
                padding: 0 10px;
            }

            em {
                color: var(--main-red);
                font-style: normal;
                font-weight: bold;
            }

            button {
                display: inline-block;
                width: 150px;
                background-color: var(--main-red);
                color: white;
                height: 50px;
                line-height: 50px;
                font-weight: bold;
                text-align: center;
                font-size: 16px;
            }

        }
    }
}
</style>