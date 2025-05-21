<template>
    <div class="order-confirm">
        <Shortcut></Shortcut>
        <main>
            <h1>Complete your order</h1>
            <div class="clearfix">
                <h2>Addresses</h2>
                <a href="#none" @click="popVis = true">New address</a>
                <div class="address">
                    <div class="addr-item" v-for="(o, i) in addrListData" :key="i">
                        <button :class="selectedAddr ? (o.id == selectedAddr.id ? 'selected' : '') : ''"
                            @click="addrClick(o)">{{ o.signer_name
                            }}</button>
                        <span>{{ o.signer_name }}</span>
                        <span>{{ o.district }} {{ o.signer_address }}</span>
                        <span>{{ asterPhone(o.telphone) }}</span>
                        <mark v-if="o.default == 1">default</mark>
                    </div>
                </div>

                <hr>

                <h2>Payment Methods</h2>

                <div class="pmethods">
                    <button class="selected">Alipay</button>
                </div>

                <hr>

                <h2>Delivery List</h2>

                <div class="clearfix delist">
                    <div class="fl">
                        <h3>Deliver Method</h3>
                        <button class="selected">DHL</button>
                    </div>
                    <div class="fr">

                        <div class="commodity-item" v-for="(o, i) in orderDetailData.order_goods">
                            <p>{{ o.shop_name }}</p>
                            <img :src="o.image">
                            <span class="dian2">{{ o.name }}</span>
                            <span>${{ o.p_price }}</span>
                            <span>x{{ o.goods_num }}</span>
                        </div>

                    </div>
                </div>

                <footer>
                    <b>Payable Amount:</b> <span>$ {{ orderDetailData.order_amount }}</span>
                </footer>
                <button class="submit" @click="submit">Submit Order</button>

            </div>
        </main>

        <el-dialog v-model="popVis" title="New Addresss" width="500">
            <el-form-item label="Receiver" :label-width="formLabelWidth">
                <el-input v-model="form.signer_name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="District" :label-width="formLabelWidth">
                <el-input v-model="form.district" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Address" :label-width="formLabelWidth">
                <el-input v-model="form.signer_address" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Phone" :label-width="formLabelWidth">
                <el-input v-model="form.telphone" autocomplete="off" />
            </el-form-item>

            <el-form-item label="As default" :label-width="formLabelWidth">
                <el-switch v-model="form.default" class="ml-2"
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
            </el-form-item>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="popVis = false">Cancel</el-button>
                    <el-button type="primary" @click="confirm">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
// import { req } from '@/network/RequestConfig'
// import { ref,reactive } from 'vue'
// import { useRouter, useRoute } from 'vue-router'
import Shortcut from '@/components/Shortcut.vue'
// global router object
const router = useRouter()
// local router object
const route = useRoute()

const trade_no = ref(route.params.trade_no)

const addrListData = ref([])
const orderDetailData = ref({})
const selectedAddr = ref(null)
const popVis = ref(false)

const form = reactive({
    signer_name: '',
    district: '',
    telphone: '',
    signer_address: '',
    default: false,
})

req({ url: "/order/detail/" + trade_no.value }).then(res => {
    if (res.status == 200) {
        orderDetailData.value = res.data
    } else {
        if (res.status != 507) alert(res.data)
    }
})

req({ url: '/addr/list' }).then(res => {
    if (res.status == 200) {
        addrListData.value = res.data
        selectedAddr.value = res.data.find(i => i.default === 1) || null
    } else {
        if (res.status != 507) alert(res.data)
    }
})

function addrClick(o) {
    selectedAddr.value = o
}

function asterPhone(phone) {
    return phone
}

function submit() {
    if (selectedAddr.value == null) {
        alert("Must select one address to receive your goods.")
        return
    }

    req({
        url: '/order/detail/' + orderDetailData.value.trade_no,
        method: "put",
        data: { pay_status: '1', address_id: selectedAddr.value.id }
    }).then(res => {
        if (res.status == 200) {
            router.push({
                name: "orderPay",
                query: {
                    trade_no: orderDetailData.value.trade_no,
                    order_amount: orderDetailData.value.order_amount
                }
            })
        } else {
            if (res.status != 507) alert(res.data)
        }
    })
}

function confirm() {
    req({
        url: '/addr/',
        method: "post",
        data: form
    }).then(res => {
        if (res.status == 200) {
            popVis.value = false
            location.reload()
        } else {
            if (res.status != 507) alert(res.data)
        }
    })
}
</script>

<style scoped lang="less">
.order-confirm {
    main {
        width: var(--content-width);
        background-color: #fff;
        margin: 20px auto;
        box-sizing: border-box;
        padding: 20px;
        border: 1px solid #f5f5f5;

        h1 {
            color: #333;
            font-size: 18px;
            line-height: 44px;
        }

        h2 {
            color: #333;
            font-size: 16px;
            font-weight: 700;
            margin: 10px 0;
        }

        h3 {
            color: #333;
            font-size: 14px;
            font-weight: 700;
            margin: 10px 0;
        }

        hr {
            border-top: 1px solid #f0f0f0;
        }

        button {
            font-size: 14px;
            color: #333;
            width: 150px;
            height: 30px;
            user-select: none;
            background-color: #fff;
            border: 1px solid #ddd;
        }

        >div {
            margin-top: 10px;
            position: relative;

            a {
                position: absolute;
                right: 10px;
                top: 0px;
                color: #005ea7;
            }

            .address {
                padding: 10px;
                overflow: hidden;

                .addr-item {
                    padding-bottom: 10px;

                    span {
                        font-size: 14px;
                        color: #333;
                        margin-left: 10px;
                    }

                    mark {
                        user-select: none;
                        font-size: 12px;
                        padding: 3px;
                        color: #fff;
                        background-color: #999;
                        margin-left: 10px;
                    }
                }
            }

            .pmethods {
                padding-bottom: 10px;
            }

            .delist {
                background-color: #f7f7f7;

                .fl {
                    width: 20%;
                    padding: 10px;
                    box-sizing: border-box;
                }

                .fr {
                    box-sizing: border-box;
                    width: 80%;
                    background-color: #f3fbfe;

                    .commodity-item {
                        padding: 10px 20px;

                        p {
                            font-weight: 700;
                            color: #333;
                        }

                        img {
                            margin-top: 10px;
                            width: 85px;
                            height: 85px;
                            border: 1px solid #ddd;
                        }

                        span {
                            display: inline-block;
                            margin-left: 20px;
                            width: 100px;
                            text-align: center;

                            &:first-of-type {
                                width: 500px;
                            }

                            &:nth-of-type(2) {
                                font-weight: bold;
                                color: var(--main-red);
                            }
                        }

                    }
                }
            }

            footer {
                background-color: #f4f4f4;
                margin-top: 30px;
                height: 50px;
                text-align: right;

                b {
                    line-height: 50px;
                    font-size: 14px;
                    font-weight: normal;
                }

                span {
                    margin-left: 30px;
                    margin-right: 20px;
                    color: var(--main-red);
                    font-size: 18px;
                    font-weight: bold;
                }
            }

            .submit {
                float: right;
                margin-top: 10px;
                background-color: var(--main-red);
                color: white;
                font-size: 16px;
                font-weight: bold;
                border-radius: 5px;
                border: 1px solid transparent;
            }
        }
    }
}

.selected {
    border: 2px solid var(--main-red) !important;
    background: url("@/assets/images/order/address-selected.png");
    background-position: 104% 7%;
    background-repeat: no-repeat;
    background-size: 30px;
}
</style>