<template>
  <div>
    <Shortcut></Shortcut>
    <HomeHead></HomeHead>

    <HomeMid></HomeMid>

    <HomeFlash></HomeFlash>

    <div class="cate-wrapper">
      <div>
        <div v-for="(item, index) in category" :key="index" @click="toCat(item.typeId)" class="cp">

          <p class="cate-title" :class="{ select_title: item.selected }">{{ item.title }}</p>
          <p class="cate-content" :class="{ select_content: item.selected }">{{ item.content }}</p>

        </div>
      </div>
    </div>

    <HomeGrid :catId="typeId"></HomeGrid>

    <el-backtop :right="50" :bottom="100" />

  </div>
</template>

<script setup>
// @ is an alias to /src

// export default {
//   name: 'HomeView',
//   components: {
//     Shortcut: defineAsyncComponent(() => import('@/components/Shortcut.vue')),
//   }
// }
import { defineAsyncComponent, ref, onMounted } from 'vue'
import { req } from '@/network/RequestConfig.js'
const Shortcut = defineAsyncComponent(() => import('@/components/Shortcut.vue'))
const HomeHead = defineAsyncComponent(() => import('@/components/home/HomeHead.vue'))
const HomeMid = defineAsyncComponent(() => import('@/components/home/HomeMid.vue'))
const HomeFlash = defineAsyncComponent(() => import('@/components/home/HomeFlash.vue'))
const HomeGrid = defineAsyncComponent(() => import('@/components/home/HomeGrid.vue'))

let category = ref([
  { typeId: 1, title: "Featured", content: "You May Like", selected: true },
  { typeId: 2, title: "Smart Pioneer", content: "Big Appliance City", selected: false },
  { typeId: 3, title: "Home Essentials", content: "Quality Life", selected: false },
  { typeId: 4, title: "Supermarket", content: "Groceries & Fresh", selected: false },
  { typeId: 5, title: "Fashionista", content: "Beauty & Style", selected: false },
  { typeId: 6, title: "Imported Goods", content: "JD International", selected: false },
])

const typeId = ref(1)

function toCat(tid) {
  typeId.value = tid
  for (let i of category.value) {
    i.selected = (tid == i.typeId)
  }
}

// onMounted(() => {
//   req({ url: '/user/login' }).then(res => {
    
//   })
// })

</script>

<style lang="less" scoped>
.home-head {
  margin: 32px auto;
}

.home-mid {
  margin: 0 auto;
}

.home-flash {
  margin: 25px auto;
}

.cate-wrapper {
  margin: 0 auto;
  width: var(--content-width);
  height: 60px;
  background-color: #fff;

  >div {
    display: flex;
    margin: 0 auto;
    justify-content: center;
    // border: 1px solid red;

    >div {
      justify-content: center;
      height: 60px;
      width: 180px;
      align-items: center;
      display: flex;
      flex-direction: column;
      position: relative;

      &:hover .cate-title,
      &:hover .cate-content {
        color: var(--main-red);
      }

      &:not(:last-child)::after {
        content: '';
        position: absolute;
        right: 0;
        top: 15px;
        height: 30px;
        width: 1px;
        background-color: #e8e8e8;
      }

      .cate-title {
        font-size: 16px;
        font-weight: bold;
        height: 25px;
        line-height: 25px;
        color: #333;
      }

      .cate-content {
        font-size: 14px;
        color: #999;
      }

      .select_title {
        background-color: var(--main-red);
        color: white !important;
        padding: 0px 15px;
        border-radius: 15px;
      }

      .select_content {
        color: var(--main-red) !important;
      }
    }
  }
}

.home-grid {
  margin: 25px auto;
}
</style>
