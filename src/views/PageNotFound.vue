<template>
    <div>
        <Shortcut></Shortcut>
        <SlotHeader>
            <!-- <span>Cash Register</span> -->
        </SlotHeader>
        <div class="page-not-found">
            <h1>404 - Page Not Found</h1>
        </div>
    </div>
</template>

<script setup>
import Shortcut from '@/components/Shortcut.vue';
import SlotHeader from '@/components/SlotHeader.vue';
</script>

<style scoped lang="less">
.page-not-found {
    height: 300px;
    text-align: center;
    margin-top: 50px;
    background-color: #fff;
    width: var(--content-width);
    margin: 0 auto;

    h1{
        color: gray;
        font-size: 20px;
        line-height: 300px;
    }
}
</style>