<template>
    <div class="basic-info">
        <section>
            <label>Nickname: </label><el-input v-model="nick" style="width: 240px" placeholder="Please input a new nickname" />
        </section>
        <section>
            <label>Gender: </label>
            <div>
                <el-radio-group v-model="gender" size="default">
                    <el-radio-button value="0">
                        <p>Secrete</p>
                    </el-radio-button>
                    <el-radio-button value="1">
                        <p>Male</p>
                    </el-radio-button>
                    <el-radio-button value="2">
                        <p>Female</p>
                    </el-radio-button>
                </el-radio-group>
            </div>
        </section>
        <section>
            <label>Birthday: </label>
            <!-- size = small|default|large -->
            <el-date-picker v-model="birthdate" type="date" placeholder="Pick your birth date" size="default"
                style="width: 240px" />
        </section>

        <div class="submit">
            <el-button type="primary" @click="submit">Submit</el-button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { req } from '@/network/RequestConfig.js'
const nick = ref("")
const gender = ref('')
const birthdate = ref('2025-2-5')

req({ url: '/user' }).then(res => {
    if (res.status = 200) {
        nick.value = res.data.name
        gender.value = res.data.gender
        birthdate.value = res.data.birthday
    }
})


function submit() {
    const data = {
        name: nick.value,
        birthday: birthdate.value,
        gender: gender.value,
    }
    req({ url: '/user/', method: 'put', data }).then(res => {
        if (res.status != 507) alert(res.data)
    })
}

</script>

<style scoped lang="less">
.basic-info {
    padding: 20px 60px;
    height: 300px;

    section {
        height: 50px;
        display: flex;
        align-items: center;

        >label {
            display: inline-block;
            width: 100px;
            font-size: 14px;
            color: #333;
        }

        p {
            width: 48px;
        }

    }

    .submit {
        margin-top: 100px;
    }

}
</style>