<template>
    <div class="comments">

        <div v-if="commentData.length > 0">
            <div class="comment clearfix" v-for="(item, index) in commentData" :key="item">
                <div class="fl left">
                    <img :src="'http://' + item.user_image_url" class="profile">
                </div>
                <div class="right fl">
                    <span class="nickname">{{ item.nickname }}</span> <br>
                    <img :src="i <= item.score ? require('@/assets/images/goods/star.png') : require('@/assets/images/goods/star1.png')"
                        v-for="i in 5" :key="i">
                    <span class="time"> | {{ item.create_time.replace("T", " ").replace("Z", "") }}</span>
                    <div class="said">{{ item.content }}</div>
                </div>
            </div>
        </div>

        <div class="page-indicator" v-if="commentData.length > 0">
            <el-pagination layout="prev, pager, next" :total="$props.count" :page-size="15"
                @current-change="onPageChange" />
        </div>

        <div v-if="commentData.length == 0" class="empty">
        <!-- <div v-if="!commentData || commentData.length == 0"> -->
            no comment for this commodity.

        </div>
    </div>
</template>

<script setup>
import { req } from '@/network/RequestConfig.js'
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

const page = ref(1)
const route = useRoute()
const commentData = ref("")

function reqComments() {
    req({ url: '/comment?sku_id=' + route.params.cid + '&page=' + page.value }).then(res => {
        if (res.status == 200) {
            commentData.value = res.data
        }
    })
}

reqComments()

const props = defineProps(['count'])

function onPageChange(p) {
    page.value = p
    reqComments()
}
</script>

<style scoped lang="less">
.comments {
    width: var(--content-width);
    background-color: #fff;
    border-radius: 20px;
    padding: 20px 40px;
    box-sizing: border-box;

    .comment {
        .left {
            .profile {
                width: 50px;
                height: 50px;
                border-radius: 25px;
            }
        }

        .right {
            width: 1000px;
            margin-left: 10px;

            .nickname {
                font-size: 14px;
                color: #333;
            }


            img {
                width: 20px;
                height: 20px;
            }

            .time {
                color: #888b94;
                font-size: 14px;
                position: relative;
                top: 2px;
            }

            .said {
                margin: 20px 0;
                font-size: 15px;
                color: #1a1a1a;
            }
        }
    }

    .page-indicator {
        // border: 1px solid black;
        margin-left: 700px;
    }

    .empty{
        font-size: 18px;
        color: #999;
        text-align: center;
    }
}
</style>