<template>
    <div class="home-mid-banner">
        <div class="block text-center" m="t-4">
            <el-carousel trigger="click" height="400px">
                <el-carousel-item v-for="item in imgs" :key="item">
                    <img :src="item" alt="">
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue"
import b1 from "@/assets/images/banner/banner1.png"
import b2 from "@/assets/images/banner/banner2.png"
import b3 from "@/assets/images/banner/banner3.png"
import b4 from "@/assets/images/banner/banner4.png"
import b5 from "@/assets/images/banner/banner5.png"
import b6 from "@/assets/images/banner/banner6.png"
const imgs = ref([b1, b2, b3, b4, b5, b6])
</script>
<style scoped>
.home-mid-banner {
    width: 710px;
    height: 400px;

}
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>