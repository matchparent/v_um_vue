<template>
    <div id="my-orders">
        <nav>
            <span v-for="(item, index) in filterConfig.config" :key="index" class="cp usn"
                :class="filterConfig.selected == item.status ? 'current' : ''" @click="filterClick(item.status)">
                {{ item.name }}</span>
        </nav>

        <header v-if="orderData.length > 0">
            <span>Order Info</span>
            <span>Receiver</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Operations</span>
        </header>

        <div v-if="orderData.length == 0" class="empty">
            <span>nothing can be found</span>
        </div>

        <div v-for="(o, i) in orderData" :key="i" class="order-item">
            <div class="order-head">
                <span>{{ o.create_time.replace("T", " ").replace("Z", "") }}</span>
                <span>Order No.</span>
                <span>{{ o.trade_no }}</span>
                <!-- <img src="@/assets/images/profile/delete.png" @click="delOrder(o.trade_no)"> -->

                <el-popconfirm title="Are you sure to delete this?" width="240px" confirm-button-text="Yes"
                    cancel-button-text="No" @confirm="delOrder(o.trade_no)">
                    <template #reference>
                        <img src="@/assets/images/profile/delete.png">
                    </template>
                </el-popconfirm>
            </div>

            <div class="order-content">
                <div>
                    <div>
                        <div v-for="(j, k) in o.order_goods" :key="k" class="clearfix goods-item">
                            <a :href="'/commodity/' + j.sku_id" target="_blank"><img :src="j.image" class="img"></a>

                            <a :href="'/commodity/' + j.sku_id" target="_blank" class="dian2 goodsname">{{ j.name }}</a>

                            <span>x{{ j.goods_num }}</span>
                        </div>
                    </div>


                    <div class="line"></div>

                    <span>{{ o.receiver }}</span>

                    <div class="line"></div>

                    <span>${{ o.order_amount }}</span>

                    <div class="line"></div>

                    <span>{{ statusName(o.pay_status) }}</span>
                    <div class="line"></div>
                    <button @click="optClick(o)">{{optName.find(b => b.status ==
                        o.pay_status).name}}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { req } from '@/network/RequestConfig';
import { addCart } from '@/router/windowOpen.js'
const orderData = ref([])
const router = useRouter()

const filterConfig = reactive({
    selected: -1,
    config: [
        {
            name: "All",
            status: -1,
        },
        {
            name: "To be confirmed",
            status: 0,
        },
        {
            name: "To be paid",
            status: 1,
        },
        {
            name: "To be received",
            status: 2,
        },
        {
            name: "Finished",
            status: 3,
        },
    ]
})

const optName = [
    { status: 0, name: "Confirm" },
    { status: 1, name: "Pay" },
    { status: 2, name: "Received" },
    { status: 3, name: "Buy again" },
]

function optClick(o) {
    switch (o.pay_status) {
        case "0":
            router.push('/orderConfirm/' + o.trade_no)
            break;
        case "1":
            router.push({
                name: "orderPay",
                query: {
                    trade_no: o.trade_no,
                    order_amount: o.order_amount
                }
            })
            break;
        case "2":
            req({
                url: '/order/detail/' + o.trade_no,
                method: "put",
                data: { pay_status: '3' }
            }).then(res => {
                if (res.status == 200) {
                    showAlert("Goods received, order finished")
                    location.reload()
                } else {
                    if (res.status != 507) alert(res.data)
                }
            })
            break;

        case "3":
            o.order_goods.forEach(e => {
                addCart(e.sku_id, e.goods_num,false)
                router.push('/cart')
            });
            break;

    }
}

const statusName = sta => {
    const found = filterConfig.config.find(item => item.status == sta);
    return found ? found.name : 'Unknown';
    // return filterConfig.config.filter(item=>item.status == sta)[0].name
}

function filterClick(status) {
    filterConfig.selected = status
    reqData(filterConfig.selected)
}
function reqData(id) {
    req({ url: '/order?pay_status=' + id }).then(res => {
        if (res.status == 200) {
            orderData.value = res.data
        } else {
            if (res.status != 507) alert(res.data)
        }
    })
}

function delOrder(tno) {
    req({ url: '/order/', method: 'delete', data: { trade_no: tno } }).then(res => {
        if (res.status == 200) {
            location.reload()
        }
        if (res.status != 507) alert(res.data)
    })
}
reqData(filterConfig.selected)

</script>

<style scoped lang="less">
#my-orders {
    padding: 20px;

    nav {
        span {
            font-size: 14px;
            padding: 5px 10px;
            color: #333;

            &:hover {
                color: var(--main-red);
            }

        }

        .current {
            color: var(--main-red);
            border-bottom: 1px solid var(--main-red);
        }
    }

    header {
        margin-top: 20px;
        height: 30px;
        background-color: #eee;

        span {
            display: inline-block;
            color: #333;
            width: 100px;
            text-align: center;
            line-height: 30px;

            &:first-of-type {
                width: 550px;
            }
        }
    }

    .order-item {
        margin-top: 10px;

        .order-head {
            height: 30px;
            background-color: #eee;
            padding-left: 20px;

            span {
                display: inline-block;
                color: #999;
                text-align: center;
                line-height: 30px;

                &:nth-of-type(2) {
                    margin-left: 50px;
                }

                &:nth-of-type(3) {
                    color: #333;
                }
            }

            img {
                float: right;
                margin-top: 7px;
                margin-right: 10px;
                width: 15px;
                height: 15px;
                cursor: pointer;

                &:hover {
                    content: url('@/assets/images/profile/delete-red.png');
                }
            }


        }

        .order-content {
            border: 1px solid #eee;
            margin-top: -1px;

            >div {
                display: flex;

                .goods-item {
                    border-bottom: 1px solid #eee;
                    padding-right: 10px;

                    &:last-of-type {
                        border-bottom: 1px solid transparent;
                    }

                    .img {
                        top: 10px;
                        margin: 10px;
                        width: 80px;
                        height: 80px;
                        float: left;
                    }

                    .goodsname {
                        float: left;
                        width: 390px;
                        margin-top: 30px;
                        margin-left: 20px;

                        &:hover {
                            color: var(--main-red);
                        }
                    }

                    span {
                        display: inline-block;
                        margin-top: 45px;
                        width: 30px;
                    }
                }


                .line {
                    width: 1px;
                    align-self: stretch;
                    background-color: #eee;
                }

                span {
                    width: 100px;
                    margin-top: 30px;
                    text-align: center;
                }

                button {

                    margin: 30px auto 0;
                    height: 30px;
                    border: 1px solid #ddd;
                    padding: 0 10px;
                    background-color: #f5f5f5;

                    &:hover {
                        border: 1px solid var(--main-red);
                        color: var(--main-red)
                    }
                }
            }

        }
    }
}

.empty {
    height: 200px;
    text-align: center;
    padding-top: 160px;
    font-size: 14px;
    color: #999;
}
</style>