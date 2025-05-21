<template>
    <div class="home-mid">
        <HomeMidLeft></HomeMidLeft>
        <HomeMidBanner></HomeMidBanner>
        <HomeMidRight></HomeMidRight>
    </div>
</template>


<script setup>
import { defineAsyncComponent } from 'vue'

const HomeMidLeft = defineAsyncComponent(() => import('@/components/home/HomeMidLeft.vue'))
const HomeMidBanner = defineAsyncComponent(() => import('@/components/home/HomeMidBanner.vue'))
const HomeMidRight = defineAsyncComponent(() => import('@/components/home/HomeMidRight.vue'))
</script>



<style lang="less" scoped>
.home-mid {
    width: var(--content-width);
    height: 400px;
    display:flex;
    justify-content: flex-start;
}

.home-mid-banner{
    margin: 0 10px;
}
</style>