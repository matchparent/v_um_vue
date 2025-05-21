<template>
    <div class="cart-button pr cp" @click="$router.push('/cart')">
        <el-badge v-if="$store.state.cartCount && $store.state.user.isLogin" :value="$store.state.cartCount" color="#ff0f23">
            <span class="iconfont icon-cart"></span>
        </el-badge>
        <span class="cart">Cart</span>
    </div>

</template>

<script setup>
const router = useRouter()
</script>

<style scoped lang="less">
.cart-button {
    height: 44px;
    width: 228px;
    background-color: white;
    border-radius: 8px;
    margin-left: 10px;
    border: 1px solid rgba(0, 0, 0, .08);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;

    .iconfont {
        font-size: 20px;
    }

    .cart {
        color: var(--main-red);
        margin-left: 15px;
    }
}
</style>