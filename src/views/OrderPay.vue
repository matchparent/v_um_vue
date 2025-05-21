<template>
    <div id="order-pay">
        <Shortcut></Shortcut>
        <SlotHeader>
            <span>Cash Register</span>
        </SlotHeader>

        <main class="clearfix">
            <p>Order successfully confirmed. Please complete payment promptly.</p>
            <span>Order No.</span> <span>{{ $route.query.trade_no }}</span>
            <p>Payable Amount: <span>${{ $route.query.order_amount }}</span></p>
            <button @click="payNow">Pay Now</button> <img src="@/assets/images/order/alipay.png" class="fr">
        </main>

    </div>
</template>

<script setup>

import Shortcut from '@/components/Shortcut.vue';
import SlotHeader from '@/components/SlotHeader.vue';

const route = useRoute()

function payNow() {
    let payment = {
        out_trade_no: route.query.trade_no,
        total_amount: route.query.order_amount,
        subject: route.query.trade_no,
    }
    req({ url: 'pay', method: 'post', data: payment }).then(res => {
        if (res.status == 200) {
            window.location.href = res.data
        } else {
            if (res.status != 507) alert(res.data)
        }
    })
}

</script>
<style scoped lang="less">
#order-pay {
    main {
        width: var(--content-width);
        margin: 0 auto;
        background-color: #fff;
        padding: 20px;

        p {
            font-size: 16px;
            color: #333;

            &:first-of-type {
                font-weight: bold;
                margin-bottom: 20px;
            }

            &:nth-of-type(2) {
                text-align: right;
                margin-top: 20px;

                span {
                    color: var(--main-red);
                    font-weight: bold;
                    font-size: 18px;
                }
            }
        }

        >span {
            font-size: 14px;
            color: #999;
        }

        img {
            width: 30px;
            height: 30px;
            margin-top: 25px;
            margin-right: 10px;
        }

        button {
            float: right;
            margin-top: 20px;
            padding: 10px 20px;
            color: white;
            background-color: var(--main-red);
            font-size: 16px;


        }
    }
}
</style>
