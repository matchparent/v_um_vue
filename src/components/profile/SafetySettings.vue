<template>
    <div class="safety-settings">

        <section>
            <label>Old password: </label><el-input type="password" v-model="p1" style="width: 240px"
                placeholder="Your old password" />
        </section>
        <section>
            <label>New password: </label><el-input type="password" v-model="p2" style="width: 240px"
                placeholder="New password you want" />
        </section>
        <section>
            <label>Confirm password: </label><el-input type="password" v-model="p3" style="width: 240px"
                placeholder="New password again" />
        </section>

        <div class="submit">
            <el-button type="primary" @click="submit">Submit</el-button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { req } from '@/network/RequestConfig.js'
import { useRouter } from 'vue-router';

const p1 = ref("")
const p2 = ref("")
const p3 = ref("")

const router = useRouter()

function submit() {
    if (p3.value != p2.value) {
        alert("New password confirmation failed.")
        return
    }

    if (p1.value == p2.value) {
        alert("New password should be different from your old one .")
        return
    }
    const data = {
        op: p1.value,
        np: p2.value
    }
    req({
        url: '/user/login/', method: 'put', data: {
            op: p1.value,
            np: p2.value
        }
    }).then(res => {
        if (res.status != 507) alert(res.data)
        if (res.status == 200) {
            location.href = '/profile'
        }
    })
}
</script>

<style scoped lang="less">
.safety-settings {
    padding: 20px 60px;
    height: 300px;

    section {
        height: 50px;
        display: flex;
        align-items: center;

        >label {
            display: inline-block;
            width: 150px;
            font-size: 14px;
            color: #333;
        }
    }

    .submit {
        margin-top: 100px;
    }
}
</style>